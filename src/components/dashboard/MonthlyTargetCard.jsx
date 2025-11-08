const MonthlyTargetCard = () => {
  return (
    <div className="col-span-12 xl:col-span-4">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-white">Monthly Target</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Target you've set for each month</p>
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

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-green-500">+10%</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You earn $3287 today, it's higher than last month. Keep up your good work!
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
            <span className="text-sm text-gray-600 dark:text-gray-400">Target</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-black dark:text-white">$20K</span>
              <i className="fa-solid fa-check text-green-500"></i>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
            <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-black dark:text-white">$20K</span>
              <i className="fa-solid fa-check text-green-500"></i>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
            <span className="text-sm text-gray-600 dark:text-gray-400">Today</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-black dark:text-white">$20K</span>
              <i className="fa-solid fa-check text-green-500"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyTargetCard

