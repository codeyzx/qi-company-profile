import type { RequestHandler } from "./$types";
import { adminClient } from "$lib/supabase";
import {
  checkAuth,
  apiSuccess,
  apiError,
  validateRequired,
} from "$lib/server/api-utils";

/**
 * GET /api/v1/categories
 * List all categories with optional filtering
 * Query params:
 * - status: Filter by status (draft|published)
 * - sort: Sort order (asc|desc) - default: asc
 * - limit: Number of items to return
 * - offset: Number of items to skip
 */
export const GET: RequestHandler = async ({ url }) => {
  try {
    const status = url.searchParams.get("status");
    const sort = url.searchParams.get("sort") || "asc";
    const limit = url.searchParams.get("limit");
    const offset = url.searchParams.get("offset");

    let query = adminClient
      .from("game_categories")
      .select("*", { count: "exact" });

    // Filter by status
    if (status && (status === "draft" || status === "published")) {
      query = query.eq("status", status);
    }

    // Sort by sort_order
    query = query.order("sort_order", {
      ascending: sort === "asc",
    });

    // Pagination
    if (limit) {
      const limitNum = parseInt(limit);
      query = query.limit(limitNum);
    }

    if (offset) {
      const offsetNum = parseInt(offset);
      query = query.range(
        offsetNum,
        offsetNum + (limit ? parseInt(limit) : 10) - 1
      );
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching categories:", error);
      return apiError("Failed to fetch categories", 500);
    }

    return apiSuccess({
      categories: data || [],
      count: count || 0,
    });
  } catch (error) {
    console.error("GET categories API error:", error);
    return apiError("Internal server error", 500);
  }
};

/**
 * POST /api/v1/categories
 * Create a new category
 * Requires authentication
 */
export const POST: RequestHandler = async (event) => {
  try {
    const { authenticated, adminUser } = await checkAuth(event);

    if (!authenticated || !adminUser) {
      return apiError("Unauthorized", 401);
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
      sort_order: body.sort_order || 0,
      status: body.status || "published",
      updated_by: adminUser.user_id,
    };

    const { data: category, error } = await adminClient
      .from("game_categories")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("Error creating category:", error);
      return apiError(error.message, 500);
    }

    return apiSuccess(category, 201);
  } catch (error) {
    console.error("POST categories API error:", error);
    return apiError("Internal server error", 500);
  }
};
