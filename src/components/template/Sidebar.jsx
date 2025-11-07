import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Sidebar.css";
import userImage from "../../assets/images/user.png";

const Sidebar = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    dashboard: true,
    companies: false,
    packages: false,
    certificates: false,
    items: false,
    finance: false,
    users: false,
    settings: false,
  });

  const dropdownRef = useRef(null);

  const toggleMenu = useCallback((menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleToggleDropdown = useCallback((e) => {
    e.preventDefault();
    setIsUserDropdownOpen((prev) => !prev);
  }, []);

  const handleCloseDropdown = useCallback(() => {
    setIsUserDropdownOpen(false);
  }, []);

  const handleTabChange = useCallback((tabIndex) => {
    return (e) => {
      e.preventDefault();
      setActiveTab(tabIndex);
    };
  }, []);

  const userStats = [
    { label: "Sales", value: "456" },
    { label: "Order", value: "1350" },
    { label: "Revenue", value: "$2.13B" },
  ];

  const menuItems = [
    {
      id: "dashboard",
      icon: "fa-regular fa-house",
      label: "Dashboard",
      children: [
        { href: "/dashboard", label: "Product Owner Dashboard", active: true },
        { href: "/pricing", label: "Pricing" },
      ],
    },
    {
      id: "companies",
      icon: "fa-solid fa-building",
      label: "Companies",
      children: [
        { href: "/companies", label: "List Companies" },
        { href: "/companies/create", label: "Create Company" },
      ],
    },
    {
      id: "packages",
      icon: "fa-solid fa-box",
      label: "Packages",
      children: [
        { href: "/packages", label: "List Packages" },
        { href: "/packages/create", label: "Create Package" },
      ],
    },
    {
      id: "certificates",
      icon: "fa-solid fa-certificate",
      label: "Certificates",
      children: [
        { href: "/certificates", label: "List Certificates" },
        { href: "/certificates/create", label: "Create Certificate" },
      ],
    },
    {
      id: "items",
      icon: "fa-regular fa-folder",
      label: "Items (Repository)",
      children: [
        { href: "/items", label: "List Items" },
        { href: "/items/create", label: "Create Item" },
      ],
    },
    {
      id: "finance",
      icon: "fa-solid fa-dollar-sign",
      label: "Finance",
      children: [
        { href: "/finance/reports", label: "Payment Reports" },
        { href: "/finance/invoices", label: "Invoices" },
      ],
    },
    {
      id: "users",
      icon: "fa-solid fa-users",
      label: "Users",
      children: [
        { href: "/users", label: "List Users" },
        { href: "/users/create", label: "Create User" },
      ],
    },
    {
      id: "settings",
      icon: "fa-solid fa-gear",
      label: "Settings",
      children: [
        { href: "/settings/branding", label: "Product Branding" },
        { href: "/settings/contact", label: "Contact Information" },
        { href: "/settings/tax", label: "GST & Tax" },
        { href: "/settings/limits", label: "Limits Configuration" },
      ],
    },
  ];

  const chatContacts = [
    { name: "Chris Fox", role: "Designer, Blogger", status: "online" },
    { name: "Joge Lucky", role: "Java Developer", status: "online" },
    { name: "Isabella", role: "CEO, Thememakker", status: "offline" },
    {
      name: "Folisise Chosielie",
      role: "Art director, Movie Cut",
      status: "offline",
    },
    { name: "Alexander", role: "Writter, Mag Editor", status: "online" },
  ];

  // Update body class when sidebar opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("offcanvas-active");
    } else {
      document.body.classList.remove("offcanvas-active");
    }

    return () => {
      document.body.classList.remove("offcanvas-active");
    };
  }, [isOpen]);

  // Close user dropdown when clicking outside using useRef
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isUserDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isUserDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      <div
        className="sidebar-overlay xl:hidden"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
        role="button"
        tabIndex={-1}
      />

      {/* Sidebar */}
      <aside id="left-sidebar" className="sidebar" aria-label="Main navigation">
        <div className="sidebar-scroll">
          {/* User Account Section */}
          <div className="user-account">
            <div className="flex items-start">
              {imageError ? (
                <div className="user-photo rounded-full w-[50px] h-[50px] border-2 border-gray-300 mr-2.5 flex-shrink-0 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xl font-bold">
                  AT
                </div>
              ) : (
                <img
                  src={userImage}
                  className="user-photo rounded-full w-[50px] h-[50px] border-2 border-gray-300 mr-2.5 flex-shrink-0 object-cover"
                  alt="User Profile"
                  onError={handleImageError}
                />
              )}
              <div
                className="dropdown text-left mt-1.5 inline-block relative"
                ref={dropdownRef}
              >
                <span className="text-sm text-gray-600 block">Welcome,</span>
                <button
                  type="button"
                  className="user-name dropdown-toggle block text-inherit hover:no-underline focus:no-underline cursor-pointer flex items-center gap-1 bg-transparent border-0 p-0 w-full text-left"
                  aria-haspopup="true"
                  aria-expanded={isUserDropdownOpen}
                  id="dropdown-basic"
                  onClick={handleToggleDropdown}
                >
                  <strong className="text-sm font-semibold text-gray-700">
                    Alizee Thomas
                  </strong>
                </button>
                {isUserDropdownOpen && (
                  <div
                    className="dropdown-menu dropdown-menu-right account dropdown-menu show absolute top-full mt-2 min-w-[150px] z-[9999]"
                    aria-labelledby="dropdown-basic"
                    role="menu"
                  >
                    <Link
                      to="/profilev2page"
                      className="dropdown-item"
                      onClick={handleCloseDropdown}
                      role="menuitem"
                    >
                      <i className="fa-solid fa-user" aria-hidden="true" />
                      My Profile
                    </Link>
                    <Link
                      to="/appinbox"
                      className="dropdown-item"
                      onClick={handleCloseDropdown}
                      role="menuitem"
                    >
                      <i
                        className="fa-regular fa-envelope-open"
                        aria-hidden="true"
                      />
                      Messages
                    </Link>
                    <button
                      type="button"
                      className="dropdown-item w-full text-left bg-transparent border-0"
                      onClick={handleCloseDropdown}
                      role="menuitem"
                    >
                      <i className="fa-solid fa-gear" aria-hidden="true" />
                      Settings
                    </button>
                    <li className="divider" role="separator" />
                    <Link
                      to="/login"
                      className="dropdown-item"
                      onClick={handleCloseDropdown}
                      role="menuitem"
                    >
                      <i className="fa-solid fa-power-off" aria-hidden="true" />
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <hr className="my-4 border-t border-gray-200" />
            <ul className="list-unstyled flex justify-between">
              {userStats.map((stat, idx) => (
                <li key={`stat-${idx}`} className="text-center">
                  <small className="text-xs text-gray-500 block">
                    {stat.label}
                  </small>
                  <h6 className="text-sm font-semibold text-gray-700 m-0">
                    {stat.value}
                  </h6>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Tabs */}
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                type="button"
                className={`nav-link ${activeTab === 0 ? "active" : ""}`}
                onClick={handleTabChange(0)}
                role="tab"
                aria-selected={activeTab === 0}
                aria-controls="menu-tab"
                id="menu-tab-button"
              >
                Menu
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                type="button"
                className={`nav-link ${activeTab === 1 ? "active" : ""}`}
                onClick={handleTabChange(1)}
                role="tab"
                aria-selected={activeTab === 1}
                aria-controls="chat-tab"
                id="chat-tab-button"
              >
                <i className="fa-regular fa-address-book" aria-hidden="true" />
                <span className="sr-only">Chat</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                type="button"
                className={`nav-link ${activeTab === 2 ? "active" : ""}`}
                onClick={handleTabChange(2)}
                role="tab"
                aria-selected={activeTab === 2}
                aria-controls="setting-tab"
                id="setting-tab-button"
              >
                <i className="fa-solid fa-gear" aria-hidden="true" />
                <span className="sr-only">Settings</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                type="button"
                className={`nav-link ${activeTab === 3 ? "active" : ""}`}
                onClick={handleTabChange(3)}
                role="tab"
                aria-selected={activeTab === 3}
                aria-controls="question-tab"
                id="question-tab-button"
              >
                <i
                  className="fa-regular fa-circle-question"
                  aria-hidden="true"
                />
                <span className="sr-only">Question</span>
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content px-0 pb-0 pt-4">
            {/* Menu Tab */}
            <div
              className={`tab-pane ${activeTab === 0 ? "active show" : ""}`}
              id="menu"
              role="tabpanel"
              aria-labelledby="menu-tab-button"
            >
              <nav
                id="left-sidebar-nav"
                className="sidebar-nav"
                aria-label="Main menu"
              >
                <ul id="main-menu" className="metismenu p-0 m-0 list-none">
                  {menuItems.map((item) => (
                    <li
                      key={item.id}
                      className={
                        expandedMenus[item.id] ? "active pb-1.5" : "pb-1.5"
                      }
                      id={`${
                        item.id.charAt(0).toUpperCase() + item.id.slice(1)
                      }Container`}
                    >
                      <button
                        type="button"
                        className={`has-arrow block relative py-3 px-4 text-sm transition-all duration-300 ease-out outline-none hover:bg-gray-100 hover:text-gray-900 w-full text-left bg-transparent border-0 ${
                          expandedMenus[item.id]
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleMenu(item.id);
                        }}
                        aria-expanded={expandedMenus[item.id]}
                        aria-controls={`${item.id}-submenu`}
                      >
                        <i
                          className={`${item.icon} relative top-0.5 mr-5 text-base text-[#4f5d75]`}
                          aria-hidden="true"
                        />
                        <span>{item.label}</span>
                      </button>
                      <ul
                        className={`collapse ${
                          expandedMenus[item.id] ? "in" : ""
                        }`}
                        id={`${item.id}-submenu`}
                      >
                        {item.children.map((child, idx) => (
                          <li
                            key={`${item.id}-child-${idx}`}
                            className={child.active ? "active" : ""}
                          >
                            <Link
                              to={child.href}
                              className="block py-2.5 px-4 pl-14 text-gray-600 text-sm relative hover:bg-gray-100 hover:text-gray-900 hover:no-underline before:content-['--'] before:absolute before:left-4"
                            >
                              {child.label}
                              {child.badge && (
                                <span
                                  className={`badge badge-${
                                    child.badgeType || "default"
                                  } float-right`}
                                >
                                  {child.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Chat Tab */}
            <div
              className={`tab-pane ${
                activeTab === 1 ? "active show" : ""
              } px-[15px] py-0`}
              id="Chat"
              role="tabpanel"
              aria-labelledby="chat-tab-button"
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="input-group mb-5">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white border-r-0">
                      <i
                        className="fa-solid fa-magnifying-glass"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control border-l-0"
                    placeholder="Search..."
                    aria-label="Search contacts"
                  />
                </div>
              </form>
              <ul className="list-none p-0 m-0">
                {chatContacts.map((contact, idx) => (
                  <li
                    key={`contact-${idx}`}
                    className={`${contact.status} mb-3 relative`}
                  >
                    <Link to="/dashboard" className="block hover:no-underline">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold mr-2.5 flex-shrink-0 border-2 border-transparent transition-all duration-300">
                          {contact.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-[15px] text-[#4f5d75] m-0">
                            {contact.name}
                          </span>
                          <span className="inline-block text-[13px] text-[#9ca3af]">
                            {contact.role}
                          </span>
                          <span
                            className={`absolute left-[23px] top-[30px] w-[11px] h-[11px] min-w-[11px] rounded-full border-2 border-white p-0 inline-block ${
                              contact.status === "online"
                                ? "bg-[#22c55e]"
                                : "bg-[#94a3b8]"
                            }`}
                            aria-label={
                              contact.status === "online" ? "Online" : "Offline"
                            }
                          />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Settings Tab */}
            <div
              className={`tab-pane ${
                activeTab === 2 ? "active show" : ""
              } px-[15px] py-0`}
              id="setting"
              role="tabpanel"
              aria-labelledby="setting-tab-button"
            >
              <h6 className="text-sm font-semibold text-gray-700 mb-3">
                Choose Mode
              </h6>
              <ul className="list-none p-0 m-0 mb-6">
                <li
                  data-theme="white"
                  className="active block mb-1 cursor-pointer"
                >
                  <div className="white w-[22px] h-[22px] rounded-[22px] inline-block relative bg-white border-2 border-gray-300" />
                  <span className="inline-block leading-[22px] align-top ml-1.5 text-sm text-gray-700">
                    Light
                  </span>
                </li>
                <li data-theme="black" className="block mb-1 cursor-pointer">
                  <div className="black w-[22px] h-[22px] rounded-[22px] inline-block relative bg-gray-900 border-2 border-transparent" />
                  <span className="inline-block leading-[22px] align-top ml-1.5 text-sm text-gray-700">
                    Dark
                  </span>
                </li>
              </ul>
              <hr className="my-4 border-t border-gray-200" />
              <h6 className="text-sm font-semibold text-gray-700 mb-3">
                Choose Skin
              </h6>
              <ul className="list-none p-0 m-0 mb-6">
                {["purple", "blue", "cyan", "green", "orange", "blush"].map(
                  (color) => (
                    <li
                      key={color}
                      data-theme={color}
                      className={`${
                        color === "cyan" ? "active " : ""
                      }block mb-1 cursor-pointer`}
                    >
                      <div
                        className={`${color} w-[22px] h-[22px] rounded-[22px] inline-block relative border-2 ${
                          color === "purple"
                            ? "bg-purple-500 border-gray-300"
                            : color === "blue"
                            ? "bg-blue-500 border-gray-300"
                            : color === "cyan"
                            ? "bg-cyan-500 border-[#88BDF2]"
                            : color === "green"
                            ? "bg-green-500 border-gray-300"
                            : color === "orange"
                            ? "bg-orange-500 border-gray-300"
                            : "bg-pink-500 border-gray-300"
                        }`}
                      />
                      <span className="inline-block leading-[22px] align-top ml-1.5 text-sm text-gray-700 capitalize">
                        {color}
                      </span>
                    </li>
                  )
                )}
              </ul>
              <hr className="my-4 border-t border-gray-200" />
              <h6 className="text-sm font-semibold text-gray-700 mb-3">
                General Settings
              </h6>
              <ul className="list-none p-0 m-0">
                {[
                  "Report Panel Usage",
                  "Email Redirect",
                  "Notifications",
                  "Auto Updates",
                  "Offline",
                  "Location Permission",
                ].map((setting) => (
                  <li key={setting} className="mt-[5px]">
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" name="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-700">{setting}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Question Tab */}
            <div
              className={`tab-pane ${
                activeTab === 3 ? "active show" : ""
              } px-[15px] py-0`}
              id="question"
              role="tabpanel"
              aria-labelledby="question-tab-button"
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white border-r-0">
                      <i
                        className="fa-solid fa-magnifying-glass"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control border-l-0"
                    placeholder="Search..."
                    aria-label="Search help"
                  />
                </div>
              </form>
              <ul className="list-unstyled question">
                <li className="menu-heading mt-4 mb-2 text-xs font-semibold text-gray-500 uppercase">
                  HOW-TO
                </li>
                {[
                  "How to Create Campaign",
                  "Boost Your Sales",
                  "Website Analytics",
                ].map((item) => (
                  <li key={item} className="py-0.5">
                    <a
                      href="#!"
                      className="pl-4 relative text-sm text-gray-700 hover:text-gray-900 hover:no-underline before:content-['--'] before:absolute before:left-0"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li className="menu-heading mt-4 mb-2 text-xs font-semibold text-gray-500 uppercase">
                  ACCOUNT
                </li>
                {[
                  { label: "Create New Account", href: "/registration" },
                  { label: "Change Password?", href: "/forgotpassword" },
                  { label: "Privacy & Policy", href: "#!" },
                ].map((item, idx) => (
                  <li key={`account-${idx}`} className="py-0.5">
                    <Link
                      to={item.href}
                      className="pl-4 relative text-sm text-gray-700 hover:text-gray-900 hover:no-underline before:content-['--'] before:absolute before:left-0"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="menu-heading mt-4 mb-2 text-xs font-semibold text-gray-500 uppercase">
                  BILLING
                </li>
                {["Payment info", "Auto-Renewal"].map((item) => (
                  <li key={item} className="py-0.5">
                    <a
                      href="#!"
                      className="pl-4 relative text-sm text-gray-700 hover:text-gray-900 hover:no-underline before:content-['--'] before:absolute before:left-0"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li className="menu-button mt-8">
                  <a
                    href="#!"
                    className="btn btn-primary inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:no-underline"
                  >
                    <i
                      className="fa-solid fa-circle-question"
                      aria-hidden="true"
                    />
                    Need Help?
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
