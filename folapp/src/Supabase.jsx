
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://otnuzlslyxxpczlmiytz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90bnV6bHNseXh4cGN6bG1peXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMzczOTEsImV4cCI6MjA4OTkxMzM5MX0.UgAyhPcD2NOOCe3IDJZDxRuG-4i0332pHFkOrmG3GRc'
export const supabase = createClient(supabaseUrl, supabaseKey)