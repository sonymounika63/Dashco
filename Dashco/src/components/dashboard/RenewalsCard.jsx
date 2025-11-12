const RenewalsCard = () => {
  const renewals = [
    {
      id: "renewal-1",
      company: "DataSecure Ltd.",
      package: "Enterprise",
      renewalDate: "2024-02-15",
      daysLeft: 15,
      status: "warning",
    },
    {
      id: "renewal-2",
      company: "TechCorp Inc.",
      package: "Business",
      renewalDate: "2024-02-20",
      daysLeft: 20,
      status: "info",
    },
    {
      id: "renewal-3",
      company: "CloudServices Co.",
      package: "Lite",
      renewalDate: "2024-02-25",
      daysLeft: 25,
      status: "info",
    },
    {
      id: "renewal-4",
      company: "SecureTech Solutions",
      package: "Business",
      renewalDate: "2024-03-01",
      daysLeft: 29,
      status: "info",
    },
    {
      id: "renewal-5",
      company: "FinanceHub Global",
      package: "Enterprise",
      renewalDate: "2024-03-05",
      daysLeft: 33,
      status: "info",
    },
    {
      id: "renewal-6",
      company: "HealthData Systems",
      package: "Lite",
      renewalDate: "2024-03-08",
      daysLeft: 36,
      status: "info",
    },
  ];

  // Package badge color mapping
  const getPackageBadgeClasses = (packageType) => {
    const colorMap = {
      Enterprise:
        "bg-success-500/10 text-success-600 dark:bg-success-500/15 dark:text-success-500", // Green
      Business:
        "bg-orange-500/10 text-orange-600 dark:bg-orange-500/15 dark:text-orange-500", // Orange
      Lite: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-500", // Blue
    };
    return colorMap[packageType] || "bg-gray-50 text-gray-600";
  };

  return (
    <div className="card bg-white dark:bg-white/[0.03] border-0 dark:border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm transition-colors duration-200">
      <div className="header p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h2 className="text-gray-900 dark:text-white/90 text-xl font-semibold transition-colors duration-200 m-0">
          Upcoming Renewals
        </h2>
      </div>
      <div className="body p-5">
        <div className="overflow-x-auto">
          <table className="w-full mb-0 text-gray-900 dark:text-white/90 transition-colors duration-200">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-gray-700 dark:text-white/90 border-b border-gray-200 dark:border-gray-800 px-4 py-3 text-left font-semibold transition-colors duration-200">
                  Company
                </th>
                <th className="text-gray-700 dark:text-white/90 border-b border-gray-200 dark:border-gray-800 px-4 py-3 text-left font-semibold transition-colors duration-200">
                  Package
                </th>
                <th className="text-gray-700 dark:text-white/90 border-b border-gray-200 dark:border-gray-800 px-4 py-3 text-left font-semibold transition-colors duration-200">
                  Renewal Date
                </th>
                <th className="text-gray-700 dark:text-white/90 border-b border-gray-200 dark:border-gray-800 px-4 py-3 text-left font-semibold transition-colors duration-200">
                  Days Left
                </th>
              </tr>
            </thead>
            <tbody>
              {renewals.map((renewal) => (
                <tr
                  key={renewal.id}
                  className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors duration-200"
                >
                  <td className="text-gray-900 dark:text-white/90 px-4 py-3 transition-colors duration-200">
                    {renewal.company}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap first:pl-0">
                    <div className="flex items-center">
                      <p
                        className={`text-theme-xs rounded-full px-2 py-0.5 font-medium ${getPackageBadgeClasses(
                          renewal.package
                        )}`}
                      >
                        {renewal.package}
                      </p>
                    </div>
                  </td>
                  <td className="text-gray-900 dark:text-white/90 px-4 py-3 transition-colors duration-200">
                    {renewal.renewalDate}
                  </td>
                  <td className="text-gray-900 dark:text-white/90 px-4 py-3 transition-colors duration-200">
                    <span
                      className={
                        renewal.status === "warning"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-cyan-600 dark:text-cyan-400"
                      }
                    >
                      {renewal.daysLeft} days
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RenewalsCard;
