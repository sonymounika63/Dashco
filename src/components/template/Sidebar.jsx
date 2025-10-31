import { useState } from 'react'

const Sidebar = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('menu')
  const [expandedMenus, setExpandedMenus] = useState({
    dashboard: true,
    app: false,
    fileManager: false,
    blog: false,
    uiElements: false,
    widgets: false,
    authentication: false,
    pages: false,
    forms: false,
    tables: false,
    charts: false,
    maps: false,
  })

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  const userStats = [
    { label: 'Sales', value: '456' },
    { label: 'Order', value: '1350' },
    { label: 'Revenue', value: '$2.13B' },
  ]

  const menuItems = [
    {
      id: 'dashboard',
      icon: 'icon-home',
      label: 'Dashboard',
      children: [
        { href: '/dashboard', label: 'Analytical', active: true },
        { href: '/demographic', label: 'Demographic', active: false },
        { href: '/ioT', label: 'IoT', active: false },
      ],
    },
    {
      id: 'app',
      icon: 'icon-grid',
      label: 'App',
      children: [
        { href: '/appinbox', label: 'Inbox' },
        { href: '/appchat', label: 'Chat' },
        { href: '/appcalendar', label: 'Calendar' },
        { href: '/appcontact', label: 'Contact Card' },
        { href: '/apptaskbar', label: 'Taskboard' },
      ],
    },
    {
      id: 'fileManager',
      icon: 'icon-folder',
      label: 'File Manager',
      children: [
        { href: '/filemanagerdashboard', label: 'Dashboard' },
        { href: '/filedocuments', label: 'Documents' },
        { href: '/filemedia', label: 'Media' },
        { href: '/fileimages', label: 'Images' },
      ],
    },
    {
      id: 'blog',
      icon: 'icon-globe',
      label: 'Blog',
      children: [
        { href: '/blognewpost', label: 'New Post' },
        { href: '/bloglist', label: 'Blog List' },
        { href: '/blogdetails', label: 'Blog Detail' },
      ],
    },
    {
      id: 'uiElements',
      icon: 'icon-diamond',
      label: 'UI Elements',
      children: [
        { href: '/uitypography', label: 'Typography' },
        { href: '/uitabs', label: 'Tabs' },
        { href: '/uibuttons', label: 'Buttons' },
        { href: '/bootstrapui', label: 'Bootstrap UI' },
        { href: '/uiicons', label: 'Icons' },
        { href: '/uinotifications', label: 'Notifications' },
        { href: '/uicolors', label: 'Colors' },
        { href: '/uilistgroup', label: 'List Group' },
        { href: '/uimediaobject', label: 'Media Object' },
        { href: '/uimodal', label: 'Modals' },
        { href: '/uiprogressbar', label: 'Progress Bars' },
      ],
    },
    {
      id: 'widgets',
      icon: 'icon-puzzle',
      label: 'Widgets',
      children: [
        { href: '/widgetsdata', label: 'Data' },
        { href: '/widgetsweather', label: 'Weather' },
        { href: '/widgetsblog', label: 'Blog' },
        { href: '/widgetsecommers', label: 'eCommerce' },
      ],
    },
    {
      id: 'authentication',
      icon: 'icon-lock',
      label: 'Authentication',
      children: [
        { href: '/login', label: 'Login' },
        { href: '/registration', label: 'Register' },
        { href: '/lockscreen', label: 'Lockscreen' },
        { href: '/forgotpassword', label: 'Forgot Password' },
        { href: '/page404', label: 'Page 404' },
        { href: '/page403', label: 'Page 403' },
        { href: '/page500', label: 'Page 500' },
        { href: '/page503', label: 'Page 503' },
      ],
    },
    {
      id: 'pages',
      icon: 'icon-docs',
      label: 'Pages',
      children: [
        { href: '/blankpage', label: 'Blank Page' },
        { href: '/profilev1page', label: 'Profile', badge: 'v1' },
        { href: '/profilev2page', label: 'Profile', badge: 'v2', badgeType: 'warning' },
        { href: '/imagegalleryprofile', label: 'Image Gallery' },
        { href: '/timeline', label: 'Timeline' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/invoices', label: 'Invoices', badge: 'v1' },
        { href: '/invoicesv2', label: 'Invoices', badge: 'v2', badgeType: 'warning' },
        { href: '/searchresult', label: 'Search Results' },
        { href: '/helperclass', label: 'Helper Classes' },
        { href: '/teamsboard', label: 'Teams Board' },
        { href: '/projectslist', label: 'Projects List' },
        { href: '/maintanance', label: 'Maintenance' },
        { href: '/testimonials', label: 'Testimonials' },
        { href: '/faqs', label: 'FAQ' },
      ],
    },
    {
      id: 'forms',
      icon: 'icon-pencil',
      label: 'Forms',
      children: [
        { href: '/formvalidation', label: 'Form Validation' },
        { href: '/basicelements', label: 'Basic Elements' },
      ],
    },
    {
      id: 'tables',
      icon: 'icon-tag',
      label: 'Tables',
      children: [
        { href: '/tablenormal', label: 'Normal Tables' },
      ],
    },
    {
      id: 'charts',
      icon: 'icon-bar-chart',
      label: 'Charts',
      children: [
        { href: '/echart', label: 'E-chart' },
      ],
    },
    {
      id: 'maps',
      icon: 'icon-map',
      label: 'Maps',
      children: [
        { href: '/leafletmap', label: 'Leaflet Map' },
      ],
    },
  ]

  const chatContacts = [
    { name: 'Chris Fox', role: 'Designer, Blogger', status: 'online' },
    { name: 'Joge Lucky', role: 'Java Developer', status: 'online' },
    { name: 'Isabella', role: 'CEO, Thememakker', status: 'offline' },
    { name: 'Folisise Chosielie', role: 'Art director, Movie Cut', status: 'offline' },
    { name: 'Alexander', role: 'Writter, Mag Editor', status: 'online' },
  ]

  const sidebarContent = (
    <div id="left-sidebar" className="sidebar" style={{ zIndex: 9 }}>
      <div className="sidebar-scroll">
        {/* User Account Section */}
        <div className="user-account">
          <img
            src="/static/media/user.ce8ac6aa15a5c0276fee.png"
            className="rounded-circle user-photo"
            alt="User Profile"
            onError={(e) => {
              e.target.style.display = 'none'
              if (!e.target.nextSibling) {
                const fallback = document.createElement('div')
                fallback.style.cssText = 'width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:inline-flex;align-items:center;justify-content:center;color:white;font-size:20px;font-weight:bold;vertical-align:top;margin-right:10px;border:2px solid #dee2e6'
                fallback.textContent = 'AT'
                e.target.parentNode.insertBefore(fallback, e.target)
              }
            }}
          />
          <div className="dropdown">
            <span>Welcome,</span>
            <a className="user-name dropdown-toggle" aria-haspopup="true" aria-expanded="false" id="dropdown-basic">
              <strong>Alizee Thomas</strong>
            </a>
          </div>
          <hr />
          <ul className="row list-unstyled">
            {userStats.map((stat, idx) => (
              <li key={idx} className="col-4">
                <small>{stat.label}</small>
                <h6>{stat.value}</h6>
              </li>
            ))}
          </ul>
        </div>

        {/* Nav Tabs */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveTab('menu')}
              data-toggle="tab"
              href="#menu"
            >
              Menu
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
              data-toggle="tab"
              href="#Chat"
            >
              <i className="icon-book-open"></i>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'setting' ? 'active' : ''}`}
              onClick={() => setActiveTab('setting')}
              data-toggle="tab"
              href="#setting"
            >
              <i className="icon-settings"></i>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'question' ? 'active' : ''}`}
              onClick={() => setActiveTab('question')}
              data-toggle="tab"
              href="#question"
            >
              <i className="icon-question"></i>
            </a>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Menu Tab */}
          <div className={`tab-pane ${activeTab === 'menu' ? 'active show' : ''}`} id="menu">
            <div className="sidebar-nav nav" id="left-sidebar-nav">
              <ul id="main-menu" className="metismenu">
                {menuItems.map((item) => (
                  <li key={item.id} className={expandedMenus[item.id] ? 'active' : ''} id={`${item.id.charAt(0).toUpperCase() + item.id.slice(1)}Container`}>
                    <a
                      href="#!"
                      className="has-arrow"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleMenu(item.id)
                      }}
                    >
                      <i className={item.icon}></i>
                      <span>{item.label}</span>
                    </a>
                    <ul className={`collapse ${expandedMenus[item.id] ? 'in' : ''}`}>
                      {item.children.map((child, idx) => (
                        <li key={idx} className={child.active ? 'active' : ''}>
                          <a href={child.href}>
                            {child.label}
                            {child.badge && (
                              <span className={`badge badge-${child.badgeType || 'default'} float-right`}>
                                {child.badge}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chat Tab */}
          <div className={`tab-pane ${activeTab === 'chat' ? 'active show' : ''}`} id="Chat" style={{ padding: '0 15px' }}>
            <form>
              <div className="input-group m-b-20">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="icon-magnifier"></i>
                  </span>
                </div>
                <input type="text" className="form-control" placeholder="Search..." />
              </div>
            </form>
            <ul className="right_chat list-unstyled">
              {chatContacts.map((contact, idx) => (
                <li key={idx} className={contact.status}>
                  <a href="/dashboard">
                    <div className="media">
                      <img
                        className="media-object"
                        src={`/api/placeholder/40/40?text=${contact.name.charAt(0)}`}
                        alt={contact.name}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          if (!e.target.nextSibling) {
                            const fallback = document.createElement('div')
                            fallback.style.cssText = 'width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:flex;align-items:center;justify-content:center;color:white;font-size:16px;font-weight:bold;margin-right:12px'
                            fallback.textContent = contact.name.charAt(0)
                            e.target.parentNode.insertBefore(fallback, e.target)
                          }
                        }}
                      />
                      <div className="media-body">
                        <span className="name">{contact.name}</span>
                        <span className="message">{contact.role}</span>
                        <span className={`badge badge-outline status ${contact.status}`}></span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Settings Tab */}
          <div className={`tab-pane ${activeTab === 'setting' ? 'active show' : ''}`} id="setting" style={{ padding: '0 15px' }}>
            <h6>Choose Mode</h6>
            <ul className="choose-skin list-unstyled">
              <li data-theme="white" className="active">
                <div className="white"></div>
                <span>Light</span>
              </li>
              <li data-theme="black">
                <div className="black"></div>
                <span>Dark</span>
              </li>
            </ul>
            <hr />
            <h6>Choose Skin</h6>
            <ul className="choose-skin list-unstyled">
              {['purple', 'blue', 'cyan', 'green', 'orange', 'blush'].map((color) => (
                <li key={color} data-theme={color} className={color === 'cyan' ? 'active' : ''}>
                  <div className={color}></div>
                  <span style={{ textTransform: 'capitalize' }}>{color}</span>
                </li>
              ))}
            </ul>
            <hr />
            <h6>General Settings</h6>
            <ul className="setting-list list-unstyled">
              {['Report Panel Usag', 'Email Redirect', 'Notifications', 'Auto Updates', 'Offline', 'Location Permission'].map((setting) => (
                <li key={setting}>
                  <label className="fancy-checkbox">
                    <input type="checkbox" name="checkbox" />
                    <span>{setting}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Question Tab */}
          <div className={`tab-pane ${activeTab === 'question' ? 'active show' : ''}`} id="question" style={{ padding: '0 15px' }}>
            <form>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="icon-magnifier"></i>
                  </span>
                </div>
                <input type="text" className="form-control" placeholder="Search..." />
              </div>
            </form>
            <ul className="list-unstyled question">
              <li className="menu-heading">HOW-TO</li>
              {['How to Create Campaign', 'Boost Your Sales', 'Website Analytics'].map((item) => (
                <li key={item}>
                  <a href="#!">{item}</a>
                </li>
              ))}
              <li className="menu-heading">ACCOUNT</li>
              {[
                { label: 'Cearet New Account', href: '/registration' },
                { label: 'Change Password?', href: '/forgotpassword' },
                { label: 'Privacy & Policy', href: '#!' },
              ].map((item, idx) => (
                <li key={idx}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
              <li className="menu-heading">BILLING</li>
              {['Payment info', 'Auto-Renewal'].map((item) => (
                <li key={item}>
                  <a href="#!">{item}</a>
                </li>
              ))}
              <li className="menu-button m-t-30">
                <a href="#!" className="btn btn-primary">
                  <i className="icon-question"></i>
                  Need Help?
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-[10] transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: '#f4f7f6',
          width: '260px',
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <i className="fa-solid fa-times text-gray-600"></i>
          </button>
        </div>
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar - Always visible */}
      <aside
        className="hidden md:block fixed top-[67px] left-[5px] h-[calc(100vh-67px)] w-[260px] z-[9] overflow-y-auto overflow-x-hidden"
        style={{
          backgroundColor: '#f4f7f6',
        }}
      >
        {sidebarContent}
      </aside>
    </>
  )
}

export default Sidebar
