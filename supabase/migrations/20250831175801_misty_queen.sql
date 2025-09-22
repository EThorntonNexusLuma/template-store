/*
  # Create New Web Leads Table

  1. New Tables
    - `new_web_leads`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required, unique)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `new_web_leads` table
    - Add policy for authenticated users to read all leads
    - Add policy for authenticated users to insert leads
    - Add policy for public (anonymous) users to insert leads (for web forms)

  3. Test Data
    - Insert a test lead to verify functionality
*/

-- Create the new_web_leads table
CREATE TABLE IF NOT EXISTS new_web_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE new_web_leads ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read all leads
CREATE POLICY "Authenticated users can read all leads"
  ON new_web_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users to insert leads
CREATE POLICY "Authenticated users can insert leads"
  ON new_web_leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for anonymous users to insert leads (for web forms)
CREATE POLICY "Anonymous users can insert leads"
  ON new_web_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Insert test data
INSERT INTO new_web_leads (name, email) VALUES 
  ('John Doe', 'john.doe@example.com'),
  ('Jane Smith', 'jane.smith@example.com')
ON CONFLICT (email) DO NOTHING;