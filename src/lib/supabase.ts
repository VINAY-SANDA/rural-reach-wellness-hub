
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcedivkvdkpdltfvpsvo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZWRpdmt2ZGtwZGx0ZnZwc3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3Mjc2MjQsImV4cCI6MjA1OTMwMzYyNH0.upCDtI0dQmqqbKd3BgLZgvtcxHEBKeyXh55Ix8fCQVc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
