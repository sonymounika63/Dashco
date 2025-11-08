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

  const getColorClass = (color) => {
    const colorMap = {
      primary: 'bg-primary',
      success: 'bg-success',
      info: 'bg-info',
      warning: 'bg-warning',
      danger: 'bg-danger',
    }
    return colorMap[color] || 'bg-secondary'
  }

  const getTextColorClass = (color) => {
    const colorMap = {
      primary: 'text-primary dark:text-blue-400',
      success: 'text-success dark:text-green-400',
      info: 'text-info dark:text-cyan-400',
      warning: 'text-warning dark:text-yellow-400',
      danger: 'text-danger dark:text-red-400',
    }
    return `${colorMap[color] || 'text-secondary dark:text-gray-400'} transition-colors duration-200`
  }

  return (
    <div className="col-lg-6 col-md-12">
      <div className="card dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
        <div className="header">
          <h2 className="dark:text-white/90 transition-colors duration-200">Package Distribution</h2>
        </div>
        <div className="body">
          <div className="row">
            {packages.map((pkg, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="d-flex align-items-center mb-2">
                  <div className={`${getColorClass(pkg.color)} rounded me-2 w-3 h-3`}></div>
                  <span className="text-muted dark:text-gray-400 transition-colors duration-200">{pkg.name}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className={`${getTextColorClass(pkg.color)} fw-bold`}>{pkg.count} Companies</span>
                  <span className="text-muted dark:text-gray-400 transition-colors duration-200">{pkg.percentage}%</span>
                </div>
                <div className="progress mt-2 h-2 dark:bg-gray-700 transition-colors duration-200">
                  <div
                    className={`progress-bar ${getColorClass(pkg.color)}`}
                    role="progressbar"
                    style={{ width: `${pkg.percentage}%` }}
                    aria-valuenow={pkg.percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackageDistributionCard

