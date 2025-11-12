const ProfileSliderCard = ({ headerText, subTitle, data, color = 'blue' }) => {
  const colorClassMap = {
    blue: 'bg-blue-500 text-blue-500',
    green: 'bg-green-500 text-green-500',
    purple: 'bg-purple-500 text-purple-500',
    cyan: 'bg-cyan-500 text-cyan-500',
    orange: 'bg-orange-500 text-orange-500',
  }

  const selectedColorClass = colorClassMap[color] || colorClassMap.blue
  const [bgClass, textClass] = selectedColorClass.split(' ')

  // Calculate total for percentage display
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className="mb-6">
      <div className="card">
        <div className="body">
          <div className="relative h-[120px] mb-4">
            {/* Simple bar chart representation */}
            <div className="flex items-end justify-around h-full gap-2">
              {data.map((item, idx) => {
                const height = (item.value / maxValue) * 100
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full rounded-t min-h-[20px] transition-all duration-300 ease-in-out ${bgClass}`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[11px] text-[#8892a0] mt-1">{item.label}</span>
                  </div>
                )
              })}
            </div>
            {/* Center total value */}
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold ${textClass}`}>
              {total}
            </div>
          </div>
          <h6 className="mb-1 text-sm font-semibold text-[#4f5d75]">{headerText}</h6>
          <span className="text-xs text-[#8892a0]">{subTitle}</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileSliderCard

