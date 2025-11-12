/**
 * Authentication Utilities
 * 
 * Helper functions for authentication operations using Supabase Auth
 */

import { supabase } from './supabase'
import { getOAuthRedirectUrl, OAUTH_PROVIDERS } from '../config/oauth'

/**
 * Sign in with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{data, error}>} Supabase auth response
 */
export async function signInWithEmail(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    
    if (error) {
      console.error('Sign in error:', error)
      return { data: null, error }
    }
    
    if (data?.session) {
      console.log('Sign in successful, session:', data.session.user.email)
    }
    
    return { data, error }
  } catch (error) {
    console.error('Sign in exception:', error)
    return { data: null, error }
  }
}

/**
 * Sign up with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} fullName - User's full name
 * @returns {Promise<{data, error}>} Supabase auth response
 */
export async function signUpWithEmail(email, password, fullName) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { data, error }
  } catch (error) {
    return { data: null, error }
  }
}

/**
 * Sign in with Google OAuth
 * 
 * OAuth Flow:
 * 1. User clicks "Sign in with Google"
 * 2. Redirects to Google for authentication
 * 3. Google redirects to: https://cpmjtrrbzupvgqcapxak.supabase.co/auth/v1/callback?code=...&state=...
 * 4. Supabase processes the callback and redirects to redirectTo URL
 * 5. User lands on redirectTo URL with session
 * 
 * Note: Chrome may show a "bounce tracking mitigations" warning about the Supabase callback URL.
 * This is expected behavior for OAuth flows and does not affect functionality. Chrome flags
 * intermediate redirect sites in the navigation chain as part of its privacy features.
 * 
 * Note: The OAuth flow uses 'prompt: select_account consent' to force both account selection
 * and consent screen. This helps prevent automatic Gmail sign-in by requiring explicit user action.
 * 
 * IMPORTANT: Google OAuth inherently signs you into your Google account, which includes Gmail.
 * This is a fundamental limitation of Google's OAuth system - when you authenticate with Google,
 * you're signing into your Google account, which includes all Google services.
 * 
 * To completely prevent Gmail sign-in, users must:
 * 1. Sign out of Gmail before signing into your app
 * 2. Use a different browser profile
 * 3. Use incognito/private mode
 * 4. Use a different Google account specifically for the app
 * 
 * The 'select_account consent' prompt helps by requiring explicit user action, but cannot
 * completely prevent Google from signing you into Gmail if you're using the same Google account.
 * 
 * Note: If you see "This browser or app may not be secure" error:
 * 1. Go to Google Cloud Console → OAuth consent screen
 * 2. Add your email as a test user (if app is in Testing mode)
 * 3. Verify redirect URI in Google Cloud Console matches: https://cpmjtrrbzupvgqcapxak.supabase.co/auth/v1/callback
 * 
 * @param {string} redirectTo - URL to redirect after authentication (default: /dashboard)
 * @returns {Promise<{data, error}>} Supabase auth response
 */
export async function signInWithGoogle(redirectTo = null) {
  try {
    // Use centralized OAuth configuration
    const redirectUrl = redirectTo || getOAuthRedirectUrl()
    const googleConfig = OAUTH_PROVIDERS.google
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: googleConfig.provider,
      options: {
        redirectTo: redirectUrl,
        // Use centralized OAuth settings from config/oauth.js
        // This ensures consistency across the application
        queryParams: googleConfig.queryParams,
      },
    })
    
    if (error) {
      console.error('Google OAuth error:', error)
      // Provide more helpful error messages
      if (error.message?.includes('browser') || error.message?.includes('secure')) {
        return {
          data: null,
          error: {
            ...error,
            message: 'Google OAuth requires a secure browser. Please use Chrome or Firefox, and ensure your email is added as a test user in Google Cloud Console if the app is in Testing mode.',
          },
        }
      }
    }
    
    // If we get a URL, the OAuth flow has started (redirect will happen)
    if (data?.url) {
      // Redirect will happen automatically, but we can return success
      return { data, error: null }
    }
    
    return { data, error }
  } catch (error) {
    console.error('Google OAuth exception:', error)
    return {
      data: null,
      error: {
        ...error,
        message: error.message || 'Failed to initiate Google sign-in. Please try again or use email/password login.',
      },
    }
  }
}

/**
 * Sign out current user
 * @returns {Promise<{error}>} Supabase auth response
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error) {
    return { error }
  }
}

/**
 * Get current user session
 * @returns {Promise<{data, error}>} Current session
 */
export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { data: session, error }
  } catch (error) {
    return { data: null, error }
  }
}

/**
 * Get current user
 * @returns {Promise<{data, error}>} Current user
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { data: user, error }
  } catch (error) {
    return { data: null, error }
  }
}

/**
 * Reset password (send reset email)
 * @param {string} email - User email
 * @returns {Promise<{data, error}>} Supabase auth response
 */
export async function resetPassword(email) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { data, error }
  } catch (error) {
    return { data: null, error }
  }
}

/**
 * Update user password
 * @param {string} newPassword - New password
 * @returns {Promise<{data, error}>} Supabase auth response
 */
export async function updatePassword(newPassword) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    return { data, error }
  } catch (error) {
    return { data: null, error }
  }
}

