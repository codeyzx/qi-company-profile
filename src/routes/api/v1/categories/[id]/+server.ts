import type { RequestHandler } from "./$types";
import { adminClient } from "$lib/supabase";
import {
  checkAuth,
  apiSuccess,
  apiError,
  validateRequired,
} from "$lib/server/api-utils";

/**
 * GET /api/v1/categories/[id]
 * Get a single category by ID
 */
export const GET: RequestHandler = async ({ params }) => {
  try {
    const { id } = params;

    if (!id) {
      return apiError("Category ID is required", 400);
    }

    const { data: category, error } = await adminClient
      .from("game_categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return apiError("Category not found", 404);
      }
      console.error("Error fetching category:", error);
      return apiError("Failed to fetch category", 500);
    }

    return apiSuccess(category);
  } catch (error) {
    console.error("GET category API error:", error);
    return apiError("Internal server error", 500);
  }
};

/**
 * PUT /api/v1/categories/[id]
 * Update a category
 * Requires authentication
 */
export const PUT: RequestHandler = async (event) => {
  try {
    const { authenticated, adminUser } = await checkAuth(event);

    if (!authenticated || !adminUser) {
      return apiError("Unauthorized", 401);
    }

    const { id } = event.params;

    if (!id) {
      return apiError("Category ID is required", 400);
    }

    const body = await event.request.json();

    // Validate required fields
    const validation = validateRequired(body, [
      "title_id",
      "title_en",
      "description_id",
      "description_en",
    ]);

    if (!validation.valid) {
      return apiError(
        `Missing required fields: ${validation.missing?.join(", ")}`,
        400
      );
    }

    const data = {
      title_id: body.title_id,
      title_en: body.title_en,
      description_id: body.description_id,
      description_en: body.description_en,
      icon: body.icon || null,
      badge_id: body.badge_id || null,
      badge_en: body.badge_en || null,
      count_text_id: body.count_text_id || null,
      count_text_en: body.count_text_en || null,
      gradient_from: body.gradient_from || "#F5CB3B",
      gradient_to: body.gradient_to || "#322F81",
      border_color: body.border_color || null,
      sort_order: body.sort_order !== undefined ? body.sort_order : 0,
      status: body.status || "published",
      updated_by: adminUser.user_id,
    };

    const { data: category, error } = await adminClient
      .from("game_categories")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return apiError("Category not found", 404);
      }
      console.error("Error updating category:", error);
      return apiError(error.message, 500);
    }

    return apiSuccess(category);
  } catch (error) {
    console.error("PUT category API error:", error);
    return apiError("Internal server error", 500);
  }
};

/**
 * DELETE /api/v1/categories/[id]
 * Delete a category
 * Requires authentication
 */
export const DELETE: RequestHandler = async (event) => {
  try {
    const { authenticated, adminUser } = await checkAuth(event);

    if (!authenticated || !adminUser) {
      return apiError("Unauthorized", 401);
    }

    const { id } = event.params;

    if (!id) {
      return apiError("Category ID is required", 400);
    }

    const { error } = await adminClient
      .from("game_categories")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting category:", error);
      return apiError(error.message, 500);
    }

    return apiSuccess({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("DELETE category API error:", error);
    return apiError("Internal server error", 500);
  }
};
