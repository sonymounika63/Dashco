import { useState } from 'react'
import { Link } from 'react-router-dom'

const ProfileV2Tabs = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const posts = [
    {
      id: 1,
      image: '/api/placeholder/800/400?text=Blog+Post+1',
      title: 'All photographs are accurate',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal',
    },
    {
      id: 2,
      image: '/api/placeholder/800/400?text=Blog+Post+2',
      title: 'All photographs are accurate',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal',
    },
  ]

  return (
    <div>
      <div className="card">
        <div className="body">
          <ul className="nav nav-tabs-new list-none p-0 m-0 flex border-b border-[#e4e7eb]">
            <li className="nav-item mr-1">
              <a
                href="#!"
                className={`nav-link inline-block px-5 py-3 cursor-pointer no-underline ${
                  activeTab === 'overview'
                    ? 'text-[#5b7dfa] border-b-2 border-[#5b7dfa]'
                    : 'text-[#8892a0] border-b-2 border-transparent'
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
                className={`nav-link inline-block px-5 py-3 cursor-pointer no-underline ${
                  activeTab === 'settings'
                    ? 'text-[#5b7dfa] border-b-2 border-[#5b7dfa]'
                    : 'text-[#8892a0] border-b-2 border-transparent'
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
          {/* New Post Card */}
          <div className="card">
            <div className="body">
              <div className="new_post">
                <div className="form-group">
                  <textarea
                    rows="4"
                    className="form-control no-resize w-full p-3 border border-[#e4e7eb] rounded-md resize-none font-inherit text-sm"
                    placeholder="Please type what you want..."
                  ></textarea>
                </div>
                <div className="post-toolbar-b flex gap-2 mt-3">
                  <button className="btn btn-warning px-4 py-2 text-sm">
                    <i className="fa-solid fa-link" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-warning px-4 py-2 text-sm">
                    <i className="fa-solid fa-camera" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-primary px-5 py-2 text-sm">Post</button>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          {posts.map((post) => (
            <div key={post.id} className="card single_post mt-6">
              <div className="body">
                <div className="img-post">
                  <img
                    className="d-block img-fluid w-full h-auto rounded-lg"
                    src={post.image}
                    alt={post.title}
                    onError={(e) => {
                      e.target.classList.add('hidden')
                    }}
                  />
                </div>
                <h3 className="mt-4 mb-3">
                  <Link to="/blogdetails" className="text-[#4f5d75] no-underline text-xl font-semibold">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-[#8892a0] leading-relaxed mb-4">{post.content}</p>
              </div>
              <div className="footer p-4 border-t border-[#e4e7eb] flex justify-between items-center">
                <div className="actions">
                  <Link to="#" className="btn btn-outline-secondary px-4 py-2 text-sm no-underline">
                    Continue Reading
                  </Link>
                </div>
                <ul className="stats list-none p-0 m-0 flex gap-4">
                  <li>
                    <Link to="#" className="text-[#8892a0] no-underline text-sm">
                      General
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-[#8892a0] no-underline text-sm flex items-center gap-1">
                      <i className="fa-regular fa-heart" aria-hidden="true"></i>
                      28
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-[#8892a0] no-underline text-sm flex items-center gap-1">
                      <i className="fa-regular fa-comment" aria-hidden="true"></i>
                      128
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Settings Tab */}
        <div className={`tab-pane ${activeTab === 'settings' ? 'active show' : ''}`} id="Settings">
          <div className="card">
            <div className="body">
              <h6 className="mb-5 text-base font-semibold">Basic Information</h6>
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12">
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      className="form-control w-full px-3 py-2.5 border border-[#e4e7eb] rounded-md text-sm"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      className="form-control w-full px-3 py-2.5 border border-[#e4e7eb] rounded-md text-sm"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <div className="flex gap-4">
                      <label className="fancy-radio flex items-center cursor-pointer">
                        <input name="gender2" value="male" type="radio" className="mr-2" />
                        <span>Male</span>
                      </label>
                      <label className="fancy-radio flex items-center cursor-pointer">
                        <input name="gender2" value="female" type="radio" className="mr-2" />
                        <span>Female</span>
                      </label>
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <div className="input-group flex">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-regular fa-calendar" aria-hidden="true"></i>
                        </span>
                      </div>
                      <input
                        type="date"
                        className="form-control flex-1 px-3 py-2.5 border border-[#e4e7eb] border-l-0 rounded-r-md text-sm"
                        placeholder="Birthdate"
                      />
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      className="form-control w-full px-3 py-2.5 border border-[#e4e7eb] rounded-md text-sm"
                      placeholder="Address Line 1"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      className="form-control w-full px-3 py-2.5 border border-[#e4e7eb] rounded-md text-sm"
                      placeholder="Address Line 2"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      className="form-control w-full px-3 py-2.5 border border-[#e4e7eb] rounded-md text-sm"
                      placeholder="City"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      className="form-control w-full px-3 py-2.5 border border-[#e4e7eb] rounded-md text-sm"
                      placeholder="State/Province"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <select className="form-control w-full px-3 py-2.5 border border-[#e4e7eb] rounded-md text-sm">
                      <option value="">-- Select Country --</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary px-6 py-2.5 text-sm">Update Profile</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileV2Tabs
