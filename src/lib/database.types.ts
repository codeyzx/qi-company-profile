export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "admin" | "super_admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "super_admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "super_admin";
          created_at?: string;
          updated_at?: string;
        };
      };
      site_config: {
        Row: {
          id: string;
          key: string;
          value_id: string | null;
          value_en: string | null;
          description: string | null;
          status: "draft" | "published";
          version: number;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          key: string;
          value_id?: string | null;
          value_en?: string | null;
          description?: string | null;
          status?: "draft" | "published";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          key?: string;
          value_id?: string | null;
          value_en?: string | null;
          description?: string | null;
          status?: "draft" | "published";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
      hero_content: {
        Row: {
          id: string;
          title_id: string;
          title_en: string;
          subtitle_id: string | null;
          subtitle_en: string | null;
          description_id: string;
          description_en: string;
          badge_text_id: string | null;
          badge_text_en: string | null;
          cta_primary_text_id: string | null;
          cta_primary_text_en: string | null;
          cta_primary_url: string | null;
          cta_secondary_text_id: string | null;
          cta_secondary_text_en: string | null;
          cta_secondary_url: string | null;
          stats: Json;
          status: "draft" | "published";
          version: number;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          title_id: string;
          title_en: string;
          subtitle_id?: string | null;
          subtitle_en?: string | null;
          description_id: string;
          description_en: string;
          badge_text_id?: string | null;
          badge_text_en?: string | null;
          cta_primary_text_id?: string | null;
          cta_primary_text_en?: string | null;
          cta_primary_url?: string | null;
          cta_secondary_text_id?: string | null;
          cta_secondary_text_en?: string | null;
          cta_secondary_url?: string | null;
          stats?: Json;
          status?: "draft" | "published";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          title_id?: string;
          title_en?: string;
          subtitle_id?: string | null;
          subtitle_en?: string | null;
          description_id?: string;
          description_en?: string;
          badge_text_id?: string | null;
          badge_text_en?: string | null;
          cta_primary_text_id?: string | null;
          cta_primary_text_en?: string | null;
          cta_primary_url?: string | null;
          cta_secondary_text_id?: string | null;
          cta_secondary_text_en?: string | null;
          cta_secondary_url?: string | null;
          stats?: Json;
          status?: "draft" | "published";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
      news_articles: {
        Row: {
          id: string;
          title_id: string;
          title_en: string;
          slug_id: string;
          slug_en: string;
          excerpt_id: string;
          excerpt_en: string;
          content_id: string;
          content_en: string;
          thumbnail_url: string | null;
          category_id: string | null;
          category_en: string | null;
          author_id: string | null;
          read_time: number | null;
          published_date: string | null;
          scheduled_publish_at: string | null;
          views_count: number;
          seo_meta_title_id: string | null;
          seo_meta_title_en: string | null;
          seo_meta_description_id: string | null;
          seo_meta_description_en: string | null;
          seo_og_image_url: string | null;
          seo_keywords: string[] | null;
          status: "draft" | "scheduled" | "published" | "archived";
          version: number;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          title_id: string;
          title_en: string;
          slug_id: string;
          slug_en: string;
          excerpt_id: string;
          excerpt_en: string;
          content_id: string;
          content_en: string;
          thumbnail_url?: string | null;
          category_id?: string | null;
          category_en?: string | null;
          author_id?: string | null;
          read_time?: number | null;
          published_date?: string | null;
          scheduled_publish_at?: string | null;
          views_count?: number;
          seo_meta_title_id?: string | null;
          seo_meta_title_en?: string | null;
          seo_meta_description_id?: string | null;
          seo_meta_description_en?: string | null;
          seo_og_image_url?: string | null;
          seo_keywords?: string[] | null;
          status?: "draft" | "scheduled" | "published" | "archived";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          title_id?: string;
          title_en?: string;
          slug_id?: string;
          slug_en?: string;
          excerpt_id?: string;
          excerpt_en?: string;
          content_id?: string;
          content_en?: string;
          thumbnail_url?: string | null;
          category_id?: string | null;
          category_en?: string | null;
          author_id?: string | null;
          read_time?: number | null;
          published_date?: string | null;
          scheduled_publish_at?: string | null;
          views_count?: number;
          seo_meta_title_id?: string | null;
          seo_meta_title_en?: string | null;
          seo_meta_description_id?: string | null;
          seo_meta_description_en?: string | null;
          seo_og_image_url?: string | null;
          seo_keywords?: string[] | null;
          status?: "draft" | "scheduled" | "published" | "archived";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
      game_categories: {
        Row: {
          id: string;
          title_id: string;
          title_en: string;
          description_id: string;
          description_en: string;
          icon: string | null;
          badge_id: string | null;
          badge_en: string | null;
          count_text_id: string | null;
          count_text_en: string | null;
          gradient_from: string;
          gradient_to: string;
          border_color: string | null;
          sort_order: number;
          status: "draft" | "published";
          version: number;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          title_id: string;
          title_en: string;
          description_id: string;
          description_en: string;
          icon?: string | null;
          badge_id?: string | null;
          badge_en?: string | null;
          count_text_id?: string | null;
          count_text_en?: string | null;
          gradient_from?: string;
          gradient_to?: string;
          border_color?: string | null;
          sort_order?: number;
          status?: "draft" | "published";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          title_id?: string;
          title_en?: string;
          description_id?: string;
          description_en?: string;
          icon?: string | null;
          badge_id?: string | null;
          badge_en?: string | null;
          count_text_id?: string | null;
          count_text_en?: string | null;
          gradient_from?: string;
          gradient_to?: string;
          border_color?: string | null;
          sort_order?: number;
          status?: "draft" | "published";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
      about_content: {
        Row: {
          id: string;
          main_title_id: string;
          main_title_en: string;
          main_description_id: string;
          main_description_en: string;
          secondary_description_id: string | null;
          secondary_description_en: string | null;
          slogan_id: string | null;
          slogan_en: string | null;
          image_url: string | null;
          values: Json;
          stats: Json;
          status: "draft" | "published";
          version: number;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          main_title_id: string;
          main_title_en: string;
          main_description_id: string;
          main_description_en: string;
          secondary_description_id?: string | null;
          secondary_description_en?: string | null;
          slogan_id?: string | null;
          slogan_en?: string | null;
          image_url?: string | null;
          values?: Json;
          stats?: Json;
          status?: "draft" | "published";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          main_title_id?: string;
          main_title_en?: string;
          main_description_id?: string;
          main_description_en?: string;
          secondary_description_id?: string | null;
          secondary_description_en?: string | null;
          slogan_id?: string | null;
          slogan_en?: string | null;
          image_url?: string | null;
          values?: Json;
          stats?: Json;
          status?: "draft" | "published";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
      contact_info: {
        Row: {
          id: string;
          emails: string[];
          phone_numbers: string[];
          social_links: Json;
          operating_hours_id: string | null;
          operating_hours_en: string | null;
          address_id: string | null;
          address_en: string | null;
          status: "draft" | "published";
          version: number;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          emails?: string[];
          phone_numbers?: string[];
          social_links?: Json;
          operating_hours_id?: string | null;
          operating_hours_en?: string | null;
          address_id?: string | null;
          address_en?: string | null;
          status?: "draft" | "published";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          emails?: string[];
          phone_numbers?: string[];
          social_links?: Json;
          operating_hours_id?: string | null;
          operating_hours_en?: string | null;
          address_id?: string | null;
          address_en?: string | null;
          status?: "draft" | "published";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
      content_versions: {
        Row: {
          id: string;
          table_name: string;
          record_id: string;
          content_snapshot: Json;
          version_number: number;
          change_summary: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          table_name: string;
          record_id: string;
          content_snapshot: Json;
          version_number: number;
          change_summary?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          table_name?: string;
          record_id?: string;
          content_snapshot?: Json;
          version_number?: number;
          change_summary?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
      };
      activity_log: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          table_name: string;
          record_id: string | null;
          details: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          table_name: string;
          record_id?: string | null;
          details?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          table_name?: string;
          record_id?: string | null;
          details?: Json | null;
          created_at?: string;
        };
      };
      navbar_config: {
        Row: {
          id: string;
          menu_items: Json;
          status: "draft" | "published";
          version: number;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          menu_items?: Json;
          status?: "draft" | "published";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          menu_items?: Json;
          status?: "draft" | "published";
          version?: number;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      auto_publish_scheduled_articles: {
        Args: Record<string, never>;
        Returns: void;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
