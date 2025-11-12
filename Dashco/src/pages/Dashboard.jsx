// Modified to sync main content shift with sidebar collapse — 2024
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/template/Navbar.jsx";
import Sidebar from "../components/template/Sidebar.jsx";
import PageHeader from "../components/template/PageHeader.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import RecentUpdatesCard from "../components/dashboard/RecentUpdatesCard.jsx";
import FinanceSummaryCard from "../components/dashboard/FinanceSummaryCard.jsx";
import RenewalsCard from "../components/dashboard/RenewalsCard.jsx";
import PackageDistributionCard from "../components/dashboard/PackageDistributionCard.jsx";
import brand07 from "../assets/images/brand/brand-07.svg";
import brand08 from "../assets/images/brand/brand-08.svg";
import brand09 from "../assets/images/brand/brand-09.svg";
import brand10 from "../assets/images/brand/brand-10.svg";
import { supabase } from "../lib/supabase";

const Dashboard = () => {
  // Sidebar should be open by default on desktop (xl screens >= 1280px)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth >= 1280;
  });
  // Sidebar toggle state for desktop collapse/expand
  const [sidebarToggle, setSidebarToggle] = useState(false);
  // Track if we're on mobile to avoid checking window.innerWidth during render
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1280);
  const location = useLocation();

  // Handle OAuth callback and clean up URL
  // Chrome-specific: Enhanced callback handling for Chrome's stricter cookie/storage policies
  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Check for OAuth callback in URL
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const queryParams = new URLSearchParams(window.location.search);
        const isOAuthCallback =
          hashParams.has("access_token") ||
          queryParams.has("code") ||
          hashParams.has("code");

        // Check for OAuth errors in URL
        const error = queryParams.get("error") || hashParams.get("error");
        const errorDescription =
          queryParams.get("error_description") ||
          hashParams.get("error_description");

        if (error) {
          console.error("OAuth error from callback:", error, errorDescription);
          // Redirect to login with error message
          const errorMessage = errorDescription || error;
          if (
            errorMessage.includes("browser") ||
            errorMessage.includes("secure")
          ) {
            // Store error in sessionStorage to show on login page
            sessionStorage.setItem(
              "oauth_error",
              "Google OAuth requires a secure browser. Please use Chrome or Firefox, and ensure your email is added as a test user in Google Cloud Console."
            );
          }
          window.history.replaceState({}, document.title, "/login");
          window.location.href = "/login";
          return;
        }

        if (isOAuthCallback) {
          console.log("OAuth callback detected, processing...");

          // Chrome-specific: Wait longer for session to be established (Chrome may take longer)
          // Try multiple times as Chrome's storage policies may delay session persistence
          let session = null;
          let sessionError = null;
          const maxRetries = 5;
          const retryDelay = 500; // 500ms between retries

          for (let i = 0; i < maxRetries; i++) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));

            const result = await supabase.auth.getSession();
            session = result.data?.session;
            sessionError = result.error;

            if (session) {
              console.log("Session established on attempt", i + 1);
              break;
            }

            if (i < maxRetries - 1) {
              console.log(
                `Session not found, retrying... (${i + 1}/${maxRetries})`
              );
            }
          }

          // Also try to get the session from the URL hash (Chrome may store it there)
          if (!session) {
            console.log("Attempting to extract session from URL hash...");
            try {
              // Supabase should handle this automatically, but we can trigger it manually
              const {
                data: { session: urlSession },
              } = await supabase.auth.getSession();
              if (urlSession) {
                session = urlSession;
                console.log("Session extracted from URL");
              }
            } catch (err) {
              console.error("Error extracting session from URL:", err);
            }
          }

          if (sessionError || !session) {
            console.error(
              "OAuth callback: Session not established after retries",
              sessionError
            );
            // Check if it's a Chrome-specific storage issue
            const isChrome =
              /Chrome/.test(navigator.userAgent) &&
              /Google Inc/.test(navigator.vendor);
            const errorMsg = isChrome
              ? "Failed to create session after OAuth. This may be due to Chrome's privacy settings. Please check: 1) Third-party cookies are allowed, 2) Site has storage permissions, 3) Not in Incognito mode."
              : "Failed to create session after OAuth. Please try again.";

            sessionStorage.setItem("oauth_error", errorMsg);
            window.history.replaceState({}, document.title, "/login");
            window.location.href = "/login";
            return;
          }

          console.log("OAuth callback successful, session established");

          // Clean up URL after OAuth callback
          window.history.replaceState({}, document.title, "/dashboard");
        }
      } catch (err) {
        console.error("OAuth callback handling error:", err);
        // Redirect to login on error
        const isChrome =
          /Chrome/.test(navigator.userAgent) &&
          /Google Inc/.test(navigator.vendor);
        const errorMsg = isChrome
          ? "An error occurred during OAuth authentication. Chrome may have blocked cookies or storage. Please check your browser settings."
          : "An error occurred during OAuth authentication. Please try again.";
        sessionStorage.setItem("oauth_error", errorMsg);
        window.history.replaceState({}, document.title, "/login");
      }
    };

    handleOAuthCallback();
  }, []);

  useEffect(() => {
    // Scroll to top on mount (matching Lucid behavior)
    window.scrollTo(0, 0);
  }, [location]);

  // Handle window resize to keep sidebar state in sync with screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 1280;
      setIsMobile(mobile);

      if (width >= 1280) {
        // On desktop, sidebar should always be open (but can be collapsed)
        setIsSidebarOpen(true);
      } else {
        // On mobile, close sidebar when resizing from desktop
        setIsSidebarOpen(false);
      }
    };

    // Check on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when sidebar is open on mobile (match TailAdmin behavior)
  useEffect(() => {
    // Only lock body scroll on mobile when sidebar is open
    // On desktop, body should never be locked - content area handles scrolling
    if (isSidebarOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      // Always restore scroll on unmount
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen, isMobile]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleToggleSidebarCollapse = () => {
    setSidebarToggle((prev) => !prev);
  };

  const statCards = [
    {
      heading: "Total Companies",
      value: "156",
      perText: "12 new this month",
      chartColor: "#d1cd49",
      chartType: "bar",
      useInfoBox2: true,
    },
    {
      heading: "Active Companies",
      value: "142",
      perText: "98% active rate",
      chartColor: "#22c55e",
      chartType: "pie",
      useInfoBox2: true,
    },
    {
      heading: "Total Revenue",
      value: "$125,450",
      perText: "+15% from last month",
      chartColor: "#9333ea",
      chartType: "stacked-bar",
      useInfoBox2: true,
    },
    {
      heading: "Pending Renewals",
      value: "8",
      perText: "Next 30 days",
      chartColor: "#f97316",
      chartType: "line",
      useInfoBox2: true,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden dark:bg-dark-bg-primary">
      {/* ===== Sidebar Start ===== */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        sidebarToggle={sidebarToggle}
      />
      {/* ===== Sidebar End ===== */}

      {/* ===== Content Area Start ===== */}
      <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto h-full max-h-screen">
        {/* Small Device Overlay Start - Match TailAdmin mobile overlay */}
        {isSidebarOpen && isMobile && (
          <div
            className="fixed inset-0 z-[9998] h-screen w-screen bg-black/50 transition-opacity duration-300 xl:hidden"
            onClick={(e) => {
              e.stopPropagation();
              handleCloseSidebar();
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                handleCloseSidebar();
              }
            }}
            aria-hidden="true"
            role="button"
            tabIndex={-1}
          ></div>
        )}
        {/* Small Device Overlay End */}

        {/* ===== Main Content Start ===== */}
        <main>
          {/* ===== Header Start ===== */}
          <Navbar
            onToggleSidebar={handleToggleSidebar}
            onToggleSidebarCollapse={handleToggleSidebarCollapse}
            sidebarToggle={sidebarToggle}
            isSidebarOpen={isSidebarOpen}
          />
          {/* ===== Header End ===== */}

          <div className="mx-auto max-w-screen-2xl p-4 pb-6 md:p-6">
            <PageHeader
              HeaderText="Product Owner Dashboard"
              Breadcrumb={[{ name: "Dashboard" }]}
            />

            {/* Stat Cards Grid */}
            <div className="flex flex-wrap -mx-3 mt-4 xl:mt-6">
              {statCards.map((card, index) => (
                <div key={index} className="px-3 w-full md:w-1/2 lg:w-1/4">
                  <StatCard
                    index={index}
                    heading={card.heading}
                    value={card.value}
                    perText={card.perText}
                    chartColor={card.chartColor}
                    chartType={card.chartType}
                    useInfoBox2={card.useInfoBox2}
                  />
                </div>
              ))}
            </div>
            {/* Metric Group Five */}
            <div className="mt-4 xl:mt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
                {/* Metric Item Start */}
                <div className="rounded-2xl border border-gray-200 bg-white px-4 pb-4 pt-4 dark:border-[#171f2e] dark:bg-[#171f2e]">
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        src={brand07}
                        alt="brand"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <h6 className="text-sm font-semibold text-gray-800 dark:text-white/90 leading-tight">
                        AAPL
                      </h6>
                      <span className="block text-theme-xs text-gray-500 dark:text-gray-400 leading-tight">
                        Apple, Inc
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <h6 className="text-base font-semibold text-gray-800 dark:text-white/90 leading-tight">
                        $1,232.00
                      </h6>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-success-50 py-0.5 pl-1.5 pr-2 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500 flex-shrink-0">
                      <svg
                        className="fill-current"
                        width="10"
                        height="10"
                        viewBox="0 0 13 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.06462 1.62393C6.20193 1.47072 6.40135 1.37432 6.62329 1.37432C6.6236 1.37432 6.62391 1.37432 6.62422 1.37432C6.81631 1.37415 7.00845 1.44731 7.15505 1.5938L10.1551 4.5918C10.4481 4.88459 10.4483 5.35946 10.1555 5.65246C9.86273 5.94546 9.38785 5.94562 9.09486 5.65283L7.37329 3.93247L7.37329 10.125C7.37329 10.5392 7.03751 10.875 6.62329 10.875C6.20908 10.875 5.87329 10.5392 5.87329 10.125L5.87329 3.93578L4.15516 5.65281C3.86218 5.94561 3.3873 5.94546 3.0945 5.65248C2.8017 5.35949 2.80185 4.88462 3.09484 4.59182L6.06462 1.62393Z"
                          fill=""
                        ></path>
                      </svg>
                      11.01%
                    </span>
                  </div>
                </div>
                {/* Metric Item End */}

                {/* Metric Item Start */}
                <div className="rounded-2xl border border-gray-200 bg-white px-4 pb-4 pt-4 dark:border-[#171f2e] dark:bg-[#171f2e]">
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        src={brand08}
                        alt="brand"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <h6 className="text-sm font-semibold text-gray-800 dark:text-white/90 leading-tight">
                        PYPL
                      </h6>
                      <span className="block text-theme-xs text-gray-500 dark:text-gray-400 leading-tight">
                        Paypal, Inc
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <h6 className="text-base font-semibold text-gray-800 dark:text-white/90 leading-tight">
                        $965.00
                      </h6>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-error-50 py-0.5 pl-1.5 pr-2 text-xs font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500 flex-shrink-0">
                      <svg
                        className="fill-current"
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.31462 10.3761C5.45194 10.5293 5.65136 10.6257 5.87329 10.6257C5.8736 10.6257 5.8739 10.6257 5.87421 10.6257C6.0663 10.6259 6.25845 10.5527 6.40505 10.4062L9.40514 7.4082C9.69814 7.11541 9.69831 6.64054 9.40552 6.34754C9.11273 6.05454 8.63785 6.05438 8.34486 6.34717L6.62329 8.06753L6.62329 1.875C6.62329 1.46079 6.28751 1.125 5.87329 1.125C5.45908 1.125 5.12329 1.46079 5.12329 1.875L5.12329 8.06422L3.40516 6.34719C3.11218 6.05439 2.6373 6.05454 2.3445 6.34752C2.0517 6.64051 2.05185 7.11538 2.34484 7.40818L5.31462 10.3761Z"
                          fill=""
                        ></path>
                      </svg>
                      9.05%
                    </span>
                  </div>
                </div>
                {/* Metric Item End */}

                {/* Metric Item Start */}
                <div className="rounded-2xl border border-gray-200 bg-white px-4 pb-4 pt-4 dark:border-[#171f2e] dark:bg-[#171f2e]">
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        src={brand09}
                        alt="brand"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <h6 className="text-sm font-semibold text-gray-800 dark:text-white/90 leading-tight">
                        TSLA
                      </h6>
                      <span className="block text-theme-xs text-gray-500 dark:text-gray-400 leading-tight">
                        Tesla, Inc
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <h6 className="text-base font-semibold text-gray-800 dark:text-white/90 leading-tight">
                        $1,232.00
                      </h6>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-success-50 py-0.5 pl-1.5 pr-2 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500 flex-shrink-0">
                      <svg
                        className="fill-current"
                        width="10"
                        height="10"
                        viewBox="0 0 13 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.06462 1.62393C6.20193 1.47072 6.40135 1.37432 6.62329 1.37432C6.6236 1.37432 6.62391 1.37432 6.62422 1.37432C6.81631 1.37415 7.00845 1.44731 7.15505 1.5938L10.1551 4.5918C10.4481 4.88459 10.4483 5.35946 10.1555 5.65246C9.86273 5.94546 9.38785 5.94562 9.09486 5.65283L7.37329 3.93247L7.37329 10.125C7.37329 10.5392 7.03751 10.875 6.62329 10.875C6.20908 10.875 5.87329 10.5392 5.87329 10.125L5.87329 3.93578L4.15516 5.65281C3.86218 5.94561 3.3873 5.94546 3.0945 5.65248C2.8017 5.35949 2.80185 4.88462 3.09484 4.59182L6.06462 1.62393Z"
                          fill=""
                        ></path>
                      </svg>
                      11.01%
                    </span>
                  </div>
                </div>
                {/* Metric Item End */}

                {/* Metric Item Start */}
                <div className="rounded-2xl border border-gray-200 bg-white px-4 pb-4 pt-4 dark:border-[#171f2e] dark:bg-[#171f2e]">
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        src={brand10}
                        alt="brand"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <h6 className="text-sm font-semibold text-gray-800 dark:text-white/90 leading-tight">
                        AMZN
                      </h6>
                      <span className="block text-theme-xs text-gray-500 dark:text-gray-400 leading-tight">
                        Amazone.com, Inc
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <h6 className="text-base font-semibold text-gray-800 dark:text-white/90 leading-tight">
                        $2,567.99
                      </h6>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-success-50 py-0.5 pl-1.5 pr-2 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500 flex-shrink-0">
                      <svg
                        className="fill-current"
                        width="10"
                        height="10"
                        viewBox="0 0 13 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.06462 1.62393C6.20193 1.47072 6.40135 1.37432 6.62329 1.37432C6.6236 1.37432 6.62391 1.37432 6.62422 1.37432C6.81631 1.37415 7.00845 1.44731 7.15505 1.5938L10.1551 4.5918C10.4481 4.88459 10.4483 5.35946 10.1555 5.65246C9.86273 5.94546 9.38785 5.94562 9.09486 5.65283L7.37329 3.93247L7.37329 10.125C7.37329 10.5392 7.03751 10.875 6.62329 10.875C6.20908 10.875 5.87329 10.5392 5.87329 10.125L5.87329 3.93578L4.15516 5.65281C3.86218 5.94561 3.3873 5.94546 3.0945 5.65248C2.8017 5.35949 2.80185 4.88462 3.09484 4.59182L6.06462 1.62393Z"
                          fill=""
                        ></path>
                      </svg>
                      11.01%
                    </span>
                  </div>
                </div>
                {/* Metric Item End */}
              </div>
            </div>
            {/* Metric Group Five End */}
            {/* Recent Updates and Finance Summary Grid - TailAdmin style */}
            <div className="mt-4 grid grid-cols-1 gap-4 xl:mt-6 xl:grid-cols-2 xl:gap-6">
              <RecentUpdatesCard />
              <FinanceSummaryCard />
            </div>

            {/* Renewals and Package Distribution Grid - TailAdmin style */}
            <div className="mt-4 grid grid-cols-1 gap-4 xl:mt-6 xl:grid-cols-2 xl:gap-6">
              <RenewalsCard />
              <PackageDistributionCard />
            </div>
          </div>
        </main>
        {/* ===== Main Content End ===== */}
      </div>
      {/* ===== Content Area End ===== */}
    </div>
  );
};

export default Dashboard;
