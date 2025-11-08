/**
 * Navbar Component - Tailadmin Style
 * Updated to match Tailadmin demo structure with FontAwesome icons
 * Modified to sync main content shift with sidebar collapse — 2024
 */
import { useState, useEffect, useRef } from "react";

const notifications = [
  {
    icon: "fa-solid fa-info-circle",
    iconColor: "text-warning",
    text: "Campaign <strong>Holiday Sale</strong> is nearly reach budget limit.",
    timestamp: "10:00 AM Today",
  },
  {
    icon: "fa-solid fa-heart",
    iconColor: "text-success",
    text: "Your New Campaign <strong>Holiday Sale</strong> is approved.",
    timestamp: "11:30 AM Today",
  },
  {
    icon: "fa-solid fa-chart-pie",
    iconColor: "text-info",
    text: "Website visits from Twitter is 27% higher than last week.",
    timestamp: "04:00 PM Today",
  },
  {
    icon: "fa-solid fa-info-circle",
    iconColor: "text-danger",
    text: "Error on website analytics configurations",
    timestamp: "Yesterday",
  },
];

const accountMenu = [
  {
    iconClass: "fa-solid fa-user-pen",
    label: "Edit profile",
    href: "profilev2page",
  },
  {
    iconClass: "fa-solid fa-gear",
    label: "Account settings",
    href: "dashboard",
  },
  { iconClass: "fa-solid fa-headset", label: "Support", href: "dashboard" },
];

const Navbar = ({
  onToggleSidebar,
  onToggleSidebarCollapse,
  sidebarToggle = false,
  isSidebarOpen = false,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const notificationRef = useRef(null);
  const accountRef = useRef(null);
  const mobileNotificationRef = useRef(null);
  const mobileAccountRef = useRef(null);

  // Track screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside notification dropdowns
      if (isNotificationsOpen) {
        const isOutsideDesktop =
          !notificationRef.current ||
          !notificationRef.current.contains(event.target);
        const isOutsideMobile =
          !mobileNotificationRef.current ||
          !mobileNotificationRef.current.contains(event.target);

        if (isOutsideDesktop && isOutsideMobile) {
          setIsNotificationsOpen(false);
        }
      }

      // Check if click is outside account dropdowns
      if (isAccountOpen) {
        const isOutsideDesktop =
          !accountRef.current || !accountRef.current.contains(event.target);
        const isOutsideMobile =
          !mobileAccountRef.current ||
          !mobileAccountRef.current.contains(event.target);

        if (isOutsideDesktop && isOutsideMobile) {
          setIsAccountOpen(false);
        }
      }
    };

    if (isNotificationsOpen || isAccountOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isNotificationsOpen, isAccountOpen]);

  const handleSidebarToggle = () => {
    if (typeof onToggleSidebar === "function") {
      onToggleSidebar();
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeDropdowns = () => {
    setIsNotificationsOpen(false);
    setIsAccountOpen(false);
  };

  const handleNotificationToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsNotificationsOpen((prev) => !prev);
    setIsAccountOpen(false);
    if (!isNotificationsOpen) {
      setHasNotifications(false);
    }
  };

  const handleAccountToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsAccountOpen((prev) => !prev);
    setIsNotificationsOpen(false);
  };

  return (
    <header className="sticky top-0 z-99999 flex w-full border-gray-200 bg-white xl:border-b dark:border-gray-800 dark:bg-gray-900">
      <div className="flex grow flex-col items-center justify-between xl:flex-row xl:items-center xl:px-6">
        {/* Mobile: First row with hamburger, logo, menu button */}
        {/* Desktop: Single row with hamburger, search, and menu items */}
        <div className="flex w-full items-center justify-between gap-4 border-b border-gray-200 px-3 py-4 xl:justify-normal xl:border-b-0 xl:gap-4 xl:px-0 xl:py-4 dark:border-gray-800">
          {/* Hamburger Toggle BTN */}
          <button
            type="button"
            className={`z-[99999] flex h-10 w-10 items-center justify-center rounded-lg border-gray-200 text-gray-500 xl:h-11 xl:w-11 xl:border dark:border-gray-800 dark:text-gray-400 transition-colors duration-200 ${
              sidebarToggle
                ? "xl:bg-transparent dark:xl:bg-transparent bg-gray-100 dark:bg-gray-800"
                : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // On desktop (xl screens), toggle sidebar collapse
              if (isDesktop) {
                if (typeof onToggleSidebarCollapse === "function") {
                  onToggleSidebarCollapse();
                }
              } else {
                // On mobile, toggle sidebar open/close
                handleSidebarToggle();
              }
            }}
            aria-label={
              isDesktop
                ? sidebarToggle
                  ? "Expand sidebar"
                  : "Collapse sidebar"
                : isSidebarOpen
                ? "Close sidebar"
                : "Open sidebar"
            }
            aria-expanded={
              isDesktop
                ? sidebarToggle
                  ? "false"
                  : "true"
                : isSidebarOpen
                ? "true"
                : "false"
            }
          >
            {/* Desktop hamburger icon */}
            <svg
              className="hidden fill-current xl:block"
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                fill=""
              ></path>
            </svg>

            {/* Mobile hamburger icon */}
            <svg
              className={`fill-current ${
                isSidebarOpen ? "hidden" : "block xl:hidden"
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.25 6C3.25 5.58579 3.58579 5.25 4 5.25L20 5.25C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75L4 6.75C3.58579 6.75 3.25 6.41422 3.25 6ZM3.25 18C3.25 17.5858 3.58579 17.25 4 17.25L20 17.25C20.4142 17.25 20.75 17.5858 20.75 18C20.75 18.4142 20.4142 18.75 20 18.75L4 18.75C3.58579 18.75 3.25 18.4142 3.25 18ZM4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75L12 12.75C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25L4 11.25Z"
                fill=""
              ></path>
            </svg>

            {/* Mobile close icon */}
            <svg
              className={`fill-current ${
                isSidebarOpen ? "block xl:hidden" : "hidden"
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill=""
              ></path>
            </svg>
          </button>

          {/* Logo for mobile */}
          <a href="dashboard" className="xl:hidden" onClick={closeDropdowns}>
            <img
              className="dark:hidden"
              src="https://demo.tailadmin.com/src/images/logo/logo.svg"
              alt="Logo"
            />
            <img
              className="hidden dark:block"
              src="https://demo.tailadmin.com/src/images/logo/logo-dark.svg"
              alt="Logo"
            />
          </a>

          {/* Application nav menu button */}
          <button
            type="button"
            className={`z-[99999] flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 xl:hidden dark:text-gray-400 dark:hover:bg-gray-800 transition-colors duration-200 ${
              isMobileMenuOpen ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleMobileMenuToggle();
            }}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                fill=""
              ></path>
            </svg>
          </button>

          {/* Search bar - hidden on mobile, visible on desktop */}
          <div className="hidden xl:block">
            <form
              id="navbar-search"
              className="navbar-form search-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                className="form-control"
                placeholder="Search here..."
                type="text"
              />
              <button type="button" className="btn btn-default">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>

          {/* Desktop Menu Items - Same row as search on desktop */}
          <div
            id="navbar-menu"
            className="hidden xl:flex items-center gap-2 flex-shrink-0 ml-auto"
          >
            <ul className="nav navbar-nav flex items-center gap-2">
              <li>
                <a
                  href="filedocuments"
                  className="icon-menu hidden sm:block md:hidden lg:block dark:text-white/90 dark:hover:text-white transition-colors duration-200"
                  onClick={closeDropdowns}
                >
                  <i className="fa-regular fa-folder-open"></i>
                </a>
              </li>
              <li>
                <a
                  href="appcalendar"
                  className="icon-menu hidden sm:block md:hidden lg:block dark:text-white/90 dark:hover:text-white transition-colors duration-200"
                  onClick={closeDropdowns}
                >
                  <i className="fa-regular fa-calendar"></i>
                </a>
              </li>
              <li>
                <a
                  href="appchat"
                  className="icon-menu hidden sm:block dark:text-white/90 dark:hover:text-white transition-colors duration-200"
                  onClick={closeDropdowns}
                >
                  <i className="fa-regular fa-comments"></i>
                </a>
              </li>
              <li>
                <a
                  href="appinbox"
                  className="icon-menu hidden sm:block dark:text-white/90 dark:hover:text-white transition-colors duration-200"
                  onClick={closeDropdowns}
                >
                  <i className="fa-regular fa-envelope"></i>
                  <span className="notification-dot"></span>
                </a>
              </li>

              <li
                ref={notificationRef}
                className={`relative ${
                  isNotificationsOpen ? "show dropdown" : "dropdown"
                }`}
              >
                <a
                  href="#!"
                  className="dropdown-toggle icon-menu dark:text-white/90 dark:hover:text-white transition-colors duration-200"
                  data-toggle="dropdown"
                  onClick={handleNotificationToggle}
                  aria-haspopup="true"
                  aria-expanded={isNotificationsOpen}
                >
                  <i className="fa-regular fa-bell"></i>
                  {hasNotifications && (
                    <span className="notification-dot"></span>
                  )}
                </a>
                {isNotificationsOpen && (
                  <ul className="dropdown-menu notifications show !pr-2">
                    {/* Header - Fixed */}
                    <li className="header">
                      <strong>
                        You have {notifications.length} new Notifications
                      </strong>
                    </li>

                    {/* Scrollable notification items container */}
                    <div className="notifications-scroll-container">
                      {notifications.map((item, index) => (
                        <li key={`notification-${index}`}>
                          <a href="/dashboard" onClick={closeDropdowns}>
                            <div className="media">
                              <div className="media-left">
                                <i
                                  className={`${item.icon} ${item.iconColor}`}
                                ></i>
                              </div>
                              <div className="media-body">
                                <p
                                  className="text"
                                  dangerouslySetInnerHTML={{
                                    __html: item.text,
                                  }}
                                ></p>
                                <span className="timestamp">
                                  {item.timestamp}
                                </span>
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}
                    </div>

                    {/* Footer - Fixed */}
                    <li className="footer">
                      <a
                        className="more"
                        href="/dashboard"
                        onClick={closeDropdowns}
                      >
                        See all notifications
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li
                ref={accountRef}
                className={`relative ${
                  isAccountOpen ? "show dropdown" : "dropdown"
                }`}
              >
                <a
                  href="#!"
                  className="dropdown-toggle dark:text-white/90 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 h-11"
                  data-toggle="dropdown"
                  onClick={handleAccountToggle}
                  aria-haspopup="true"
                  aria-expanded={isAccountOpen}
                >
                  <div className="flex items-center gap-2">
                    <div className="hidden xl:flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-700 dark:text-white/90">
                        Super Admin
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        superadmin@gmail.com
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold border-2 border-white dark:border-gray-800 flex-shrink-0">
                      M
                    </div>
                  </div>
                </a>
                {isAccountOpen && (
                  <div className="navbar-account-menu">
                    {/* Header - User info without avatar */}
                    <div className="navbar-account-header">
                      <p className="navbar-account-name">Super Admin</p>
                      <p className="navbar-account-email">
                        superadmin@gmail.com
                      </p>
                    </div>
                    {/* Menu items list */}
                    <ul className="navbar-account-list">
                      {accountMenu.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href || "dashboard"}
                            onClick={closeDropdowns}
                            className="navbar-account-item"
                          >
                            <i className={item.iconClass}></i>
                            <span>{item.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                    {/* Sign out button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        closeDropdowns();
                        // Handle sign out
                      }}
                      className="navbar-account-signout"
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile menu - collapsible, positioned absolutely below navbar */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } xl:hidden absolute left-0 right-0 top-full w-full flex-col items-center justify-between gap-4 bg-white px-5 py-4 shadow-md dark:bg-gray-800 dark:shadow-lg border-t border-gray-200 dark:border-gray-700 z-50`}
        >
          <div className="flex items-center gap-2 w-full justify-between">
            {/* Notification Menu for Mobile */}
            <div ref={mobileNotificationRef} className="relative">
              <button
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={handleNotificationToggle}
                aria-label="Notifications"
              >
                <i className="fa-regular fa-bell"></i>
                {hasNotifications && <span className="notification-dot"></span>}
              </button>
              {/* Notification dropdown for mobile */}
              {isNotificationsOpen && (
                <ul className="dropdown-menu notifications show">
                  {/* Header */}
                  <li className="header">
                    <strong>
                      You have {notifications.length} new Notifications
                    </strong>
                  </li>

                  {/* Notification items */}
                  {notifications.map((item, index) => (
                    <li key={`notification-mobile-${index}`}>
                      <a href="/dashboard" onClick={closeDropdowns}>
                        <div className="media">
                          <div className="media-left">
                            <i className={`${item.icon} ${item.iconColor}`}></i>
                          </div>
                          <div className="media-body">
                            <p
                              className="text"
                              dangerouslySetInnerHTML={{ __html: item.text }}
                            ></p>
                            <span className="timestamp">{item.timestamp}</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}

                  {/* Footer */}
                  <li className="footer">
                    <a
                      className="more"
                      href="/dashboard"
                      onClick={closeDropdowns}
                    >
                      See all notifications
                    </a>
                  </li>
                </ul>
              )}
            </div>

            {/* Account Menu for Mobile */}
            <div ref={mobileAccountRef} className="relative">
              <button
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={handleAccountToggle}
                aria-label="Account menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                  S
                </div>
              </button>
              {/* Account dropdown for mobile */}
              {isAccountOpen && (
                <div className="navbar-account-menu">
                  {/* Header - User info without avatar */}
                  <div className="navbar-account-header">
                    <p className="navbar-account-name">Super Admin</p>
                    <p className="navbar-account-email">superadmin@gmail.com</p>
                  </div>
                  {/* Menu items list */}
                  <ul className="navbar-account-list">
                    {accountMenu.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href || "dashboard"}
                          onClick={closeDropdowns}
                          className="navbar-account-item"
                        >
                          <i className={item.iconClass}></i>
                          <span>{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  {/* Sign out button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      closeDropdowns();
                      // Handle sign out
                    }}
                    className="navbar-account-signout"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Logout for Mobile */}
            <a
              href="login"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={closeDropdowns}
              aria-label="Logout"
            >
              <i className="fa-solid fa-right-to-bracket"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
