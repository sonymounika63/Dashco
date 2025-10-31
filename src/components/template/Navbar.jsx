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
          <button type="button" className="btn-toggle-offcanvas" onClick={handleSidebarToggle} aria-label="Toggle sidebar">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        <div className="navbar-brand">
          <a href="dashboard" onClick={closeDropdowns}>
            <img src="/logo.svg" alt="Lucid Logo" className="img-responsive logo" />
          </a>
        </div>

        <div className="navbar-right">
          <form id="navbar-search" className="navbar-form search-form" role="search" onSubmit={(event) => event.preventDefault()}>
            <input className="form-control" placeholder="Search here..." type="text" />
            <button type="button" className="btn btn-default" aria-label="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          <div id="navbar-menu">
            <ul className="nav navbar-nav">
              <li>
                <a href="filedocuments" className="icon-menu d-none d-sm-block d-md-none d-lg-block" onClick={closeDropdowns}>
                  <i className="fa-regular fa-folder-open"></i>
                </a>
              </li>
              <li>
                <a href="appcalendar" className="icon-menu d-none d-sm-block d-md-none d-lg-block" onClick={closeDropdowns}>
                  <i className="fa-regular fa-calendar"></i>
                </a>
              </li>
              <li>
                <a href="appchat" className="icon-menu d-none d-sm-block" onClick={closeDropdowns}>
                  <i className="fa-solid fa-comments"></i>
                </a>
              </li>
              <li>
                <a href="appinbox" className="icon-menu d-none d-sm-block" onClick={closeDropdowns}>
                  <i className="fa-regular fa-envelope"></i>
                  <span className="notification-dot"></span>
                </a>
              </li>

              <li className={isNotificationsOpen ? 'show dropdown' : 'dropdown'}>
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
                <ul className={isNotificationsOpen ? 'dropdown-menu notifications show' : 'dropdown-menu notifications'}>
                  <li className="header">
                    <strong>You have {notifications.length} new Notifications</strong>
                  </li>
                  {notifications.map((item, index) => (
                    <li key={item.timestamp + index}>
                      <a href="dashboard" onClick={closeDropdowns}>
                        <div className="media">
                          <div className="media-left">
                            <i className={`${item.iconClass} ${item.tone}`}></i>
                          </div>
                          <div className="media-body">
                            <p className="text">{item.content}</p>
                            <span className="timestamp">{item.timestamp}</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                  <li className="footer">
                    <a className="more" href="dashboard" onClick={closeDropdowns}>
                      See all notifications
                    </a>
                  </li>
                </ul>
              </li>

              <li className={isAccountOpen ? 'show dropdown' : 'dropdown'}>
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
                <ul className={isAccountOpen ? 'dropdown-menu user-menu menu-icon show' : 'dropdown-menu user-menu menu-icon'}>
                  {accountMenu.map((item) =>
                    item.heading ? (
                      <li key={item.heading} className="menu-heading">
                        {item.heading}
                      </li>
                    ) : (
                      <li key={item.label}>
                        <a href="dashboard" onClick={closeDropdowns}>
                          <i className={item.iconClass}></i> <span>{item.label}</span>
                        </a>
                      </li>
                    ),
                  )}
                </ul>
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
    </nav>
  )
}

export default Navbar
