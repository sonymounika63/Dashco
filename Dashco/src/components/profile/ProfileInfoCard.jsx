import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ProfileInfoCard = ({ user, userProfile, company }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [userInfo, setUserInfo] = useState({
    email: '',
    phone: '',
    address: '',
    role: '',
    companyName: '',
    createdAt: '',
  })

  useEffect(() => {
    if (user && userProfile) {
      setUserInfo({
        email: user.email || userProfile.email || 'Not provided',
        phone: company?.contact_phone || 'Not provided',
        address: company?.address || 'Not provided',
        role: userProfile.role || 'user',
        companyName: company?.name || 'No company',
        createdAt: userProfile.created_at 
          ? new Date(userProfile.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })
          : 'Not available',
      })
    }
  }, [user, userProfile, company])

  const handleToggleDropdown = (e) => {
    e.preventDefault()
    setIsDropdownOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div className="card">
      <div className="header">
        <h2>Info</h2>
        <ul className="header-dropdown list-unstyled m-0 p-0" ref={dropdownRef}>
          <li className="dropdown relative">
            <button
              type="button"
              className="dropdown-toggle bg-transparent border-0 cursor-pointer"
              onClick={handleToggleDropdown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <i className="fa-solid fa-ellipsis-v" aria-hidden="true" />
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu dropdown-menu-right absolute right-0 mt-2 min-w-[150px] bg-white shadow-lg rounded-lg z-10 p-0 list-none dark:bg-gray-800">
                <li>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => {
                      setIsDropdownOpen(false)
                      const settingsTab = document.querySelector('[data-tab="settings"]')
                      if (settingsTab) {
                        settingsTab.click()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                  >
                    Edit Profile
                  </button>
                </li>
                <li>
                  <Link 
                    to="/dashboard" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:no-underline" 
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Go to Dashboard
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div className="body">
        <small className="text-muted">Email address: </small>
        <p>{userInfo.email}</p>
        <hr />
        <small className="text-muted">Phone: </small>
        <p>{userInfo.phone}</p>
        <hr />
        <small className="text-muted">Address: </small>
        <p>{userInfo.address}</p>
        <hr />
        <small className="text-muted">Company: </small>
        <p>{userInfo.companyName}</p>
        <hr />
        <small className="text-muted">Role: </small>
        <p className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
            {userInfo.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </p>
        <hr />
        <small className="text-muted">Member since: </small>
        <p className="m-b-0">{userInfo.createdAt}</p>
      </div>
    </div>
  )
}

export default ProfileInfoCard
