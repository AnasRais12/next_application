import { createClient } from '@supabase/supabase-js';
const SERVICEKEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuYmJxemhhYnBhcWdsbWFteW1iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODUxNzM2NiwiZXhwIjoyMDU0MDkzMzY2fQ.JXsEqZ1ljn-zjltSgB8LySNKlDaoD7gTM8AVWfYJQqU';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuYmJxemhhYnBhcWdsbWFteW1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTczNjYsImV4cCI6MjA1NDA5MzM2Nn0.vqbDBPL7DTVtUFXoHR3aE1QRzc1QjW7DvcmCCmfP7z0';
export const supabase = createClient(
  'https://xnbbqzhabpaqglmamymb.supabase.co',
  supabaseKey
);
export const supabaseRole = createClient(
  'https://xnbbqzhabpaqglmamymb.supabase.co',
  SERVICEKEY
);
