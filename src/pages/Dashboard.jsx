import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/template/Navbar.jsx";
import Sidebar from "../components/template/Sidebar.jsx";
import PageHeader from "../components/template/PageHeader.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import RecentUpdatesCard from "../components/dashboard/RecentUpdatesCard.jsx";
import FinanceSummaryCard from "../components/dashboard/FinanceSummaryCard.jsx";
import RenewalsCard from "../components/dashboard/RenewalsCard.jsx";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on mount (matching Lucid behavior)
    window.scrollTo(0, 0);
  }, [location]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const statCards = [
    {
      heading: "Total Companies",
      value: "156",
      perText: "12 new this month",
      chartColor: "#3b82f6",
    },
    {
      heading: "Active Companies",
      value: "142",
      perText: "98% active rate",
      chartColor: "#22c55e",
    },
    {
      heading: "Total Revenue",
      value: "$125,450",
      perText: "+15% from last month",
      chartColor: "#9333ea",
    },
    {
      heading: "Pending Renewals",
      value: "8",
      perText: "Next 30 days",
      chartColor: "#f97316",
    },
  ];

  return (
    <div id="wrapper">
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      <div id="main-content">
        <div
          onClick={() => {
            document.body.classList.remove("offcanvas-active");
          }}
        >
          <div className="w-full px-3 mx-auto">
            <PageHeader
              HeaderText="Product Owner Dashboard"
              Breadcrumb={[{ name: "Dashboard" }]}
            />

            {/* Stat Cards Row */}
            <div className="flex flex-wrap -mx-3 clearfix">
              {statCards.map((card, index) => (
                <StatCard
                  key={index}
                  index={index}
                  heading={card.heading}
                  value={card.value}
                  perText={card.perText}
                  chartColor={card.chartColor}
                />
              ))}
            </div>

            {/* Recent Updates and Finance Summary Row */}
            <div className="flex flex-wrap -mx-3 clearfix">
              <RecentUpdatesCard />
              <FinanceSummaryCard />
            </div>

            {/* Renewals Row */}
            <div className="flex flex-wrap -mx-3 clearfix">
              <RenewalsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
