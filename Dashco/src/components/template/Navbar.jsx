/**
 * Navbar Component - Tailadmin Style
 * Updated to match Tailadmin demo structure with FontAwesome icons
 * Modified to sync main content shift with sidebar collapse — 2024
 */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const notifications = [
  {
    icon: "fa-solid fa-building",
    iconColor: "text-blue-500",
    text: "New company <strong>SecureTech Solutions</strong> has been onboarded with Business package.",
    timestamp: "2 hours ago",
  },
  {
    icon: "fa-solid fa-certificate",
    iconColor: "text-green-500",
    text: "Certificate <strong>ISO 27001:2022</strong> has been assigned to CloudServices Co.",
    timestamp: "5 hours ago",
  },
  {
    icon: "fa-solid fa-clock",
    iconColor: "text-yellow-500",
    text: "Package renewal for <strong>DataSecure Ltd.</strong> is due in 15 days.",
    timestamp: "8 hours ago",
  },
  {
    icon: "fa-solid fa-file-invoice",
    iconColor: "text-cyan-500",
    text: "Invoice #INV-2024-087 has been generated for DataSecure Ltd.",
    timestamp: "1 day ago",
  },
  {
    icon: "fa-solid fa-box",
    iconColor: "text-green-500",
    text: "Company <strong>TechCorp Inc.</strong> upgraded from Lite to Business package.",
    timestamp: "1 day ago",
  },
  {
    icon: "fa-solid fa-user-plus",
    iconColor: "text-blue-500",
    text: "New sub-admin user created with delegated access for Finance module.",
    timestamp: "2 days ago",
  },
];

const accountMenu = [
  {
    iconClass: "fa-solid fa-user-pen",
    label: "Edit profile",
    href: "profile",
  },
  {
    iconClass: "fa-solid fa-gear",
    label: "Settings",
    href: "dashboard",
  },
  { iconClass: "fa-solid fa-headset", label: "Support", href: "dashboard" },
  {
    iconClass: "fa-solid fa-shield-halved",
    label: "Security & Privacy",
    href: "dashboard",
  },
];

const Navbar = ({
  onToggleSidebar,
  onToggleSidebarCollapse,
  sidebarToggle = false,
  isSidebarOpen = false,
}) => {
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const notificationRef = useRef(null);
  const accountRef = useRef(null);
  const mobileNotificationRef = useRef(null);
  const mobileAccountRef = useRef(null);

  // Supabase user state - NO DEFAULT VALUES
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userInitials, setUserInitials] = useState(null);

  // Fetch Supabase session - ONLY show authenticated user data
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setUserEmail(session.user.email);

        const fullName =
          session.user.user_metadata?.full_name ||
          session.user.email?.split("@")[0];
        setUserName(fullName);

        const initials = fullName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
        setUserInitials(initials);
      } else {
        // If no session, redirect to login
        navigate("/login");
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setUserEmail(session.user.email);

        const fullName =
          session.user.user_metadata?.full_name ||
          session.user.email?.split("@")[0];
        setUserName(fullName);

        const initials = fullName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
        setUserInitials(initials);
      } else {
        // Session ended, redirect to login
        setUser(null);
        setUserName(null);
        setUserEmail(null);
        setUserInitials(null);
        navigate("/login");
      }
    });

    return () => subscription?.unsubscribe();
  }, [navigate]);

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

  const handleSignOut = async () => {
    closeDropdowns();
    await supabase.auth.signOut();
    navigate("/login");
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
    <header className="sticky top-0 z-99999 flex w-full border-gray-200 bg-white xl:border-b dark:border-gray-800 dark:bg-dark-bg-primary">
      <div className="flex grow flex-col items-center justify-between xl:flex-row xl:items-center xl:px-6">
        {/* Mobile: First row with hamburger, logo, menu button */}
        {/* Desktop: Single row with hamburger, search, and menu items */}
        <div className="flex w-full items-center justify-between gap-4 border-b border-gray-200 px-3 py-4 xl:justify-normal xl:border-b-0 xl:gap-4 xl:px-0 xl:py-4 dark:border-gray-800">
          {/* Hamburger Toggle BTN */}
          <button
            type="button"
            className={`z-[99999] flex h-10 w-10 items-center justify-center rounded-lg border-gray-200 text-gray-500 xl:h-11 xl:w-11 xl:border dark:border-gray-800 dark:text-gray-400 transition-colors duration-200 ${
              sidebarToggle
                ? "xl:bg-transparent dark:xl:bg-transparent bg-gray-100 dark:bg-gray-800 xl:dark:bg-transparent"
                : "xl:bg-transparent dark:xl:bg-transparent"
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
          <a href="/dashboard" className="xl:hidden" onClick={closeDropdowns}>
            <img src="/logo.png" alt="Dashco Logo" className="h-8 w-auto" />
          </a>

          {/* Application nav menu button */}
          <button
            type="button"
            className="z-[99999] flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 xl:hidden dark:text-gray-400 dark:hover:bg-gray-800 transition-colors duration-200 bg-gray-100 dark:bg-gray-800"
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
              className="navbar-form search-form relative flex items-center"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                id="search-input"
                className="w-[430px] h-11 px-12 pr-14 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-white/5 text-gray-900 dark:text-white/90 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-300 dark:focus:border-blue-800 focus:ring-2 focus:ring-blue-500/10 transition-colors duration-200"
                placeholder="Search companies, certificates, packages..."
                type="text"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/90 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <button
                type="button"
                id="search-button"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-[27px] px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Desktop Menu Items - Original Bootstrap Style */}
        <div
          id="navbar-menu"
          className="hidden xl:flex items-center gap-2 flex-shrink-0 ml-auto"
        >
          <ul className="nav navbar-nav flex items-center gap-2">
            <li
              ref={notificationRef}
              className={`relative ${
                isNotificationsOpen ? "show dropdown" : "dropdown"
              }`}
            >
              <a
                href="#!"
                className="dropdown-toggle icon-menu dark:text-white/90 dark:hover:text-white transition-colors duration-200 relative"
                data-toggle="dropdown"
                onClick={handleNotificationToggle}
                aria-haspopup="true"
                aria-expanded={isNotificationsOpen}
              >
                <i className="fa-regular fa-bell"></i>
                {hasNotifications && (
                  <span className="absolute top-0.5 right-0 z-10 h-1 w-1 rounded-full bg-orange-400 flex">
                    <span className="absolute -z-10 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  </span>
                )}
              </a>
              {isNotificationsOpen && (
                <ul className="dashco-notifications-menu show !pr-2">
                  {/* Header - Fixed */}
                  <li className="header">
                    <div className="flex items-center justify-between w-full">
                      <strong>
                        You have {notifications.length} new Notifications
                      </strong>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsNotificationsOpen(false);
                        }}
                        className="text-gray-500 dark:text-gray-400"
                        aria-label="Close notifications"
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
                            d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                            fill=""
                          ></path>
                        </svg>
                      </button>
                    </div>
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
                className="dropdown-toggle dark:text-white/90 transition-colors duration-200 flex items-center gap-2 px-2 py-1 rounded-lg h-11"
                data-toggle="dropdown"
                onClick={handleAccountToggle}
                aria-haspopup="true"
                aria-expanded={isAccountOpen}
              >
                {user && userName && userEmail && userInitials && (
                  <div className="flex items-center gap-2">
                    <div className="hidden xl:flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-700 dark:text-white/90">
                        {userName}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {userEmail}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold border-2 border-white dark:border-gray-800 flex-shrink-0">
                      {userInitials}
                    </div>
                  </div>
                )}
              </a>
              {isAccountOpen && user && userName && userEmail && (
                <div className="navbar-account-menu">
                  {/* Header - User info without avatar */}
                  <div className="navbar-account-header">
                    <p className="navbar-account-name">{userName}</p>
                    <p className="navbar-account-email">{userEmail}</p>
                  </div>
                  {/* Menu items list */}
                  <ul className="navbar-account-list">
                    {accountMenu.map((item) => (
                      <li key={item.label}>
                        <a
                          href={`/${item.href || "dashboard"}`}
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
                      handleSignOut();
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

        {/* Mobile Menu Items Container - Same Structure as Desktop */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } xl:hidden shadow-theme-md w-full items-center justify-between gap-4 px-5 py-4 absolute left-0 right-0 top-full border-t border-gray-200 dark:border-gray-700 z-50 bg-white dark:bg-dark-bg-primary`}
        >
          <div className="flex items-center gap-2 w-full justify-between">
            {/* Notification Menu Area - Mobile - Same as Desktop */}
            <div ref={mobileNotificationRef} className="relative">
              <a
                href="#!"
                className="dropdown-toggle icon-menu dark:text-white/90 dark:hover:text-white transition-colors duration-200 relative"
                data-toggle="dropdown"
                onClick={(e) => {
                  e.preventDefault();
                  handleNotificationToggle(e);
                  setHasNotifications(false);
                }}
                aria-haspopup="true"
                aria-expanded={isNotificationsOpen}
              >
                <i className="fa-regular fa-bell"></i>
                {hasNotifications && (
                  <span className="absolute top-0.5 right-0 z-10 h-1 w-1 rounded-full bg-orange-400 flex">
                    <span className="absolute -z-10 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  </span>
                )}
              </a>
              {/* Notification Dropdown - Mobile - Same Structure as Desktop */}
              {isNotificationsOpen && (
                <ul className="dashco-notifications-menu show !pr-2">
                  {/* Header - Fixed */}
                  <li className="header">
                    <div className="flex items-center justify-between w-full">
                      <strong>
                        You have {notifications.length} new Notifications
                      </strong>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsNotificationsOpen(false);
                        }}
                        className="text-gray-500 dark:text-gray-400"
                        aria-label="Close notifications"
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
                            d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                            fill=""
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </li>

                  {/* Scrollable notification items container */}
                  <div className="notifications-scroll-container">
                    {notifications.map((item, index) => (
                      <li key={`notification-mobile-${index}`}>
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
            </div>

            {/* Account Menu - Mobile - Same Structure as Desktop */}
            <div ref={mobileAccountRef} className="relative">
              <a
                href="#!"
                className="dropdown-toggle dark:text-white/90 transition-colors duration-200 flex items-center gap-2 px-2 py-1 rounded-lg h-11"
                data-toggle="dropdown"
                onClick={handleAccountToggle}
                aria-haspopup="true"
                aria-expanded={isAccountOpen}
              >
                {user && userName && userEmail && userInitials && (
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-700 dark:text-white/90">
                        {userName}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {userEmail}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold border-2 border-white dark:border-gray-800 flex-shrink-0">
                      {userInitials}
                    </div>
                  </div>
                )}
              </a>
              {/* Account dropdown - Mobile - Same Structure as Desktop */}
              {isAccountOpen && user && userName && userEmail && (
                <div className="navbar-account-menu">
                  {/* Header - User info without avatar */}
                  <div className="navbar-account-header">
                    <p className="navbar-account-name">{userName}</p>
                    <p className="navbar-account-email">{userEmail}</p>
                  </div>
                  {/* Menu items list */}
                  <ul className="navbar-account-list">
                    {accountMenu.map((item) => (
                      <li key={item.label}>
                        <a
                          href={`/${item.href || "dashboard"}`}
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
                      handleSignOut();
                    }}
                    className="navbar-account-signout"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
