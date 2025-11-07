const FinanceSummaryCard = () => {
  const financeData = {
    totalRevenue: '$125,450',
    monthlyRevenue: '$45,230',
    pendingPayments: '$12,500',
    totalInvoices: 156,
  }

  return (
    <div className="w-full lg:w-1/2 md:w-full px-3 mb-4">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 m-0">Finance Summary</h2>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <h6 className="text-gray-500 m-0 text-sm font-medium">Total Revenue</h6>
                <h3 className="m-0 mt-1 text-blue-600 text-xl font-bold">{financeData.totalRevenue}</h3>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <h6 className="text-gray-500 m-0 text-sm font-medium">Monthly Revenue</h6>
                <h3 className="m-0 mt-1 text-green-600 text-xl font-bold">{financeData.monthlyRevenue}</h3>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <h6 className="text-gray-500 m-0 text-sm font-medium">Pending Payments</h6>
                <h3 className="m-0 mt-1 text-yellow-600 text-xl font-bold">{financeData.pendingPayments}</h3>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <h6 className="text-gray-500 m-0 text-sm font-medium">Total Invoices</h6>
                <h3 className="m-0 mt-1 text-cyan-600 text-xl font-bold">{financeData.totalInvoices}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceSummaryCard

