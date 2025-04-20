
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize database - create necessary tables if they don't exist
export const initializeDatabase = async () => {
  try {
    // Check if the stored procedure exists, create it if it doesn't
    const { error: procedureError } = await supabase.rpc('create_profiles_table')
      .catch(async () => {
        // If the stored procedure doesn't exist, create it
        const createProcedureSql = `
          CREATE OR REPLACE FUNCTION create_profiles_table()
          RETURNS void AS $$
          BEGIN
            -- Check if the profiles table already exists
            IF NOT EXISTS (
              SELECT FROM pg_tables 
              WHERE schemaname = 'public' 
              AND tablename = 'profiles'
            ) THEN
              -- Create the profiles table
              CREATE TABLE public.profiles (
                id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
                email TEXT UNIQUE NOT NULL,
                full_name TEXT,
                avatar_url TEXT,
                user_role TEXT DEFAULT 'patient' CHECK (user_role IN ('patient', 'doctor', 'admin')),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
              );
              
              -- Set up Row Level Security (RLS)
              ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
              
              -- Create policies
              CREATE POLICY "Users can view their own profile"
                ON public.profiles FOR SELECT
                USING (auth.uid() = id);
                
              CREATE POLICY "Users can update their own profile"
                ON public.profiles FOR UPDATE
                USING (auth.uid() = id);
                
              -- Create a trigger to automatically create a profile for new users
              CREATE OR REPLACE FUNCTION public.handle_new_user()
              RETURNS TRIGGER AS $$
              BEGIN
                INSERT INTO public.profiles (id, email)
                VALUES (NEW.id, NEW.email);
                RETURN NEW;
              END;
              $$ LANGUAGE plpgsql SECURITY DEFINER;
              
              CREATE TRIGGER on_auth_user_created
                AFTER INSERT ON auth.users
                FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
            END IF;
          END;
          $$ LANGUAGE plpgsql;
        `;
        
        const { error } = await supabase.rpc('exec_sql', { sql: createProcedureSql })
          .catch(async () => {
            // If the exec_sql function doesn't exist, create it first
            const createExecSqlSql = `
              CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS void AS $$
              BEGIN
                EXECUTE sql;
              END;
              $$ LANGUAGE plpgsql SECURITY DEFINER;
            `;
            
            await supabase.sql(createExecSqlSql);
            return { error: null };
          });
          
        return { error };
      });
    
    if (procedureError) {
      console.error("Error with stored procedure:", procedureError);
      
      // Alternative approach: direct table creation
      console.info("Attempting direct table creation...");
      
      // Check if profiles table exists
      const { error: checkError } = await supabase
        .from("profiles")
        .select("id")
        .limit(1);

      if (checkError && checkError.code === "PGRST116") {
        // Table doesn't exist, create it manually
        // Note: This is a simplified version and won't create triggers or RLS
        // It's better to set these up in the Supabase dashboard
        console.info("Creating profiles table directly...");
        
        await supabase.sql(`
          CREATE TABLE IF NOT EXISTS public.profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            email TEXT UNIQUE NOT NULL,
            full_name TEXT,
            avatar_url TEXT,
            user_role TEXT DEFAULT 'patient',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `).catch(err => {
          console.error("Error creating profiles table directly:", err);
          console.info("Please create the profiles table manually in the Supabase dashboard");
        });
      } else {
        console.info("Profiles table already exists, skipping creation");
      }
    } else {
      // If no procedureError, call the procedure
      await supabase.rpc('create_profiles_table');
      console.info("Profiles table setup complete");
    }
    
    console.info("Database initialization complete");
  } catch (error) {
    console.error("Error initializing database:", error);
    console.info("It might be necessary to manually create the profiles table in the Supabase dashboard");
    console.info("Please ensure your Supabase project is properly configured");
  }
};

// Manual initialization instructions if the automatic approach fails
/*
  If the automatic initialization fails, you can manually create the profiles table in Supabase:
  
  1. Go to your Supabase dashboard
  2. Navigate to the SQL editor
  3. Run the following SQL:
  
  CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    user_role TEXT DEFAULT 'patient' CHECK (user_role IN ('patient', 'doctor', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  
  -- Set up Row Level Security (RLS)
  ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
  
  -- Create policies
  CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);
    
  CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);
  
  -- Create a trigger for new users
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;
  
  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
*/
