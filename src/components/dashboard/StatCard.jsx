import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const StatCard = ({ 
  heading, 
  value, 
  perText, 
  chartColor = '#3b82f6', 
  index = 0, 
  mainData = null,
  chartType = 'bar', // 'bar', 'pie', 'stacked-bar', 'line'
  useInfoBox2 = false // Use info-box-2 structure instead of number-chart
}) => {
  const chartInstanceRef = useRef(null)
  const chartContainerRef = useRef(null)
  const timeoutIDRef = useRef(null)
  
  // Initialize updateDataRef with mainData or default data
  const getInitialData = () => {
    if (mainData && Array.isArray(mainData)) {
      return [...mainData]
    }
    return [5, 6, 9, 2, 3, 6, 8, 5]
  }
  
  const updateDataRef = useRef(getInitialData())

  useEffect(() => {
    let isMounted = true

    const chartPlace = () => {
      if (!chartContainerRef.current || !isMounted) return
      
      // Dispose existing chart if it exists
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.dispose()
        } catch {
          // Ignore disposal errors
        }
        chartInstanceRef.current = null
      }

      try {
        const chartDom = chartContainerRef.current
        if (!chartDom || !isMounted) return
        
        const myChart = echarts.init(chartDom)
        
        let option = {}
        
        if (chartType === 'pie') {
          // Pie chart configuration (matching DemographicData: [30, 35, 25, 8])
          option = {
            tooltip: {
              trigger: 'item',
              formatter: '{c} ({d}%)',
            },
            grid: {
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            },
            series: [
              {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 0,
                  borderColor: '#fff',
                  borderWidth: 0,
                },
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                emphasis: {
                  label: {
                    show: false,
                  },
                },
                data: [
                  { value: 30, itemStyle: { color: '#c23531' } },
                  { value: 35, itemStyle: { color: '#2f4554' } },
                  { value: 25, itemStyle: { color: '#61a0a8' } },
                  { value: 8, itemStyle: { color: '#d48265' } },
                ],
              },
            ],
          }
        } else if (chartType === 'stacked-bar') {
          // Stacked bar chart with negative values (matching DemographicData exactly)
          // Positive bars (yellow #d1cd49) - Page Views data
          const barData = [4, 6, 0, 0, 2, 0, 4, 3, 6, 7, 0, 3]
          // Negative bars (red #d93f3f) - positioned below zero line
          const negativeData = [0, 0, -3, -1, 0, -2, 0, 0, 0, 0, -2, 0]
          
          option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              top: 1,
              bottom: 0,
              right: 1,
              left: 0,
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                splitLine: { show: false },
                axisLine: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                },
              },
            ],
            series: [
              {
                type: 'bar',
                data: barData,
                barWidth: 4,
                itemStyle: {
                  color: '#d1cd49',
                },
                symbolSize: 1,
              },
              {
                type: 'bar',
                data: negativeData,
                barWidth: 4,
                itemStyle: {
                  color: '#d93f3f',
                },
                symbolSize: 1,
              },
            ],
          }
        } else if (chartType === 'line') {
          // Line chart with points (matching DemographicData: [9, 4, 6, 5, 6, 4, 7, 3])
          option = {
            tooltip: {
              trigger: 'axis',
            },
            grid: {
              top: 1,
              bottom: 0,
              right: 1,
              left: 0,
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                },
                data: Array.from({ length: 8 }, (_, i) => i),
              },
            ],
            yAxis: [
              {
                type: 'value',
                splitLine: { show: false },
                axisLine: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                },
              },
            ],
            series: [
              {
                type: 'line',
                data: [9, 4, 6, 5, 6, 4, 7, 3],
                itemStyle: {
                  color: '#d93f3f',
                },
                lineStyle: {
                  color: '#d93f3f',
                  width: 2,
                },
                symbol: 'circle',
                symbolSize: 1,
              },
            ],
          }
        } else {
          // Default bar chart (matching DemographicData: [6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5])
          option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              top: 1,
              bottom: 0,
              right: 1,
              left: 0,
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                splitLine: { show: false },
                axisLine: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                },
              },
            ],
            series: [
              {
                type: 'bar',
                data: [6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5],
                barWidth: 4,
                itemStyle: {
                  color: chartColor || '#d1cd49',
                },
                symbolSize: 1,
              },
            ],
          }
        }

        myChart.setOption(option)
        chartInstanceRef.current = myChart
      } catch (error) {
        console.error('Error initializing chart:', error)
      }
    }

    const ploatData = (data) => {
      if (!isMounted) return
      
      const reData = []
      data.forEach(() => {
        reData.push(Math.floor(Math.random() * 10) + 1)
      })

      updateDataRef.current = reData

      timeoutIDRef.current = setTimeout(() => {
        if (isMounted) {
          chartPlace()
          ploatData(reData)
        }
      }, 5000)
    }

    // Initialize chart
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        chartPlace()
        // Start the data update loop only for number-chart (sparkline) with mainData
        // Info-box-2 charts use fixed data, no updates needed
        if (!useInfoBox2 && mainData && Array.isArray(mainData)) {
          ploatData(updateDataRef.current)
        }
      }
    }, 50)

    // Handle resize events
    const handleResize = () => {
      if (chartInstanceRef.current && isMounted) {
        chartInstanceRef.current.resize()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
      if (timeoutIDRef.current) {
        clearTimeout(timeoutIDRef.current)
      }
      window.removeEventListener('resize', handleResize)
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.dispose()
        } catch {
          // Ignore disposal errors
        }
        chartInstanceRef.current = null
      }
    }
  }, [chartColor, index, mainData, chartType, useInfoBox2])

  if (useInfoBox2) {
    // Info-box-2 structure with icon on left, content on right
    const chartClass = `chart chart-${chartType === 'pie' ? 'pie' : chartType === 'line' ? 'line' : 'bar'}`
    
    return (
      <div className="col-lg-3 col-md-6">
        <div className="card info-box-2 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
          <div className="body">
            <div className="icon">
              <div className={chartClass}>
                <div 
                  ref={chartContainerRef}
                  id={`main${index}`}
                  className="h-[60px] w-[70px] ml-[5%] mt-[10%] relative"
                ></div>
              </div>
            </div>
            <div className="content">
              <div className="text dark:text-gray-400 transition-colors duration-200">{heading}</div>
              <div className="number dark:text-white/90 transition-colors duration-200">{value}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default number-chart structure (sparkline at bottom)
  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="card overflowhidden number-chart dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
        <div className="body">
          <div className="number">
            <h6 className="dark:text-white/90 transition-colors duration-200">{heading}</h6>
            <span className="dark:text-white/90 transition-colors duration-200">{value}</span>
          </div>
          <small className="text-muted dark:text-gray-400 transition-colors duration-200">{perText}</small>
        </div>
        <div 
          ref={chartContainerRef}
          id={`main${index}`}
          className="sparkline w-full h-[55px]"
        ></div>
      </div>
    </div>
  )
}

export default StatCard

