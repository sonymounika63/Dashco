import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const ProfileTabs = ({ user, userProfile, company, onProfileUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
  })

  // Initialize form data from user profile
  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || '',
        email: userProfile.email || user?.email || '',
      })
    }
  }, [userProfile, user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear message when user types
    if (message.text) {
      setMessage({ type: '', text: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      // Update user profile in public.users table
      const { error: userError } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (userError) {
        throw userError
      }

      // Update email in auth.users (if changed)
      if (formData.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: formData.email,
        })

        if (emailError) {
          console.error('Email update error:', emailError)
          setMessage({
            type: 'warning',
            text: 'Profile updated, but email update failed. Please check your email.',
          })
        }
      }

      // Note: Phone and address are stored at company level, not user level
      // Users can view company info but cannot update it directly (admin only)

      setMessage({
        type: 'success',
        text: 'Profile updated successfully!',
      })

      // Refresh profile data
      if (onProfileUpdate) {
        await onProfileUpdate()
      }

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({
        type: 'error',
        text: error.message || 'Failed to update profile. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  // Fetch user projects for overview tab
  const [projects, setProjects] = useState([])
  const [projectsLoading, setProjectsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      if (!userProfile?.company_id) {
        setProjectsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('company_id', userProfile.company_id)
          .order('created_at', { ascending: false })
          .limit(5)

        if (error) {
          console.error('Error fetching projects:', error)
        } else {
          setProjects(data || [])
        }
      } catch (err) {
        console.error('Error in fetchProjects:', err)
      } finally {
        setProjectsLoading(false)
      }
    }

    if (activeTab === 'overview') {
      fetchProjects()
    }
  }, [activeTab, userProfile])

  return (
    <div>
      <div className="card">
        <div className="body">
          <ul className="nav nav-tabs-new list-none p-0 m-0 flex border-b border-[#e4e7eb] dark:border-gray-700">
            <li className="nav-item mr-1">
              <a
                href="#!"
                data-tab="overview"
                className={`nav-link inline-block px-5 py-3 cursor-pointer no-underline ${
                  activeTab === 'overview'
                    ? 'text-[#5b7dfa] border-b-2 border-[#5b7dfa] dark:text-blue-400 dark:border-blue-400'
                    : 'text-[#8892a0] border-b-2 border-transparent dark:text-gray-400'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab('overview')
                }}
              >
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#!"
                data-tab="settings"
                className={`nav-link inline-block px-5 py-3 cursor-pointer no-underline ${
                  activeTab === 'settings'
                    ? 'text-[#5b7dfa] border-b-2 border-[#5b7dfa] dark:text-blue-400 dark:border-blue-400'
                    : 'text-[#8892a0] border-b-2 border-transparent dark:text-gray-400'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab('settings')
                }}
              >
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="tab-content p-0">
        {/* Overview Tab */}
        <div className={`tab-pane ${activeTab === 'overview' ? 'active show' : ''}`} id="Overview">
          {/* User Activity Card */}
          <div className="card mt-4">
            <div className="header">
              <h2>Activity Overview</h2>
            </div>
            <div className="body">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {projects.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Active Projects
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {userProfile?.role ? userProfile.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'User'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Role
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {company ? 'Yes' : 'No'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Company
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects List */}
          {projectsLoading ? (
            <div className="card mt-4">
              <div className="body text-center py-8">
                <i className="fa-solid fa-spinner fa-spin text-2xl text-gray-400"></i>
                <p className="text-gray-500 mt-2">Loading projects...</p>
              </div>
            </div>
          ) : projects.length > 0 ? (
            <div className="card mt-4">
              <div className="header">
                <h2>Recent Projects</h2>
              </div>
              <div className="body">
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {project.name}
                      </h4>
                      {project.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {project.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        {project.industry && (
                          <span>
                            <i className="fa-solid fa-industry mr-1"></i>
                            {project.industry}
                          </span>
                        )}
                        {project.status && (
                          <span className={`px-2 py-1 rounded-full ${
                            project.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          }`}>
                            {project.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card mt-4">
              <div className="body text-center py-8">
                <i className="fa-solid fa-folder-open text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <p className="text-gray-500 dark:text-gray-400">No projects found</p>
                {!company && (
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    Join a company to see projects
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Settings Tab */}
        <div className={`tab-pane ${activeTab === 'settings' ? 'active show' : ''}`} id="Settings">
          <div className="card mt-4">
            <div className="body">
              <h6 className="mb-5 text-base font-semibold dark:text-white">Basic Information</h6>
              
              {/* Message Display */}
              {message.text && (
                <div
                  className={`mb-4 p-3 rounded-lg ${
                    message.type === 'success'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : message.type === 'error'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="form-control w-full px-3 py-2.5 border border-[#e4e7eb] rounded-md text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="form-group mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control w-full px-3 py-2.5 border border-[#e4e7eb] rounded-md text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        placeholder="Enter your email"
                        required
                      />
                      <small className="text-gray-500 dark:text-gray-400">
                        Changing your email will require verification
                      </small>
                    </div>

                    <div className="form-group mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        value={userProfile?.role ? userProfile.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'User'}
                        className="form-control w-full px-3 py-2.5 border border-[#e4e7eb] rounded-md text-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        disabled
                      />
                      <small className="text-gray-500 dark:text-gray-400">
                        Role is managed by your administrator
                      </small>
                    </div>

                    {company && (
                      <div className="form-group mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={company.name}
                          className="form-control w-full px-3 py-2.5 border border-[#e4e7eb] rounded-md text-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                          disabled
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                            Updating...
                          </>
                        ) : (
                          'Update Profile'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileTabs

