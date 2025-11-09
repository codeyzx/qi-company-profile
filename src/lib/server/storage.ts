import type { SupabaseClient } from "@supabase/supabase-js";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function uploadImage(
  supabase: SupabaseClient,
  file: File,
  bucket: "article-images" | "game-thumbnails" | "site-assets",
  folder?: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: "File size must be less than 5MB" };
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false,
        error: "Only JPEG, PNG, WebP, and GIF images are allowed",
      };
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileExt = file.name.split(".").pop();
    const fileName = `${timestamp}-${randomString}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Failed to upload image" };
  }
}

export async function deleteImage(
  supabase: SupabaseClient,
  url: string,
  bucket: "article-images" | "game-thumbnails" | "site-assets"
): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract path from URL
    const urlParts = url.split(`${bucket}/`);
    if (urlParts.length < 2) {
      return { success: false, error: "Invalid URL format" };
    }

    const filePath = urlParts[1];

    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      console.error("Delete error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: "Failed to delete image" };
  }
}

export function getOptimizedImageUrl(
  url: string,
  width?: number,
  height?: number,
  quality?: number
): string {
  if (!url) return "";

  // If using Supabase Storage, can add transformation params
  const params = new URLSearchParams();
  if (width) params.set("width", width.toString());
  if (height) params.set("height", height.toString());
  if (quality) params.set("quality", quality.toString());

  const queryString = params.toString();
  return queryString ? `${url}?${queryString}` : url;
}
