/**
 * Sidebar Component - Tailadmin Style
 * Updated to use FontAwesome icons instead of SVG, matching Tailadmin demo structure
 * Modified to sync main content shift with sidebar collapse — 2024
 */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../assets/css/Sidebar.css";

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
    } else if (location.pathname === "/profilev2page") {
      setSelectedMenu("Profile");
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
        } ${sidebarToggle ? "!w-[90px] xl:!w-[90px]" : "!w-[290px] xl:!w-[290px]"}`}
        aria-label="Main navigation"
        aria-expanded={sidebarToggle ? "false" : "true"}
      >
        {/* SIDEBAR HEADER */}
        <div className="sidebar-header flex items-center gap-2 pt-8 pb-7 justify-between px-0">
          <Link to="/dashboard" onClick={onClose}>
            <span className={`logo ${sidebarToggle ? "xl:hidden" : ""}`}>
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
            </span>
            <img
              className={`logo-icon hidden ${
                sidebarToggle ? "xl:block" : "hidden"
              }`}
              src="https://demo.tailadmin.com/src/images/logo/logo-icon.svg"
              alt="Logo"
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
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Dashboard");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Dashboard"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-th-large w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "Dashboard"
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
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Dashboard"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Dashboard" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            eCommerce
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Analytics
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Marketing
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            CRM
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Stocks
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive relative"
                          >
                            SaaS
                            <span className="absolute right-3 flex items-center gap-1">
                              <span className="menu-dropdown-badge menu-dropdown-badge-inactive">
                                New
                              </span>
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive relative"
                          >
                            Logistics
                            <span className="absolute right-3 flex items-center gap-1">
                              <span className="menu-dropdown-badge menu-dropdown-badge-inactive">
                                New
                              </span>
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Dashboard */}

                {/* Menu Item AI */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("AI");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "AI"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-robot w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "AI"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      AI Assistant
                    </span>
                    {!sidebarToggle && (
                      <>
                        <span className="absolute right-10 flex items-center gap-1">
                          <span className="menu-dropdown-badge menu-dropdown-badge-inactive">
                            New
                          </span>
                        </span>
                        <ArrowIcon isActive={selectedMenu === "AI"} />
                      </>
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "AI" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Text Generator
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Image Generator
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Code Generator
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Video Generator
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item AI */}

                {/* Menu Item E-commerce */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("E-commerce");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "E-commerce"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-cart-shopping w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "E-commerce"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      E-commerce
                    </span>
                    {!sidebarToggle && (
                      <>
                        <span className="absolute right-10 flex items-center gap-1">
                          <span className="menu-dropdown-badge menu-dropdown-badge-inactive">
                            New
                          </span>
                        </span>
                        <ArrowIcon isActive={selectedMenu === "E-commerce"} />
                      </>
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "E-commerce" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Products
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Add Product
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Billing
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
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Single Invoice
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Create Invoice
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Transactions
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Single Transaction
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item E-commerce */}

                {/* Menu Item Calendar */}
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => {
                      toggleMenu("Calendar");
                      onClose();
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Calendar"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-calendar w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "Calendar"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Calendar
                    </span>
                  </Link>
                </li>
                {/* Menu Item Calendar */}

                {/* Menu Item Profile */}
                <li>
                  <Link
                    to="/profilev2page"
                    onClick={() => {
                      setSelectedMenu("Profile");
                      onClose();
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Profile" || location.pathname === "/profilev2page"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-user w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "Profile" || location.pathname === "/profilev2page"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      User Profile
                    </span>
                  </Link>
                </li>
                {/* Menu Item Profile */}

                {/* Menu Item Task */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Task");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Task"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-tasks w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "Task"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Task
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Task"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Task" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            List
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Kanban
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Task */}

                {/* Menu Item Forms */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Forms");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Forms"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-file-lines w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "Forms"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Forms
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Forms"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Forms" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Form Elements
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Form Layout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Forms */}

                {/* Menu Item Tables */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Tables");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Tables"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-table w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "Tables"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Tables
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Tables"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Tables" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Basic Tables
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Data Tables
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Tables */}

                {/* Menu Item Pages */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Pages");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Pages" || location.pathname === "/pricing"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-file w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "Pages" || location.pathname === "/pricing"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Pages
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Pages" || location.pathname === "/pricing"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Pages" || location.pathname === "/pricing" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            File Manager
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/pricing"
                            onClick={() => {
                              setSelectedMenu("Pages");
                              onClose();
                            }}
                            className={`menu-dropdown-item group ${
                              location.pathname === "/pricing"
                                ? "bg-gray-100 dark:bg-gray-700 text-primary"
                                : "menu-dropdown-item-inactive"
                            }`}
                          >
                            Pricing Tables
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            FAQ
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive relative"
                          >
                            API Keys
                            <span className="absolute right-3 flex items-center gap-1">
                              <span className="menu-dropdown-badge menu-dropdown-badge-inactive">
                                New
                              </span>
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive relative"
                          >
                            Integrations
                            <span className="absolute right-3 flex items-center gap-1">
                              <span className="menu-dropdown-badge menu-dropdown-badge-inactive">
                                New
                              </span>
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Blank Page
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            404 Error
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            500 Error
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            503 Error
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Coming Soon
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Maintenance
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Success
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Pages */}
              </ul>
            </div>
            {/* Menu Group */}

            {/* Support Group */}
            <div>
              <h3 className="mb-4 text-xs font-normal leading-5 text-gray-400 uppercase">
                <span
                  className={`menu-group-title ${
                    sidebarToggle ? "xl:hidden" : ""
                  }`}
                >
                  Support
                </span>
                {sidebarToggle && (
                  <span className="xl:block hidden">
                    <MenuGroupIcon />
                  </span>
                )}
              </h3>

              <ul className="mb-6 flex flex-col gap-1">
                {/* Menu Item Chat */}
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => {
                      toggleMenu("Chat");
                      onClose();
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Chat"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-comments w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "Chat"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Chat
                    </span>
                  </Link>
                </li>
                {/* Menu Item Chat */}

                {/* Menu Item Support Ticket */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Support");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Support"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-headset w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "Support"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Support Ticket
                    </span>
                    {!sidebarToggle && (
                      <>
                        <span className="absolute right-10 flex items-center gap-1">
                          <span className="menu-dropdown-badge menu-dropdown-badge-inactive">
                            New
                          </span>
                        </span>
                        <ArrowIcon isActive={selectedMenu === "Support"} />
                      </>
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Support" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Ticket List
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Ticket Reply
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Support Ticket */}

                {/* Menu Item Email */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Email");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Email"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-envelope w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "Email"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Email
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Email"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Email" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Inbox
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Details
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Email */}
              </ul>
            </div>
            {/* Support Group */}

            {/* Others Group */}
            <div>
              <h3 className="mb-4 text-xs font-normal leading-5 text-gray-400 uppercase">
                <span
                  className={`menu-group-title ${
                    sidebarToggle ? "xl:hidden" : ""
                  }`}
                >
                  others
                </span>
                {sidebarToggle && (
                  <span className="xl:block hidden">
                    <MenuGroupIcon />
                  </span>
                )}
              </h3>

              <ul className="mb-6 flex flex-col gap-1">
                {/* Menu Item Charts */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Charts");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Charts"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-chart-line w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "Charts"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Charts
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Charts"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Charts" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Line Chart
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Bar Chart
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Pie Chart
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Charts */}

                {/* Menu Item UI Elements */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("UiElements");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "UiElements"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-cube w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "UiElements"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      UI Elements
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "UiElements"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "UiElements" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Alerts
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Avatars
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Badge
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Breadcrumb
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Buttons
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Buttons Group
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Cards
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Carousel
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Dropdowns
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Images
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Links
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            List
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Modals
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Notifications
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Pagination
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Popovers
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Progress Bars
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Ribbons
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Spinners
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Tabs
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Tooltips
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Videos
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item UI Elements */}

                {/* Menu Item Authentication */}
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("Authentication");
                    }}
                    className={`menu-item group relative flex items-center rounded-lg w-full text-left transition-colors duration-200 ${
                      selectedMenu === "Authentication"
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-lock w-6 h-6 flex items-center justify-center ${
                        selectedMenu === "Authentication"
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    ></i>
                    <span
                      className={`menu-item-text ${
                        sidebarToggle ? "xl:hidden" : ""
                      }`}
                    >
                      Authentication
                    </span>
                    {!sidebarToggle && (
                      <ArrowIcon isActive={selectedMenu === "Authentication"} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {!sidebarToggle && (
                    <div
                      className={`translate transform overflow-hidden transition-all duration-300 ${
                        selectedMenu === "Authentication" ? "block" : "hidden"
                      }`}
                    >
                      <ul className="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Sign In
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Sign Up
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Reset Password
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="menu-dropdown-item group menu-dropdown-item-inactive"
                          >
                            Two Step Verification
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                {/* Menu Item Authentication */}
              </ul>
            </div>
            {/* Others Group */}
          </nav>
          {/* Sidebar Menu */}
        </div>
        {/* Scrollable Content */}
      </aside>
    </>
  );
};

export default Sidebar;
