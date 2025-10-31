import { useState } from 'react'

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
          <ul className="nav nav-tabs-new" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', borderBottom: '1px solid #e4e7eb' }}>
            <li className="nav-item mr-1">
              <a
                href="#!"
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab('overview')
                }}
                style={{
                  padding: '12px 20px',
                  color: activeTab === 'overview' ? '#5b7dfa' : '#8892a0',
                  textDecoration: 'none',
                  borderBottom: activeTab === 'overview' ? '2px solid #5b7dfa' : '2px solid transparent',
                  display: 'inline-block',
                  cursor: 'pointer',
                }}
              >
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#!"
                className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab('settings')
                }}
                style={{
                  padding: '12px 20px',
                  color: activeTab === 'settings' ? '#5b7dfa' : '#8892a0',
                  textDecoration: 'none',
                  borderBottom: activeTab === 'settings' ? '2px solid #5b7dfa' : '2px solid transparent',
                  display: 'inline-block',
                  cursor: 'pointer',
                }}
              >
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="tab-content" style={{ padding: 0 }}>
        {/* Overview Tab */}
        <div className={`tab-pane ${activeTab === 'overview' ? 'active show' : ''}`} id="Overview">
          {/* New Post Card */}
          <div className="card">
            <div className="body">
              <div className="new_post">
                <div className="form-group">
                  <textarea
                    rows="4"
                    className="form-control no-resize"
                    placeholder="Please type what you want..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e4e7eb',
                      borderRadius: '6px',
                      resize: 'none',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                    }}
                  ></textarea>
                </div>
                <div className="post-toolbar-b" style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button className="btn btn-warning" style={{ padding: '8px 16px', fontSize: '14px' }}>
                    <i className="icon-link"></i>
                  </button>
                  <button className="btn btn-warning" style={{ padding: '8px 16px', fontSize: '14px' }}>
                    <i className="icon-camera"></i>
                  </button>
                  <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          {posts.map((post) => (
            <div key={post.id} className="card single_post" style={{ marginTop: '24px' }}>
              <div className="body">
                <div className="img-post">
                  <img
                    className="d-block img-fluid"
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
                <h3 style={{ marginTop: '16px', marginBottom: '12px' }}>
                  <a href="/blogdetails" style={{ color: '#4f5d75', textDecoration: 'none', fontSize: '20px', fontWeight: 600 }}>
                    {post.title}
                  </a>
                </h3>
                <p style={{ color: '#8892a0', lineHeight: '1.6', marginBottom: '16px' }}>{post.content}</p>
              </div>
              <div className="footer" style={{ padding: '16px 24px', borderTop: '1px solid #e4e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="actions">
                  <a href="#!" className="btn btn-default" style={{ padding: '8px 16px', fontSize: '14px' }}>
                    Continue Reading
                  </a>
                </div>
                <ul className="stats" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '16px' }}>
                  <li>
                    <a href="#!" style={{ color: '#8892a0', textDecoration: 'none', fontSize: '14px' }}>
                      General
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="icon-heart" style={{ color: '#8892a0', textDecoration: 'none', fontSize: '14px' }}>
                      28
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="icon-bubbles" style={{ color: '#8892a0', textDecoration: 'none', fontSize: '14px' }}>
                      128
                    </a>
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
              <h6 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: 600 }}>Basic Information</h6>
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12">
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e4e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e4e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <label className="fancy-radio" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input name="gender2" value="male" type="radio" style={{ marginRight: '8px' }} />
                        <span>Male</span>
                      </label>
                      <label className="fancy-radio" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input name="gender2" value="female" type="radio" style={{ marginRight: '8px' }} />
                        <span>Female</span>
                      </label>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-calendar"></i>
                        </span>
                      </div>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Birthdate"
                        style={{
                          flex: 1,
                          padding: '10px 12px',
                          border: '1px solid #e4e7eb',
                          borderLeft: 'none',
                          borderRadius: '0 6px 6px 0',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address Line 1"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e4e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address Line 2"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e4e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e4e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State/Province"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e4e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <select
                      className="form-control"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e4e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    >
                      <option value="">-- Select Country --</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
                      Update Profile
                    </button>
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

