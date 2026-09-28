import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jleoipecxyohpkyywtde.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZW9pcGVjeHlvaHBreXl3dGRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2MTE4MTUsImV4cCI6MjEwNjE4NzgxNX0.gKd0D418mBOpAHMce7x0ocD8U5kCdh1QeWCVdCwpLck';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
