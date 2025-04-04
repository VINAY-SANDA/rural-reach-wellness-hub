
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcedivkvdkpdltfvpsvo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZWRpdmt2ZGtwZGx0ZnZwc3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3Mjc2MjQsImV4cCI6MjA1OTMwMzYyNH0.upCDtI0dQmqqbKd3BgLZgvtcxHEBKeyXh55Ix8fCQVc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to create database tables if they don't exist
export const initializeDatabase = async () => {
  try {
    console.log('Checking and creating database tables...');
    
    // Create profiles table directly with SQL
    const { error } = await supabase.from('profiles').select('count').limit(1).single();
    
    if (error && error.message.includes('does not exist')) {
      console.log('Creating profiles table with SQL...');
      
      // Use SQL to create the profiles table
      const { error: sqlError } = await supabase.rpc('execute_sql', {
        sql_query: `
          CREATE TABLE IF NOT EXISTS profiles (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users(id) NOT NULL,
            full_name TEXT,
            avatar_url TEXT,
            role TEXT CHECK (role IN ('patient', 'doctor', 'community')),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            email TEXT,
            
            -- Patient specific fields
            age INTEGER,
            gender TEXT,
            medical_history TEXT,
            allergies TEXT[],
            medications TEXT[],
            
            -- Doctor specific fields
            specialization TEXT,
            qualification TEXT,
            experience_years INTEGER,
            license_number TEXT,
            languages TEXT[],
            consultation_schedule JSONB,
            
            -- Community specific fields
            organization_name TEXT,
            service_area TEXT[],
            programs_offered TEXT[],
            contact_number TEXT,
            
            UNIQUE(user_id)
          );
          
          -- Enable RLS (Row Level Security)
          ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
          
          -- Create policy to allow users to read their own profile
          CREATE POLICY "Users can view their own profile"
            ON profiles FOR SELECT
            USING (auth.uid() = user_id);
          
          -- Create policy to allow users to update their own profile
          CREATE POLICY "Users can update their own profile"
            ON profiles FOR UPDATE
            USING (auth.uid() = user_id);
        `
      });
      
      if (sqlError) {
        // If the execute_sql function doesn't exist, we'll need to guide the user
        console.error('Error creating profiles table:', sqlError);
        throw new Error('Supabase SQL execution failed. You may need to manually create the profiles table in the Supabase dashboard.');
      } else {
        console.log('Profiles table created successfully');
      }
    } else {
      console.log('Profiles table already exists, skipping creation');
    }
    
    console.log('Database initialization complete');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};
