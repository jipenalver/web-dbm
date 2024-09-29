import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// MAIL_HOST=smtp.office365.com
// MAIL_PORT=587
// MAIL_USERNAME=noreply@familycourtcorner.com
// MAIL_PASSWORD=NRFCCApp1@
// MAIL_FROM_ADDRESS="noreply@familycourtcorner.com"
// MAIL_FROM_NAME="Name of your App"
