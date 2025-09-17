import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          role: string | null;
          description: string | null;
          opt_in: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          role?: string | null;
          description?: string | null;
          opt_in?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string | null;
          role?: string | null;
          description?: string | null;
          opt_in?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          name: string;
          email: string;
          event_uri: string;
          start_time: string;
          end_time: string;
          calendly_event_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          event_uri: string;
          start_time: string;
          end_time: string;
          calendly_event_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          event_uri?: string;
          start_time?: string;
          end_time?: string;
          calendly_event_id?: string;
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          confirmed: boolean;
          token: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          confirmed?: boolean;
          token?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          confirmed?: boolean;
          token?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      sow_downloads: {
        Row: {
          id: string;
          email: string;
          company: string;
          name: string;
          sow_type: string;
          downloaded_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          company: string;
          name: string;
          sow_type?: string;
          downloaded_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          company?: string;
          name?: string;
          sow_type?: string;
          downloaded_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};