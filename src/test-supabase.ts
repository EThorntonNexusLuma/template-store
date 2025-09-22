// Test Supabase Connection for Replit Integration
// This file demonstrates how to connect and test the New Web Leads table

import { createClient } from '@supabase/supabase-js';

// Environment variables (these should be in your .env file)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.log('Make sure you have VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test function to verify connection
export async function testSupabaseConnection() {
  console.log('🔄 Testing Supabase connection...');
  
  try {
    // Test 1: Check if we can read from the table
    console.log('📖 Testing read access...');
    const { data: existingLeads, error: readError } = await supabase
      .from('new_web_leads')
      .select('*')
      .limit(5);

    if (readError) {
      console.error('❌ Read test failed:', readError.message);
      return false;
    }

    console.log('✅ Read test passed. Found leads:', existingLeads?.length || 0);
    if (existingLeads && existingLeads.length > 0) {
      console.log('📋 Sample data:', existingLeads[0]);
    }

    // Test 2: Try to insert a new test lead
    console.log('📝 Testing write access...');
    const testLead = {
      name: 'Test User from Replit',
      email: `test-${Date.now()}@replit-test.com`
    };

    const { data: newLead, error: insertError } = await supabase
      .from('new_web_leads')
      .insert(testLead)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Write test failed:', insertError.message);
      return false;
    }

    console.log('✅ Write test passed. Created lead:', newLead);

    // Test 3: Verify the lead was actually inserted
    console.log('🔍 Verifying insertion...');
    const { data: verifyLead, error: verifyError } = await supabase
      .from('new_web_leads')
      .select('*')
      .eq('email', testLead.email)
      .single();

    if (verifyError) {
      console.error('❌ Verification failed:', verifyError.message);
      return false;
    }

    console.log('✅ Verification passed. Lead found:', verifyLead);
    console.log('🎉 All tests passed! Supabase connection is working correctly.');
    
    return true;

  } catch (error) {
    console.error('❌ Connection test failed with error:', error);
    return false;
  }
}

// Function to add a lead (for use in your Replit project)
export async function addWebLead(name: string, email: string) {
  try {
    const { data, error } = await supabase
      .from('new_web_leads')
      .insert({ name, email })
      .select()
      .single();

    if (error) {
      console.error('Error adding lead:', error.message);
      return { success: false, error: error.message };
    }

    console.log('Lead added successfully:', data);
    return { success: true, data };

  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

// Function to get all leads (for use in your Replit project)
export async function getAllWebLeads() {
  try {
    const { data, error } = await supabase
      .from('new_web_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };

  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
}