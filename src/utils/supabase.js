import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Check authentication
export const isAuthenticated = async () => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  if (error) {
    console.error('Error fetching session:', error)
    return false
  }

  return !!session
}

// Form action utils
export const formActionDefault = {
  formStatus: 0,
  formProcess: false,
  formSuccessMessage: '',
  formErrorMessage: ''
}
