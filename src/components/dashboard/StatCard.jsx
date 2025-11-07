const StatCard = ({ heading, value, perText, icon, iconColor = 'text-blue-600', chartColor = '#3b82f6', index = 0 }) => {
  return (
    <div className="w-full lg:w-1/4 md:w-1/2 sm:w-1/2 px-3 mb-4">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden number-chart">
        <div className="p-4">
          <div className="number">
            <h6 className="text-sm font-semibold text-gray-600 mb-1">{heading}</h6>
            <span className="text-2xl font-bold text-gray-800">{value}</span>
          </div>
          <small className="text-xs text-gray-500 block mt-2">{perText}</small>
        </div>
        <div 
          id={`main${index}`}
          className="sparkline w-full h-[55px]"
        ></div>
      </div>
    </div>
  )
}

export default StatCard

