import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a fallback client if environment variables are missing
// This prevents the app from crashing when Supabase isn't configured
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type Database = {
  public: {
    Tables: {
      stripe_user_subscriptions: {
        Row: {
          customer_id: string;
          subscription_id: string | null;
          subscription_status: string;
          price_id: string | null;
          current_period_start: number | null;
          current_period_end: number | null;
          cancel_at_period_end: boolean | null;
          payment_method_brand: string | null;
          payment_method_last4: string | null;
        };
        Insert: never;
        Update: never;
      };
      stripe_user_orders: {
        Row: {
          customer_id: string;
          order_id: number;
          checkout_session_id: string;
          payment_intent_id: string;
          amount_subtotal: number;
          amount_total: number;
          currency: string;
          payment_status: string;
          order_status: string;
          order_date: string;
        };
        Insert: never;
        Update: never;
      };
    };
  };
};