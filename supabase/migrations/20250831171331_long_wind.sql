/*
  # The Ampire Leads Database Schema

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, required)
      - `email` (text, unique, required)
      - `phone` (text, optional)
      - `company` (text, optional)
      - `job_title` (text, optional)
      - `lead_source` (text, required - where the lead came from)
      - `lead_status` (text, default 'new')
      - `interest_level` (text, default 'medium')
      - `notes` (text, optional)
      - `assigned_to` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `lead_activities`
      - `id` (uuid, primary key)
      - `lead_id` (uuid, foreign key to leads)
      - `activity_type` (text, required - email, call, meeting, etc.)
      - `description` (text, required)
      - `scheduled_at` (timestamp, optional)
      - `completed_at` (timestamp, optional)
      - `created_by` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)

    - `lead_tags`
      - `id` (uuid, primary key)
      - `lead_id` (uuid, foreign key to leads)
      - `tag_name` (text, required)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their assigned leads
    - Add policies for lead activities and tags based on lead ownership

  3. Indexes
    - Add indexes for frequently queried columns (email, lead_status, assigned_to)
*/

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  company text,
  job_title text,
  lead_source text NOT NULL DEFAULT 'website',
  lead_status text NOT NULL DEFAULT 'new' CHECK (lead_status IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost')),
  interest_level text NOT NULL DEFAULT 'medium' CHECK (interest_level IN ('low', 'medium', 'high', 'hot')),
  notes text,
  assigned_to uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create lead_activities table
CREATE TABLE IF NOT EXISTS lead_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  activity_type text NOT NULL CHECK (activity_type IN ('email', 'call', 'meeting', 'demo', 'follow_up', 'note')),
  description text NOT NULL,
  scheduled_at timestamptz,
  completed_at timestamptz,
  created_by uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create lead_tags table
CREATE TABLE IF NOT EXISTS lead_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  tag_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(lead_id, tag_name)
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leads table
CREATE POLICY "Users can view leads assigned to them"
  ON leads
  FOR SELECT
  TO authenticated
  USING (assigned_to = auth.uid() OR assigned_to IS NULL);

CREATE POLICY "Users can insert leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (assigned_to = auth.uid() OR assigned_to IS NULL);

CREATE POLICY "Users can update their assigned leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (assigned_to = auth.uid())
  WITH CHECK (assigned_to = auth.uid());

CREATE POLICY "Users can delete their assigned leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (assigned_to = auth.uid());

-- RLS Policies for lead_activities table
CREATE POLICY "Users can view activities for their leads"
  ON lead_activities
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM leads 
      WHERE leads.id = lead_activities.lead_id 
      AND (leads.assigned_to = auth.uid() OR leads.assigned_to IS NULL)
    )
  );

CREATE POLICY "Users can insert activities for their leads"
  ON lead_activities
  FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM leads 
      WHERE leads.id = lead_activities.lead_id 
      AND (leads.assigned_to = auth.uid() OR leads.assigned_to IS NULL)
    )
  );

CREATE POLICY "Users can update their own activities"
  ON lead_activities
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can delete their own activities"
  ON lead_activities
  FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- RLS Policies for lead_tags table
CREATE POLICY "Users can view tags for their leads"
  ON lead_tags
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM leads 
      WHERE leads.id = lead_tags.lead_id 
      AND (leads.assigned_to = auth.uid() OR leads.assigned_to IS NULL)
    )
  );

CREATE POLICY "Users can manage tags for their leads"
  ON lead_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM leads 
      WHERE leads.id = lead_tags.lead_id 
      AND (leads.assigned_to = auth.uid() OR leads.assigned_to IS NULL)
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(lead_status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_created_by ON lead_activities(created_by);
CREATE INDEX IF NOT EXISTS idx_lead_tags_lead_id ON lead_tags(lead_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for leads table
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();