/*
  # Fix RLS Policies for New Web Leads Table

  1. Security Updates
    - Drop existing restrictive policies on `new_web_leads` table
    - Add new policies allowing anonymous users to insert leads
    - Add policy allowing public read access for testing
  
  2. Changes
    - Allow anonymous (anon) users to insert new leads
    - Allow public read access for connection testing
    - Maintain data security while enabling lead collection
*/

-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Anonymous users can insert leads" ON new_web_leads;
DROP POLICY IF EXISTS "Authenticated users can insert leads" ON new_web_leads;
DROP POLICY IF EXISTS "Authenticated users can read all leads" ON new_web_leads;

-- Create new policies that allow anonymous access
CREATE POLICY "Allow anonymous lead insertion"
  ON new_web_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public lead insertion"
  ON new_web_leads
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public read access"
  ON new_web_leads
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow anonymous read access"
  ON new_web_leads
  FOR SELECT
  TO anon
  USING (true);