import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import Pricing from './pages/Pricing.jsx'
import DarkModeToggle from './components/ui/DarkModeToggle.jsx'
import { supabase } from './lib/supabase'
import { verifyOAuthConfig } from './config/oauth'

function App() {
  // Handle OAuth callback and auth state changes
  // Chrome-specific: Enhanced auth state handling for Chrome's stricter policies
  useEffect(() => {
    // Verify OAuth configuration on app startup
    verifyOAuthConfig();
    
    // Listen for auth state changes (including OAuth callbacks)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session ? 'Session exists' : 'No session');
        
        // Handle OAuth callback: https://cpmjtrrbzupvgqcapxak.supabase.co/auth/v1/callback
        // After Supabase processes the OAuth callback, it redirects to /dashboard
        // and triggers this SIGNED_IN event
        if (event === 'SIGNED_IN' && session) {
          console.log('User signed in:', session.user.email);
          
          // Chrome-specific: Ensure session is persisted
          try {
            // Create user profile if it doesn't exist
            const { error } = await supabase
              .from('users')
              .upsert(
                {
                  id: session.user.id,
                  email: session.user.email,
                  full_name:
                    session.user.user_metadata?.full_name ||
                    session.user.user_metadata?.name ||
                    null,
                  role: 'user',
                },
                {
                  onConflict: 'id',
                }
              )

            if (error) {
              console.error('Error creating user profile:', error)
            } else {
              console.log('User profile created/updated successfully');
            }
          } catch (err) {
            console.error('Error in user profile creation:', err);
          }
        }

        // Handle token refresh
        if (event === 'TOKEN_REFRESHED' && session) {
          console.log('Token refreshed successfully')
        }

        // Handle sign out
        if (event === 'SIGNED_OUT') {
          console.log('User signed out')
        }
        
        // Chrome-specific: Handle TOKEN_REFRESHED errors (may indicate storage issues)
        if (event === 'TOKEN_REFRESHED' && !session) {
          console.warn('Token refresh failed - session lost. This may be a Chrome storage issue.');
        }
      }
    )

    // Chrome-specific: Check initial session state
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting initial session:', error);
      } else if (session) {
        console.log('Initial session found:', session.user.email);
      } else {
        console.log('No initial session found');
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Use '/' for development, '/Dashco' for production (GitHub Pages)
  const basename = import.meta.env.MODE === 'development' ? '/' : '/Dashco'

  return (
    <div id="wrapper">
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
        <DarkModeToggle />
      </Router>
    </div>
  )
}

export default App
