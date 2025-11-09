import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "$lib/database.types";

type Tables = Database["public"]["Tables"];

/**
 * Save a version snapshot before updating content
 */
export async function saveVersion<T extends keyof Tables>(
  supabase: SupabaseClient<Database>,
  tableName: T,
  recordId: string,
  content: any,
  userId: string,
  changeSummary?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get current version number
    const { data: versions } = await supabase
      .from("content_versions")
      .select("version_number")
      .eq("table_name", tableName)
      .eq("record_id", recordId)
      .order("version_number", { ascending: false })
      .limit(1);

    const nextVersion =
      versions && versions.length > 0
        ? (versions[0] as any).version_number + 1
        : 1;

    // Save version
    const { error } = await supabase.from("content_versions").insert({
      table_name: tableName as any,
      record_id: recordId,
      content_snapshot: content as any,
      version_number: nextVersion,
      change_summary: changeSummary,
      created_by: userId,
    } as any);

    if (error) {
      console.error("Error saving version:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error in saveVersion:", error);
    return { success: false, error: "Failed to save version" };
  }
}

/**
 * Get version history for a record
 */
export async function getVersionHistory(
  supabase: SupabaseClient<Database>,
  tableName: string,
  recordId: string
) {
  const { data, error } = await supabase
    .from("content_versions")
    .select("*, admin_users(email, full_name)")
    .eq("table_name", tableName)
    .eq("record_id", recordId)
    .order("version_number", { ascending: false });

  if (error) {
    console.error("Error fetching version history:", error);
    return [];
  }

  return data;
}

/**
 * Restore a specific version
 */
export async function restoreVersion<T extends keyof Tables>(
  supabase: SupabaseClient<Database>,
  tableName: T,
  recordId: string,
  versionNumber: number,
  userId: string
): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    // Get the version
    const { data: version, error: versionError } = await supabase
      .from("content_versions")
      .select("content_snapshot")
      .eq("table_name", tableName)
      .eq("record_id", recordId)
      .eq("version_number", versionNumber)
      .single();

    if (versionError || !version) {
      return { success: false, error: "Version not found" };
    }

    // Save current state as a new version before restoring
    const { data: current } = await supabase
      .from(tableName as any)
      .select("*")
      .eq("id", recordId as any)
      .single();

    if (current) {
      await saveVersion(
        supabase,
        tableName,
        recordId,
        current,
        userId,
        `Backup before restoring to version ${versionNumber}`
      );
    }

    // Restore the version
    const restoredContent = (version as any).content_snapshot as any;
    delete restoredContent.id; // Don't override ID
    delete restoredContent.created_at; // Keep original created_at

    const { data: updated, error: updateError } = await (supabase as any)
      .from(tableName)
      .update({
        ...restoredContent,
        updated_by: userId,
        version: ((current as any)?.version || 0) + 1,
      })
      .eq("id", recordId)
      .select()
      .single();

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    // Log activity
    await supabase.from("activity_log").insert({
      user_id: userId,
      action: "restore",
      table_name: tableName as any,
      record_id: recordId,
      details: { restored_from_version: versionNumber },
    } as any);

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error restoring version:", error);
    return { success: false, error: "Failed to restore version" };
  }
}

/**
 * Log activity
 */
export async function logActivity(
  supabase: SupabaseClient<Database>,
  userId: string,
  action: string,
  tableName: string,
  recordId?: string,
  details?: any
) {
  await supabase.from("activity_log").insert({
    user_id: userId,
    action,
    table_name: tableName,
    record_id: recordId,
    details,
  } as any);
}
