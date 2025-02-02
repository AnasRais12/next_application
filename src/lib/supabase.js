import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xnbbqzhabpaqglmamymb.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuYmJxemhhYnBhcWdsbWFteW1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTczNjYsImV4cCI6MjA1NDA5MzM2Nn0.vqbDBPL7DTVtUFXoHR3aE1QRzc1QjW7DvcmCCmfP7z0"
console.log(createClient, " Create Client");

const supabase = createClient(supabaseUrl,supabaseKey)


export default supabase