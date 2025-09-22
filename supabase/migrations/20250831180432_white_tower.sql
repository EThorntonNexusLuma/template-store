/*
  # Fresh Supabase Project Setup

  1. New Tables
    - `simple_leads`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, unique, required)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `simple_leads` table
    - Allow public inserts (for lead forms)
    - Allow authenticated users to read all leads
    - Allow anonymous users to insert leads

  3. Notes
    - Simple table structure for easy testing
    - Public insert policy for lead capture forms
    - No complex relationships to start with
*/

-- Create simple leads table
CREATE TABLE IF NOT EXISTS simple_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE simple_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert leads (for contact forms)
CREATE POLICY "Anonymous users can insert leads"
  ON simple_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to insert leads
CREATE POLICY "Authenticated users can insert leads"
  ON simple_leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to read all leads
CREATE POLICY "Authenticated users can read all leads"
  ON simple_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_simple_leads_email ON simple_leads(email);
CREATE INDEX IF NOT EXISTS idx_simple_leads_created_at ON simple_leads(created_at);