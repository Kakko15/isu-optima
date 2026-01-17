import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and Anon Key from your Supabase Dashboard
const supabaseUrl = 'https://nlqynofhkcocfsozukva.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5scXlub2Zoa2NvY2Zzb2t1Y3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MzMyMjUsImV4cCI6MjA4NDIwOTIyNX0.E5oe-W8p2s_fmbKXZ9tCT3kb2fOj6KOymQyjID5oi6g';

export const supabase = createClient(supabaseUrl, supabaseKey);