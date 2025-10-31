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
    <div className="col-12" style={{ marginBottom: '24px' }}>
      <div className="card">
        <div className="body">
          <div style={{ position: 'relative', height: '120px', marginBottom: '16px' }}>
            {/* Simple bar chart representation */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '100%', gap: '8px' }}>
              {data.map((item, idx) => {
                const height = (item.value / maxValue) * 100
                return (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '100%',
                        height: `${height}%`,
                        backgroundColor: selectedColor,
                        borderRadius: '4px 4px 0 0',
                        minHeight: '20px',
                        transition: 'height 0.3s ease',
                      }}
                    />
                    <span style={{ fontSize: '11px', color: '#8892a0', marginTop: '4px' }}>{item.label}</span>
                  </div>
                )
              })}
            </div>
            {/* Center total value */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '24px',
                fontWeight: 'bold',
                color: selectedColor,
              }}
            >
              {total}
            </div>
          </div>
          <h6 style={{ marginBottom: '4px', fontSize: '14px', fontWeight: 600, color: '#4f5d75' }}>{headerText}</h6>
          <span style={{ fontSize: '12px', color: '#8892a0' }}>{subTitle}</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileSliderCard

