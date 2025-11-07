// Sparkline chart options for PageHeader
export const visitorsSparcalOption = {
  tooltip: {
    trigger: 'axis',
    formatter: function (value) {
      return value[0].axisValue
    },
  },
  grid: {
    top: '20%',
    bottom: 0,
    right: '5%',
    left: '5%',
  },
  xAxis: [
    {
      show: false,
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      data: [3, 5, 1, 6, 5, 4, 8, 3],
    },
  ],
  yAxis: [
    {
      show: false,
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
      data: [3, 5, 1, 6, 5, 4, 8, 3],
      itemStyle: {
        color: '#00c5dc',
      },
      lineStyle: {
        width: 0.8,
      },
      symbolSize: 1,
    },
  ],
}

export const visitsSparcalOption = {
  tooltip: {
    trigger: 'axis',
    formatter: function (value) {
      return value[0].axisValue
    },
  },
  grid: {
    top: '20%',
    bottom: 0,
    right: '5%',
    left: '5%',
  },
  xAxis: [
    {
      show: false,
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      data: [4, 6, 3, 2, 5, 6, 5, 4],
    },
  ],
  yAxis: [
    {
      show: false,
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
      data: [4, 6, 3, 2, 5, 6, 5, 4],
      itemStyle: {
        color: '#f4516c',
      },
      lineStyle: {
        width: 0.8,
      },
      symbolSize: 1,
    },
  ],
}

// SparkleCard data
export const sparkleCardData = [
  {
    heading: 'EARNINGS',
    money: '$22,500',
    perText: '19% compared to last week',
    sparklineData: {
      data: [1, 4, 1, 3, 7, 1],
      areaStyle: {
        color: '#fac091',
      },
      itemStyle: {
        color: '#f79647',
      },
    },
  },
  {
    heading: 'SALES',
    money: '$500',
    perText: '19% compared to last week',
    sparklineData: {
      data: [1, 4, 2, 3, 6, 2],
      areaStyle: {
        color: '#a092b0',
      },
      itemStyle: {
        color: '#604a7b',
      },
    },
  },
  {
    heading: 'VISITS',
    money: '$21,215',
    perText: '19% compared to last week',
    sparklineData: {
      data: [1, 4, 2, 3, 1, 5],
      areaStyle: {
        color: '#92cddc',
      },
      itemStyle: {
        color: '#4aacc5',
      },
    },
  },
  {
    heading: 'LIKES',
    money: '$421,215',
    perText: '19% compared to last week',
    sparklineData: {
      data: [1, 3, 5, 1, 4, 2],
      areaStyle: {
        color: '#95b3d7',
      },
      itemStyle: {
        color: '#4f81bc',
      },
    },
  },
]

// Top Products Chart Option
export const topProductOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['Mobile', 'Laptop', 'Computer'],
    right: '4%',
    textStyle: {
      color: '#C2C2C2',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#C2C2C2',
        },
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      minInterval: 2500,
      splitLine: {
        lineStyle: {
          type: 'dotted',
        },
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        formatter: function (value) {
          if (value > 0) {
            return value / 1000 + ' K'
          } else {
            return 0
          }
        },
        textStyle: {
          color: '#C2C2C2',
        },
      },
    },
  ],
  series: [
    {
      name: 'Mobile',
      type: 'bar',
      stack: 'Gedgets',
      data: [2350, 3205, 4520, 2351, 5632],
      itemStyle: {
        color: '#6ebdd1',
      },
      barWidth: '40px',
    },
    {
      name: 'Laptop',
      type: 'bar',
      stack: 'Gedgets',
      data: [2341, 2583, 1592, 2674, 2323],
      itemStyle: {
        color: '#f9ab6c',
      },
      barWidth: '40px',
    },
    {
      name: 'Computer',
      type: 'bar',
      stack: 'Gedgets',
      data: [1212, 5214, 2325, 4235, 2519],
      itemStyle: {
        color: '#afc979',
      },
      barWidth: '40px',
    },
  ],
}

// Total Revenue Chart Options
export const topRevenueOption = {
  tooltip: {
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    top: 0,
    right: 0,
    left: 0,
    bottom: '3%',
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#C2C2C2',
        },
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
      name: 'Mobile',
      type: 'bar',
      stack: 'Gedgets',
      data: [2, 5, 4, 8, 3, 9, 1, 5],
      itemStyle: {
        color: '#6ebdd1',
      },
      barWidth: '6px',
    },
  ],
}

export const topRevenueMonthlyOption = {
  tooltip: {
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      minInterval: 10,
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
      data: [
        3, 1, 5, 4, 7, 8, 2, 3, 1, 4, 6, 5, 4, 4, 2, 3, 1, 5, 4, 7, 8, 2, 3, 1,
        4, 6, 5, 4, 4, 2,
      ],
      itemStyle: {
        color: '#6ebdd1',
      },
      barWidth: '2px',
    },
  ],
}

// Sale Gauge Option
export const saleGaugeOption = {
  title: {
    text: '63',
    x: 'center',
    y: 'center',
    textStyle: {
      color: 'rgb(33, 33, 33)',
      fontFamily: 'Arial',
      fontSize: 20,
      fontWeight: 'bolder',
    },
  },
  grid: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  tooltip: {
    show: true,
    formatter: function (params, ticket, callback) {
      return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#212121;"></span>63'
    },
  },
  series: [
    {
      type: 'pie',
      startAngle: 215,
      clockWise: 1,
      radius: [38, 50],
      itemStyle: {
        normal: {
          label: { show: false },
          labelLine: { show: false },
        },
      },
      data: [
        {
          value: 45,
          itemStyle: {
            color: '#212121',
            emphasis: {
              color: '#212121',
            },
          },
        },
        {
          value: 34,
          itemStyle: {
            normal: {
              color: '#EEEEEE',
              label: { show: false },
              labelLine: { show: false },
              tooltip: { show: false },
            },
            emphasis: {
              color: '#EEEEEE',
            },
          },
        },
        {
          value: 33,
          itemStyle: {
            normal: {
              color: 'rgba(0,0,0,0)',
              label: { show: false },
              labelLine: { show: false },
              tooltip: { show: false },
            },
          },
        },
      ],
    },
  ],
}

// Data Managed Chart Option
export const dataManagetOption = {
  tooltip: {
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    top: -5,
    bottom: 0,
    right: 0,
    left: 0,
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
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
      stack: 'Gedgets',
      data: [2, 0, 5, 6, 4, 8, 7, 0, 6, 2, 3, 5, 6, 2, 0, 4, 0],
      itemStyle: {
        color: '#6ebdd1',
      },
      barWidth: '3px',
    },
    {
      type: 'bar',
      stack: 'Gedgets',
      data: [0, -1, 0, 0, 0, 0, 0, -5, 0, 0, 0, 0, 0, 0, -3, 0, -2],
      itemStyle: {
        color: '#db2a0b',
      },
      barWidth: '3px',
    },
  ],
}

