const PackageDistributionCard = () => {
  const packages = [
    {
      name: 'Enterprise',
      count: 45,
      percentage: 28.8,
      color: 'primary',
    },
    {
      name: 'Business',
      count: 52,
      percentage: 33.3,
      color: 'success',
    },
    {
      name: 'Lite',
      count: 38,
      percentage: 24.4,
      color: 'info',
    },
    {
      name: 'Basic',
      count: 21,
      percentage: 13.5,
      color: 'warning',
    },
  ]

  // Color classes removed - using Tailwind classes directly in JSX

  return (
    <div className="card bg-white dark:bg-white/[0.03] border-0 dark:border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm transition-colors duration-200">
        <div className="header p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-gray-900 dark:text-white/90 text-xl font-semibold transition-colors duration-200 m-0">Package Distribution</h2>
        </div>
        <div className="body p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packages.map((pkg, index) => {
              const colorClasses = {
                primary: { bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
                success: { bg: 'bg-green-500', text: 'text-green-600 dark:text-green-400' },
                info: { bg: 'bg-cyan-500', text: 'text-cyan-600 dark:text-cyan-400' },
                warning: { bg: 'bg-yellow-500', text: 'text-yellow-600 dark:text-yellow-400' },
                danger: { bg: 'bg-red-500', text: 'text-red-600 dark:text-red-400' },
              }
              const colors = colorClasses[pkg.color] || colorClasses.info
              return (
                <div key={index} className="mb-3">
                  <div className="flex items-center mb-2">
                    <div className={`${colors.bg} rounded mr-2 w-3 h-3`}></div>
                    <span className="text-gray-600 dark:text-gray-400 transition-colors duration-200">{pkg.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${colors.text} font-bold transition-colors duration-200`}>{pkg.count} Companies</span>
                    <span className="text-gray-600 dark:text-gray-400 transition-colors duration-200">{pkg.percentage}%</span>
                  </div>
                  <div className="w-full mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-200">
                    <div
                      className={`${colors.bg} h-full transition-all duration-300 rounded-full`}
                      role="progressbar"
                      aria-valuenow={pkg.percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: `${pkg.percentage}%` }}
                      aria-label={`${pkg.name} progress: ${pkg.percentage}%`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
  )
}

export default PackageDistributionCard

