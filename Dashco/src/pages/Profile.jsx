import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/template/Navbar.jsx'
import Sidebar from '../components/template/Sidebar.jsx'
import PageHeader from '../components/template/PageHeader.jsx'
import ProfileHeaderCard from '../components/profile/ProfileHeaderCard'
import ProfileInfoCard from '../components/profile/ProfileInfoCard'
import FollowersCard from '../components/profile/FollowersCard'
import ProfileTabs from '../components/profile/ProfileTabs'
import ProfileIconCard from '../components/profile/ProfileIconCard'
import ProfileSliderCard from '../components/profile/ProfileSliderCard'
import { supabase } from '../lib/supabase'

const Profile = () => {
  const navigate = useNavigate()
  // Sidebar should be open by default on desktop (xl screens >= 1280px)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth >= 1280
  })
  // Sidebar toggle state for desktop collapse/expand
  const [sidebarToggle, setSidebarToggle] = useState(false)
  // Track if we're on mobile to avoid checking window.innerWidth during render
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1280)
  const location = useLocation()
  
  // User data state
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [company, setCompany] = useState(null)

  // Check authentication and fetch user data
  // Chrome-specific: Enhanced session retrieval with retries for Chrome's stricter policies
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Chrome-specific: Try multiple times to get session (Chrome may delay session persistence)
        let session = null
        let sessionError = null
        const maxRetries = 3
        const retryDelay = 300 // 300ms between retries
        
        for (let i = 0; i < maxRetries; i++) {
          const result = await supabase.auth.getSession()
          session = result.data?.session
          sessionError = result.error
          
          if (session) {
            console.log('Session found on attempt', i + 1)
            break
          }
          
          if (i < maxRetries - 1) {
            console.log(`Session not found, retrying... (${i + 1}/${maxRetries})`)
            await new Promise(resolve => setTimeout(resolve, retryDelay))
          }
        }
        
        if (sessionError || !session) {
          console.log('No session found after retries, redirecting to login', sessionError)
          navigate('/login')
          return
        }

        setUser(session.user)
        console.log('Profile: User session found:', session.user.email)

        // Fetch user profile from public.users table
        // Use explicit relationship: companies!fk_users_company_id to get the company the user belongs to
        // Chrome-specific: Add retry logic for profile fetch
        let profileData = null
        let profileError = null
        const maxProfileRetries = 3
        
        for (let i = 0; i < maxProfileRetries; i++) {
          const result = await supabase
            .from('users')
            .select('*, companies!fk_users_company_id(*)')
            .eq('id', session.user.id)
            .single()
          
          profileData = result.data
          profileError = result.error
          
          if (profileData && !profileError) {
            console.log('Profile data fetched successfully on attempt', i + 1)
            break
          }
          
          if (i < maxProfileRetries - 1) {
            console.log(`Profile fetch failed, retrying... (${i + 1}/${maxProfileRetries})`, profileError)
            await new Promise(resolve => setTimeout(resolve, 300))
          }
        }

        if (profileError) {
          console.error('Error fetching user profile after retries:', profileError)
          // If profile doesn't exist, create it
          if (profileError.code === 'PGRST116') {
            console.log('Profile does not exist, creating new profile...')
            const { data: newProfile, error: createError } = await supabase
              .from('users')
              .insert({
                id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata?.full_name || 
                          session.user.user_metadata?.name || 
                          null,
                role: 'user',
              })
              .select('*, companies!fk_users_company_id(*)')
              .single()

            if (createError) {
              console.error('Error creating user profile:', createError)
            } else {
              console.log('User profile created successfully')
              setUserProfile(newProfile)
              if (newProfile.companies) {
                setCompany(newProfile.companies)
              }
            }
          } else {
            // Other error - log it but don't redirect (might be temporary)
            console.warn('Profile fetch error (non-fatal):', profileError)
          }
        } else if (profileData) {
          console.log('Profile data loaded successfully')
          setUserProfile(profileData)
          if (profileData.companies) {
            setCompany(profileData.companies)
          }
        }

        setLoading(false)
      } catch (err) {
        console.error('Error in fetchUserData:', err)
        setLoading(false)
        navigate('/login')
      }
    }

    fetchUserData()

    // Listen for auth state changes
    // Chrome-specific: Enhanced auth state change handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Profile: Auth state change:', event, session ? 'Session exists' : 'No session')
      
      if (event === 'SIGNED_OUT' || !session) {
        console.log('Profile: User signed out, redirecting to login')
        navigate('/login')
      } else if (session) {
        setUser(session.user)
        // Refresh profile data with retry logic for Chrome
        let profileData = null
        let profileError = null
        const maxRetries = 3
        
        for (let i = 0; i < maxRetries; i++) {
          const result = await supabase
            .from('users')
            .select('*, companies!fk_users_company_id(*)') // Use explicit relationship here too
            .eq('id', session.user.id)
            .single()
          
          profileData = result.data
          profileError = result.error
          
          if (profileData && !profileError) {
            console.log('Profile data refreshed successfully on attempt', i + 1)
            break
          }
          
          if (i < maxRetries - 1) {
            console.log(`Profile refresh failed, retrying... (${i + 1}/${maxRetries})`)
            await new Promise(resolve => setTimeout(resolve, 300))
          }
        }
        
        if (profileData && !profileError) {
          setUserProfile(profileData)
          if (profileData.companies) {
            setCompany(profileData.companies)
          }
        } else {
          console.error('Profile: Error refreshing profile data after retries:', profileError)
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  useEffect(() => {
    // Scroll to top on mount (matching Lucid behavior)
    window.scrollTo(0, 0)
  }, [location])

  // Handle window resize to keep sidebar state in sync with screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const mobile = width < 1280
      setIsMobile(mobile)
      
      if (width >= 1280) {
        // On desktop, sidebar should always be open (but can be collapsed)
        setIsSidebarOpen(true)
      } else {
        // On mobile, close sidebar when resizing from desktop
        setIsSidebarOpen(false)
      }
    }

    // Check on mount
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lock body scroll when sidebar is open on mobile (match TailAdmin behavior)
  useEffect(() => {
    // Only lock body scroll on mobile when sidebar is open
    // On desktop, body should never be locked - content area handles scrolling
    if (isSidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      // Always restore scroll on unmount
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen, isMobile])

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleToggleSidebarCollapse = () => {
    setSidebarToggle((prev) => !prev)
  }

  // Handler to refresh user profile after update
  // Chrome-specific: Enhanced with retry logic
  const handleProfileUpdate = async () => {
    if (!user) return

    try {
      let profileData = null
      let profileError = null
      const maxRetries = 3
      
      for (let i = 0; i < maxRetries; i++) {
        const result = await supabase
          .from('users')
          .select('*, companies!fk_users_company_id(*)') // Use explicit relationship here too
          .eq('id', user.id)
          .single()
        
        profileData = result.data
        profileError = result.error
        
        if (profileData && !profileError) {
          console.log('Profile updated successfully on attempt', i + 1)
          break
        }
        
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 300))
        }
      }

      if (profileError) {
        console.error('Error refreshing user profile after retries:', profileError)
      } else if (profileData) {
        setUserProfile(profileData)
        if (profileData.companies) {
          setCompany(profileData.companies)
        }
      }
    } catch (err) {
      console.error('Error in handleProfileUpdate:', err)
    }
  }

  const profileSliderData = [
    {
      color: 'blue',
      headerText: 'Projects',
      subTitle: 'Active',
      data: [
        { label: 'Week 1', value: 5 },
        { label: 'Week 2', value: 8 },
        { label: 'Week 3', value: 12 },
        { label: 'Week 4', value: 15 },
      ],
    },
    {
      color: 'green',
      headerText: 'Tasks',
      subTitle: 'Completed',
      data: [
        { label: 'Week 1', value: 20 },
        { label: 'Week 2', value: 35 },
        { label: 'Week 3', value: 42 },
        { label: 'Week 4', value: 50 },
      ],
    },
  ]

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden dark:bg-gray-900">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-gray-500 mb-4"></i>
            <p className="text-gray-500">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error state if no user
  if (!user || !userProfile) {
    return null // Will redirect to login
  }

  return (
    <div className="flex h-screen overflow-hidden dark:bg-gray-900">
      {/* ===== Sidebar Start ===== */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        sidebarToggle={sidebarToggle}
      />
      {/* ===== Sidebar End ===== */}

      {/* ===== Content Area Start ===== */}
      <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto h-full max-h-screen">
        {/* Small Device Overlay Start - Match TailAdmin mobile overlay */}
        {isSidebarOpen && isMobile && (
          <div
            className="fixed inset-0 z-[9998] h-screen w-screen bg-black/50 transition-opacity duration-300 xl:hidden"
            onClick={(e) => {
              e.stopPropagation()
              handleCloseSidebar()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleCloseSidebar()
              }
            }}
            aria-hidden="true"
            role="button"
            tabIndex={-1}
          ></div>
        )}
        {/* Small Device Overlay End */}

        {/* ===== Main Content Start ===== */}
        <main>
          {/* ===== Header Start ===== */}
          <Navbar
            onToggleSidebar={handleToggleSidebar}
            onToggleSidebarCollapse={handleToggleSidebarCollapse}
            sidebarToggle={sidebarToggle}
            isSidebarOpen={isSidebarOpen}
          />
          {/* ===== Header End ===== */}

          <div className="mx-auto max-w-screen-2xl p-4 pb-20 md:p-6 md:pb-6">
            <PageHeader
              HeaderText="User Profile"
              Breadcrumb={[
                { name: 'Dashboard', navigate: '/dashboard' },
                { name: 'Profile', navigate: '' },
              ]}
            />

            <div className="row clearfix">
              <div className="col-lg-4 col-md-12">
                <ProfileHeaderCard 
                  user={user}
                  userProfile={userProfile}
                  company={company}
                />
                <ProfileInfoCard 
                  user={user}
                  userProfile={userProfile}
                  company={company}
                />
                <FollowersCard headerText="Team Members" />
              </div>
              <div className="col-lg-5 col-md-12">
                <ProfileTabs 
                  user={user}
                  userProfile={userProfile}
                  company={company}
                  onProfileUpdate={handleProfileUpdate}
                />
              </div>
              <div className="col-lg-3 col-md-12">
                <ProfileIconCard />
                {profileSliderData.map((data, i) => (
                  <ProfileSliderCard
                    key={i}
                    color={data.color}
                    data={data.data}
                    headerText={data.headerText}
                    subTitle={data.subTitle}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
        {/* ===== Main Content End ===== */}
      </div>
      {/* ===== Content Area End ===== */}
    </div>
  )
}

export default Profile

