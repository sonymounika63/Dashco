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
    <div className="flex h-screen overflow-hidden dark:bg-gray-900">
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

          <div className="mx-auto max-w-screen-2xl p-4 pb-20 md:p-6 md:pb-6">
            <PageHeader
              HeaderText="Product Owner Dashboard"
              Breadcrumb={[{ name: "Dashboard" }]}
            />

            {/* Stat Cards Grid - TailAdmin style */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:mt-6 xl:gap-6">
              {statCards.map((card, index) => (
                <StatCard
                  key={index}
                  index={index}
                  heading={card.heading}
                  value={card.value}
                  perText={card.perText}
                  chartColor={card.chartColor}
                  chartType={card.chartType}
                  useInfoBox2={card.useInfoBox2}
                />
              ))}
            </div>

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
