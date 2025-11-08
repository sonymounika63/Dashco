import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const MonthlySalesCard = () => {
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
          name: 'Sales',
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
  }, [])

  return (
    <div className="col-span-12 xl:col-span-8">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-black dark:text-white">Monthly Sales</h3>
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
        <div ref={chartContainerRef} className="w-full h-[300px]"></div>
      </div>
    </div>
  )
}

export default MonthlySalesCard

