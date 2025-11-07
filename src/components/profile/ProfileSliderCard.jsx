import '../../assets/css/profile.css'

const ProfileSliderCard = ({ headerText, subTitle, data, color = 'blue' }) => {
  const colorMap = {
    blue: '#3b82f6',
    green: '#22c55e',
    purple: '#9333ea',
    cyan: '#06b6d4',
    orange: '#f97316',
  }

  const selectedColor = colorMap[color] || colorMap.blue

  // Calculate total for percentage display
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className="col-12 profile-slider-card">
      <div className="card">
        <div className="body">
          <div className="profile-slider-chart-container">
            {/* Simple bar chart representation */}
            <div className="profile-slider-chart">
              {data.map((item, idx) => {
                const height = (item.value / maxValue) * 100
                return (
                  <div key={idx} className="profile-slider-bar-container">
                    <div
                      className="profile-slider-bar w-full rounded-t min-h-[20px] transition-all duration-300 ease-in-out"
                      style={{
                        height: `${height}%`,
                        backgroundColor: selectedColor,
                      }}
                    />
                    <span className="profile-slider-bar-label">{item.label}</span>
                  </div>
                )
              })}
            </div>
            {/* Center total value */}
            <div
              className="profile-slider-total"
              style={{
                color: selectedColor,
              }}
            >
              {total}
            </div>
          </div>
          <h6 className="profile-slider-header">{headerText}</h6>
          <span className="profile-slider-subtitle">{subTitle}</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileSliderCard

