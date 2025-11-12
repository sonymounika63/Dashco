/**
 * Supabase Client Configuration
 * 
 * This file initializes the Supabase client for use throughout the application.
 * Environment variables are loaded from .env file (VITE_ prefix required for Vite).
 * 
 * Security Note:
 * - VITE_SUPABASE_ANON_KEY is safe to expose in client-side code
 * - Never expose SUPABASE_SERVICE_ROLE_KEY in client code
 * - Service role key should only be used in Edge Functions or server-side code
 */

import { createClient } from '@supabase/supabase-js'

// Get environment variables (Vite requires VITE_ prefix for client-side access)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.\n' +
    'Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY\n' +
    'Make sure your .env file exists in the project root and contains these variables.'
  )
}

// Custom storage adapter for better Chrome compatibility
// Chrome has stricter cookie/storage policies, so we need to handle errors gracefully
const createChromeCompatibleStorage = () => {
  if (typeof window === 'undefined') return undefined

  return {
    getItem: (key) => {
      try {
        return window.localStorage.getItem(key)
      } catch (error) {
        console.warn('localStorage getItem error (Chrome privacy mode?):', error)
        // Fallback to sessionStorage if localStorage is blocked
        try {
          return window.sessionStorage.getItem(key)
        } catch (e) {
          console.error('sessionStorage also blocked:', e)
          return null
        }
      }
    },
    setItem: (key, value) => {
      try {
        window.localStorage.setItem(key, value)
      } catch (error) {
        console.warn('localStorage setItem error (Chrome privacy mode?):', error)
        // Fallback to sessionStorage if localStorage is blocked
        try {
          window.sessionStorage.setItem(key, value)
        } catch (e) {
          console.error('sessionStorage also blocked:', e)
        }
      }
    },
    removeItem: (key) => {
      try {
        window.localStorage.removeItem(key)
        window.sessionStorage.removeItem(key) // Remove from both for cleanup
      } catch (error) {
        console.warn('Storage removeItem error:', error)
      }
    },
  }
}

// Create and export Supabase client
// Chrome-specific: Use custom storage adapter for better compatibility with Chrome's privacy features
// Note: PKCE is the default OAuth flow in Supabase, so we don't need to specify it explicitly
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // Use custom storage adapter for Chrome compatibility
    // This adapter falls back to sessionStorage if localStorage is blocked
    storage: createChromeCompatibleStorage(),
  },
})

// Export types for TypeScript (if needed in future)
// export type Database = any // Will be generated from Supabase CLI later

