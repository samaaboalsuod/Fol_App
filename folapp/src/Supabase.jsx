
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://otnuzlslyxxpczlmiytz.supabase.co'
const supabaseKey = 'sb_publishable_NEe8nx_Kzo3oxDDB_tFarA_pRe2qVL6'
export const supabase = createClient(supabaseUrl, supabaseKey)