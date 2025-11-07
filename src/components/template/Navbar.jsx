import { useState } from 'react'

const notifications = [
  {
    iconClass: 'fa-solid fa-circle-info',
    tone: 'text-warning',
    content: (
      <>
        Campaign <strong>Holiday Sale</strong> is nearly reach budget limit.
      </>
    ),
    timestamp: '10:00 AM Today',
  },
  {
    iconClass: 'fa-solid fa-thumbs-up',
    tone: 'text-success',
    content: (
      <>
        Your New Campaign <strong>Holiday Sale</strong> is approved.
      </>
    ),
    timestamp: '11:30 AM Today',
  },
  {
    iconClass: 'fa-solid fa-chart-pie',
    tone: 'text-info',
    content: 'Website visits from Twitter is 27% higher than last week.',
    timestamp: '04:00 PM Today',
  },
  {
    iconClass: 'fa-solid fa-circle-exclamation',
    tone: 'text-danger',
    content: 'Error on website analytics configurations',
    timestamp: 'Yesterday',
  },
]

const accountMenu = [
  { heading: 'ACCOUNT SETTINGS' },
  { iconClass: 'fa-regular fa-note-sticky', label: 'Basic' },
  { iconClass: 'fa-solid fa-sliders', label: 'Preferences' },
  { iconClass: 'fa-solid fa-lock', label: 'Privacy' },
  { iconClass: 'fa-regular fa-bell', label: 'Notifications' },
  { heading: 'BILLING' },
  { iconClass: 'fa-solid fa-credit-card', label: 'Payments' },
  { iconClass: 'fa-solid fa-file-invoice', label: 'Invoices' },
  { iconClass: 'fa-solid fa-rotate', label: 'Renewals' },
]

const Navbar = ({ onToggleSidebar }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  const handleSidebarToggle = () => {
    if (typeof onToggleSidebar === 'function') {
      onToggleSidebar()
    }
  }

  const closeDropdowns = () => {
    setIsNotificationsOpen(false)
    setIsAccountOpen(false)
  }

  const handleNotificationToggle = (event) => {
    event.preventDefault()
    setIsNotificationsOpen((prev) => !prev)
    setIsAccountOpen(false)
  }

  const handleAccountToggle = (event) => {
    event.preventDefault()
    setIsAccountOpen((prev) => !prev)
    setIsNotificationsOpen(false)
  }

  return (
    <nav className="navbar navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-btn">
          <div className="flex items-center">
            <button 
              type="button" 
              className="btn-toggle-offcanvas"
              onClick={handleSidebarToggle}
              aria-label="Toggle sidebar"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>

        <div className="navbar-brand">
          <div className="flex items-center">
            <a href="dashboard" onClick={closeDropdowns}>
              <img src="/logo.png" alt="Dashco Logo" />
            </a>
          </div>
        </div>

        <div className="navbar-right">
          <div>
            <form 
              id="navbar-search" 
              className="relative float-left mr-3 mt-1 p-0"
              role="search" 
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="relative">
                <input 
                  className="h-10 w-[221px] pl-5 pr-11 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search here..." 
                  type="text" 
                />
                <button 
                  type="button" 
                  className="absolute top-1/2 right-4 -translate-y-1/2 p-0 border-0 bg-transparent text-gray-500 hover:text-gray-700 cursor-pointer"
                  aria-label="Search"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </form>

            <div id="navbar-menu">
              <ul className="nav navbar-nav">
              <li>
                <a href="filedocuments" className="icon-menu hidden sm:block md:hidden lg:block" onClick={closeDropdowns}>
                  <i className="fa-regular fa-folder-open"></i>
                </a>
              </li>
              <li>
                <a href="appcalendar" className="icon-menu hidden sm:block md:hidden lg:block" onClick={closeDropdowns}>
                  <i className="fa-regular fa-calendar"></i>
                </a>
              </li>
              <li>
                <a href="appchat" className="icon-menu hidden sm:block" onClick={closeDropdowns}>
                  <i className="fa-regular fa-comments"></i>
                </a>
              </li>
              <li>
                <a href="appinbox" className="icon-menu hidden sm:block" onClick={closeDropdowns}>
                  <i className="fa-regular fa-envelope"></i>
                  <span className="notification-dot"></span>
                </a>
              </li>

              <li className={`relative ${isNotificationsOpen ? 'show dropdown' : 'dropdown'}`}>
                <a
                  href="#!"
                  className="dropdown-toggle icon-menu"
                  data-toggle="dropdown"
                  onClick={handleNotificationToggle}
                  aria-haspopup="true"
                  aria-expanded={isNotificationsOpen}
                >
                  <i className="fa-regular fa-bell"></i>
                  <span className="notification-dot"></span>
                </a>
                {isNotificationsOpen && (
                  <ul className={`dropdown-menu notifications text-left ${isNotificationsOpen ? 'show' : ''}`}>
                    <li className="header text-left">
                      <strong>You have {notifications.length} new Notifications</strong>
                    </li>
                    {notifications.map((item, index) => (
                      <li key={item.timestamp + index} className="text-left">
                        <a href="dashboard" onClick={closeDropdowns}>
                          <div className="media">
                            <div className="media-left">
                              <i className={`${item.iconClass} ${item.tone}`}></i>
                            </div>
                            <div className="media-body">
                              <p className="text text-sm">{item.content}</p>
                              <span className="timestamp">{item.timestamp}</span>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                    <li className="footer text-left">
                      <a className="more" href="dashboard" onClick={closeDropdowns}>
                        See all notifications
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li className={`relative ${isAccountOpen ? 'show dropdown' : 'dropdown'}`}>
                <a
                  href="#!"
                  className="dropdown-toggle icon-menu"
                  data-toggle="dropdown"
                  onClick={handleAccountToggle}
                  aria-haspopup="true"
                  aria-expanded={isAccountOpen}
                >
                  <i className="fa-solid fa-sliders"></i>
                </a>
                {isAccountOpen && (
                  <ul className={`dropdown-menu user-menu menu-icon text-left navbar-account-menu ${isAccountOpen ? 'show' : ''}`}>
                    {accountMenu.map((item, index) =>
                      item.heading ? (
                        <li key={item.heading} className={`menu-heading ${index === 0 ? '' : 'menu-heading-spacing'}`}>
                          <div className="flex items-center w-full">
                            {item.heading}
                          </div>
                        </li>
                      ) : (
                        <li key={item.label}>
                          <div className="flex items-center w-full">
                            <a href="dashboard" onClick={closeDropdowns}>
                              <div className="flex items-center gap-2.5">
                                <i className={item.iconClass}></i>
                                <span>{item.label}</span>
                              </div>
                            </a>
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </li>

                <li>
                  <a href="login" className="icon-menu" onClick={closeDropdowns}>
                    <i className="fa-solid fa-right-to-bracket"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
