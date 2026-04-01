const  {createClient} = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://pnwhcfadfnjfcoiqveqd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBud2hjZmFkZm5qZmNvaXF2ZXFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzcwNTM2OSwiZXhwIjoyMDQ5MjgxMzY5fQ.P-7apJ9XDpZkemw5vpo9nP4TS7Uz0Rvvvr99Tmg2Kzw'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

module.exports = supabase

