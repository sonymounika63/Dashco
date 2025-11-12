/**
 * Sidebar Component - Tailadmin Style
 * Updated to use FontAwesome icons instead of SVG, matching Tailadmin demo structure
 * Modified to sync main content shift with sidebar collapse — 2024
 */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, sidebarToggle = false }) => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(() => {
    const saved = localStorage.getItem("selectedMenu");
    return saved || "Dashboard";
  });
  const sidebarRef = useRef(null);

  // Update selected menu based on current route
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setSelectedMenu("Dashboard");
    } else if (location.pathname === "/pricing") {
      setSelectedMenu("Pages");
    }
  }, [location]);

  // Save selected menu to localStorage
  useEffect(() => {
    localStorage.setItem("selectedMenu", selectedMenu);
  }, [selectedMenu]);

  // Note: Click outside handling is done via overlay in Dashboard.jsx
  // No need for separate click outside handler here

  // Update body class when sidebar opens/closes on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 1280) {
      document.body.classList.add("offcanvas-active");
    } else {
      document.body.classList.remove("offcanvas-active");
    }

    return () => {
      document.body.classList.remove("offcanvas-active");
    };
  }, [isOpen]);

  const toggleMenu = (menuId) => {
    setSelectedMenu((prev) => (prev === menuId ? "" : menuId));
  };

  // Menu Group Icon (three dots)
  const MenuGroupIcon = () => (
    <svg
      className="menu-group-icon mx-auto fill-current"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z"
        fill="currentColor"
      ></path>
    </svg>
  );

  // Arrow Icon
  const ArrowIcon = ({ isActive }) => (
    <svg
      className={`menu-item-arrow ${
        isActive ? "menu-item-arrow-active" : "menu-item-arrow-inactive"
      } ${sidebarToggle ? "xl:hidden" : ""}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  return (
    <>
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`sidebar fixed top-0 left-0 z-9999 flex h-screen flex-col overflow-y-auto border-r border-gray-200 bg-white px-5 xl:static xl:translate-x-0 dark:border-gray-800 dark:bg-black ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          sidebarToggle ? "!w-[90px] xl:!w-[90px]" : "!w-[290px] xl:!w-[290px]"
        }`}
        aria-label="Main navigation"
        aria-expanded={sidebarToggle ? "false" : "true"}
      >
        {/* SIDEBAR HEADER */}
        <div className="sidebar-header flex items-center gap-2 pt-8 pb-7 justify-between px-0">
          <Link
            to="/dashboard"
            onClick={onClose}
            className="flex items-center justify-center w-full"
          >
            {/* Full Logo - Show when sidebar is expanded, or on mobile even when collapsed */}
            <img
              src="/logo.png"
              alt="Dashco Logo"
              className={`h-8 w-auto ${
                sidebarToggle ? "block xl:hidden" : "block"
              }`}
            />
            {/* Favicon Logo - Show only when sidebar is collapsed on desktop (xl) with white background */}
            <img
              src="/favicon.png"
              alt="Dashco Icon"
              className={`h-10 w-10 ${
                sidebarToggle ? "hidden xl:block" : "hidden"
              } bg-white rounded-lg p-1.5`}
            />
          </Link>
        </div>
        {/* SIDEBAR HEADER */}

        {/* Scrollable Content */}
        <div className="no-scrollbar flex flex-col overflow-y-auto">
          {/* Sidebar Menu */}
          <nav aria-label="Main menu">
            {/* Menu Group */}
            <div>
              <h3 className="mb-4 text-xs font-normal leading-5 text-gray-400 uppercase">
                <span
                  className={`menu-group-title ${
                    sidebarToggle ? "xl:hidden" : ""
                  }`}
                >
                  MENU
                </span>
                {sidebarToggle && (
                  <span className="xl:block hidden">
                    <MenuGroupIcon />
                  </span>
                )}
              </h3>

              <ul className="mb-6 flex flex-col gap-1">
                {/* Menu Item Dashboard */}
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => {
                      setSelectedMenu("Dashboard");
                      onClose();
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Dashboard" ||
                      location.pathname === "/dashboard"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-th-large text-xl flex items-center justify-center ${
                        selectedMenu === "Dashboard" ||
                        location.pathname === "/dashboard"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Dashboard
                    </span>
                  </Link>
                </li>
                {/* Menu Item Dashboard */}

                {/* Menu Item Companies */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Companies");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Companies"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-regular fa-building text-xl flex items-center justify-center ${
                        selectedMenu === "Companies"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Companies
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Companies"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Companies" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            List Companies
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Create Company
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Companies */}

                {/* Menu Item Packages */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Packages");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Packages"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-box text-xl flex items-center justify-center ${
                        selectedMenu === "Packages"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Packages
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Packages"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Packages" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            List Packages
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Create Package
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Packages */}

                {/* Menu Item Certificates */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Certificates");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Certificates"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-certificate text-xl flex items-center justify-center ${
                        selectedMenu === "Certificates"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Certificates
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Certificates"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Certificates" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            List Certificates
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Create Certificate
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Certificates */}

                {/* Menu Item Items (Repository) */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Items");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Items"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-regular fa-folder-open text-xl flex items-center justify-center ${
                        selectedMenu === "Items"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Repository
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Items"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Items" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            List Items
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Create Item
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Items (Repository) */}

                {/* Menu Item Finance */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Finance");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Finance"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-regular fa-dollar-sign text-xl flex items-center justify-center ${
                        selectedMenu === "Finance"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Finance
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Finance"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Finance" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Payment Reports
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Invoices
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Finance */}

                {/* Menu Item Users */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Users");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Users"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-users text-xl flex items-center justify-center ${
                        selectedMenu === "Users"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Users
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Users"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Users" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            List Users
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Create Sub-Admin
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Users */}

                {/* Menu Item Settings */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Settings");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Settings"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-gear text-xl flex items-center justify-center ${
                        selectedMenu === "Settings"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Settings
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Settings"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Settings" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Product Branding
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Contact Information
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            GST & Tax
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Limits Configuration
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Settings */}
              </ul>
            </div>
            {/* Menu Group */}

            {/* System Group */}
            <div>
              <h3 className="mb-4 text-xs font-normal leading-5 text-gray-400 uppercase">
                <span
                  className={`menu-group-title ${
                    sidebarToggle ? "xl:hidden" : ""
                  }`}
                >
                  System
                </span>
                {sidebarToggle && (
                  <span className="xl:block hidden">
                    <MenuGroupIcon />
                  </span>
                )}
              </h3>

              <ul className="mb-6 flex flex-col gap-1">
                {/* Menu Item Audit Logs */}
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => {
                      toggleMenu("AuditLogs");
                      onClose();
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "AuditLogs"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-clipboard-list text-xl flex items-center justify-center ${
                        selectedMenu === "AuditLogs"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Audit Logs
                    </span>
                  </Link>
                </li>
                {/* Menu Item Audit Logs */}
              </ul>
            </div>
            {/* System Group */}
          </nav>
          {/* Sidebar Menu */}
        </div>
        {/* Scrollable Content */}
      </aside>
    </>
  );
};

export default Sidebar;
