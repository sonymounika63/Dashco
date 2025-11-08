import { useState, useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const StatisticsCard = () => {
  const [activeTab, setActiveTab] = useState('Overview')
  const chartContainerRef = useRef(null)
  const chartInstanceRef = useRef(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const myChart = echarts.init(chartContainerRef.current)
    
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: activeTab,
          type: 'line',
          smooth: true,
          data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0.1)' },
              ],
            },
          },
          itemStyle: {
            color: '#3b82f6',
          },
        },
      ],
    }

    myChart.setOption(option)
    chartInstanceRef.current = myChart

    const handleResize = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose()
      }
    }
  }, [activeTab])

  return (
    <div className="col-span-12 xl:col-span-8">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-1">Statistics</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Target you've set for each month</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {['Overview', 'Sales', 'Revenue'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Select dates"
              className="px-3 py-2 text-sm border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <i className="fa-solid fa-calendar text-gray-400"></i>
          </div>
        </div>

        <div ref={chartContainerRef} className="w-full h-[300px]"></div>
      </div>
    </div>
  )
}

export default StatisticsCard

