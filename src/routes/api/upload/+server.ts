import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { uploadImage, deleteImage } from "$lib/server/storage";

export const POST: RequestHandler = async ({
  request,
  locals: { supabase, session },
}) => {
  if (!session) {
    return json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as
      | "article-images"
      | "game-thumbnails"
      | "site-assets";
    const folder = (formData.get("folder") as string) || "";

    if (!file) {
      return json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const result = await uploadImage(supabase, file, bucket, folder);

    return json(result);
  } catch (error) {
    console.error("Upload API error:", error);
    return json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE: RequestHandler = async ({
  request,
  locals: { supabase, session },
}) => {
  if (!session) {
    return json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url, bucket } = await request.json();

    if (!url || !bucket) {
      return json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await deleteImage(supabase, url, bucket);

    return json(result);
  } catch (error) {
    console.error("Delete API error:", error);
    return json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
};
