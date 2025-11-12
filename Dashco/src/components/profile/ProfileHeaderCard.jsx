import { useState, useEffect } from 'react'
import userImage from '../../assets/images/user.png'
import { supabase } from '../../lib/supabase'

const ProfileHeaderCard = ({ user, userProfile, company }) => {
  const [imageError, setImageError] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [userName, setUserName] = useState('')
  const [userLocation, setUserLocation] = useState('')

  useEffect(() => {
    if (userProfile) {
      // Set user name
      const name = userProfile.full_name || 
                   user?.user_metadata?.full_name || 
                   user?.user_metadata?.name || 
                   user?.email?.split('@')[0] || 
                   'User'
      setUserName(name)

      // Set location from company or user metadata
      const location = company?.location || 
                      company?.address || 
                      user?.user_metadata?.location || 
                      ''
      setUserLocation(location)

      // Try to get avatar from Supabase Storage or user metadata
      if (user?.user_metadata?.avatar_url) {
        setAvatarUrl(user.user_metadata.avatar_url)
      } else if (user?.user_metadata?.picture) {
        setAvatarUrl(user.user_metadata.picture)
      }
    }
  }, [user, userProfile, company])

  const handleImageError = () => {
    setImageError(true)
    setAvatarUrl(null)
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!userName) return 'U'
    const names = userName.split(' ')
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase()
    }
    return userName.substring(0, 2).toUpperCase()
  }

  return (
    <div className="card profile-header">
      <div className="body">
        <div className="profile-image">
          {imageError || !avatarUrl ? (
            <div className="rounded-full w-[120px] h-[120px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold mx-auto mb-5">
              {getInitials()}
            </div>
          ) : (
            <img
              alt="Profile"
              className="rounded-full w-[120px] h-[120px] object-cover block mx-auto mb-5"
              src={avatarUrl}
              onError={handleImageError}
            />
          )}
        </div>
        <div className="text-center">
          <h4 className="m-b-0">
            <strong>{userName}</strong>
          </h4>
          {userLocation && (
            <span className="text-[#8892a0] text-sm">{userLocation}</span>
          )}
          {company && (
            <div className="mt-2">
              <span className="text-[#8892a0] text-sm">{company.name}</span>
            </div>
          )}
          {userProfile?.role && (
            <div className="mt-1">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                {userProfile.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-3 justify-center mt-[15px]">
          <button 
            className="btn btn-primary mr-1"
            onClick={() => {
              // Scroll to settings tab
              const settingsTab = document.querySelector('[data-tab="settings"]')
              if (settingsTab) {
                settingsTab.click()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            Edit Profile
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => {
              // Navigate to dashboard
              window.location.href = '/dashboard'
            }}
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeaderCard
