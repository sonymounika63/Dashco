const CustomersDemographicCard = () => {
  const demographics = [
    { country: 'USA', customers: '2,379', percentage: 79, flag: '🇺🇸' },
    { country: 'France', customers: '589', percentage: 23, flag: '🇫🇷' },
  ]

  return (
    <div className="col-span-12 xl:col-span-4">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-white">Customers Demographic</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Number of customer based on country</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <div className="flex items-center gap-1">
              <button className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                View More
              </button>
              <button className="text-sm text-red-500 hover:text-red-700 dark:text-red-400">
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {demographics.map((demo, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{demo.flag}</span>
                <div>
                  <p className="text-sm font-medium text-black dark:text-white">{demo.country}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{demo.customers} Customers</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-black dark:text-white">{demo.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomersDemographicCard

