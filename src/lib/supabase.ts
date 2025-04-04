
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcedivkvdkpdltfvpsvo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZWRpdmt2ZGtwZGx0ZnZwc3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3Mjc2MjQsImV4cCI6MjA1OTMwMzYyNH0.upCDtI0dQmqqbKd3BgLZgvtcxHEBKeyXh55Ix8fCQVc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to create database tables if they don't exist
export const initializeDatabase = async () => {
  try {
    // Check if the profiles table exists
    const { error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    // If profiles table doesn't exist, create it
    if (checkError && checkError.message.includes('does not exist')) {
      console.log('Creating profiles table...');
      
      // Create profiles table
      const { error: createError } = await supabase.rpc('create_profiles_table');
      
      if (createError) {
        console.error('Error creating profiles table:', createError);
      } else {
        console.log('Profiles table created successfully');
      }
    }
    
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Call this function when your app initializes
