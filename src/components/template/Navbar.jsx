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
    <nav className="fixed top-1.5 left-0 w-full z-[9] px-0 m-0 bg-white border-b border-gray-200 md:top-1.5 md:px-0">
      <div className="w-full px-6 md:px-8 lg:px-6 xl:px-8 flex items-center justify-between flex-wrap">
        <div className="block md:hidden order-1">
          <button type="button" className="border-none bg-transparent text-xl text-gray-700 cursor-pointer" onClick={handleSidebarToggle} aria-label="Toggle sidebar">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        <div className="py-4 order-2 flex-1 text-center md:order-2 md:text-left">
          <a href="dashboard" onClick={closeDropdowns} className="inline-block">
            <img src="/logo.svg" alt="Lucid Logo" className="w-20 md:w-24 lg:w-20 xl:w-24 mx-auto md:mx-0" />
          </a>
        </div>

        <div className="w-full order-3 flex items-center justify-between gap-2 md:order-3 md:w-auto md:gap-6 md:mt-0 mt-2">
          <form id="navbar-search" className="hidden lg:flex items-center gap-3" role="search" onSubmit={(event) => event.preventDefault()}>
            <input className="h-10 border border-gray-200 rounded-full px-4 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search here..." type="text" />
            <button type="button" className="h-9 w-9 rounded-full border border-transparent bg-blue-600 text-white inline-flex items-center justify-center cursor-pointer transition-colors hover:bg-blue-700" aria-label="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          <div id="navbar-menu">
            <ul className="flex items-center list-none m-0 p-0 flex-wrap justify-center md:justify-end">
              <li>
                <a href="filedocuments" className="hidden sm:inline-flex md:hidden lg:inline-flex items-center justify-center px-4 py-3.5 relative text-gray-600 transition-colors hover:text-blue-600" onClick={closeDropdowns}>
                  <i className="fa-regular fa-folder-open text-lg"></i>
                </a>
              </li>
              <li>
                <a href="appcalendar" className="hidden sm:inline-flex md:hidden lg:inline-flex items-center justify-center px-4 py-3.5 relative text-gray-600 transition-colors hover:text-blue-600" onClick={closeDropdowns}>
                  <i className="fa-regular fa-calendar text-lg"></i>
                </a>
              </li>
              <li>
                <a href="appchat" className="hidden sm:inline-flex items-center justify-center px-4 py-3.5 relative text-gray-600 transition-colors hover:text-blue-600" onClick={closeDropdowns}>
                  <i className="fa-solid fa-comments text-lg"></i>
                </a>
              </li>
              <li>
                <a href="appinbox" className="hidden sm:inline-flex items-center justify-center px-4 py-3.5 relative text-gray-600 transition-colors hover:text-blue-600" onClick={closeDropdowns}>
                  <i className="fa-regular fa-envelope text-lg"></i>
                  <span className="absolute top-3 right-2.5 w-2 h-2 rounded-full bg-gray-800"></span>
                </a>
              </li>

              <li className="relative">
                <a
                  href="#!"
                  className="inline-flex items-center justify-center px-4 py-3.5 relative text-gray-600 transition-colors hover:text-blue-600 md:px-3 md:py-2.5"
                  onClick={handleNotificationToggle}
                  aria-haspopup="true"
                  aria-expanded={isNotificationsOpen}
                >
                  <i className="fa-regular fa-bell text-lg md:text-base"></i>
                  <span className="absolute top-3 right-2.5 w-2 h-2 rounded-full bg-gray-800 md:top-2.5 md:right-2"></span>
                </a>
                {isNotificationsOpen && (
                  <ul className="absolute right-0 mt-3 bg-gray-800 text-gray-200 rounded-xl shadow-2xl p-5 w-[420px] max-w-[calc(100vw-2rem)] md:w-[360px] lg:w-[420px] top-full">
                    <li className="text-xs uppercase tracking-wide text-gray-400 mb-3">
                      <strong>You have {notifications.length} new Notifications</strong>
                    </li>
                    {notifications.map((item, index) => (
                      <li key={item.timestamp + index} className="border-b border-gray-700/25 last:border-b-0">
                        <a href="dashboard" onClick={closeDropdowns} className="block py-3 hover:bg-gray-700/30 transition-colors">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <i className={`${item.iconClass} ${item.tone}`}></i>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-200">{item.content}</p>
                              <span className="text-xs text-gray-400 block mt-1">{item.timestamp}</span>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                    <li className="mt-3 pt-3 border-t border-gray-700/25">
                      <a className="text-sm text-blue-400 hover:text-blue-300 transition-colors" href="dashboard" onClick={closeDropdowns}>
                        See all notifications
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li className="relative">
                <a
                  href="#!"
                  className="inline-flex items-center justify-center px-4 py-3.5 relative text-gray-600 transition-colors hover:text-blue-600 md:px-3 md:py-2.5"
                  onClick={handleAccountToggle}
                  aria-haspopup="true"
                  aria-expanded={isAccountOpen}
                >
                  <i className="fa-solid fa-sliders text-lg md:text-base"></i>
                </a>
                {isAccountOpen && (
                  <ul className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-2xl p-5 min-w-[240px] max-w-[calc(100vw-2rem)] top-full">
                    {accountMenu.map((item) =>
                      item.heading ? (
                        <li key={item.heading} className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2 mt-4 first:mt-0">
                          {item.heading}
                        </li>
                      ) : (
                        <li key={item.label}>
                          <a href="dashboard" onClick={closeDropdowns} className="flex items-center gap-3 py-2 px-2 text-gray-700 hover:bg-gray-50 rounded transition-colors">
                            <i className={`${item.iconClass} w-5 text-center`}></i>
                            <span>{item.label}</span>
                          </a>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </li>

              <li>
                <a href="login" className="inline-flex items-center justify-center px-4 py-3.5 relative text-gray-600 transition-colors hover:text-blue-600 md:px-3 md:py-2.5" onClick={closeDropdowns}>
                  <i className="fa-solid fa-right-to-bracket text-lg md:text-base"></i>
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
