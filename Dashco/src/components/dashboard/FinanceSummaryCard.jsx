const FinanceSummaryCard = () => {
  const financeData = {
    totalRevenue: '$2,845,230',
    monthlyRevenue: '$342,580',
    pendingPayments: '$87,500',
    totalInvoices: 478,
  }

  return (
    <div className="card bg-white dark:bg-white/[0.03] border-0 dark:border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm transition-colors duration-200">
        <div className="header p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-gray-900 dark:text-white/90 text-xl font-semibold transition-colors duration-200 m-0">Finance Summary</h2>
        </div>
        <div className="body p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors duration-200">
              <h6 className="text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-200">Total Revenue</h6>
              <h3 className="text-blue-600 dark:text-blue-400 text-2xl font-bold transition-colors duration-200">{financeData.totalRevenue}</h3>
            </div>
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors duration-200">
              <h6 className="text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-200">Monthly Revenue</h6>
              <h3 className="text-green-600 dark:text-green-400 text-2xl font-bold transition-colors duration-200">{financeData.monthlyRevenue}</h3>
            </div>
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors duration-200">
              <h6 className="text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-200">Pending Payments</h6>
              <h3 className="text-yellow-600 dark:text-yellow-400 text-2xl font-bold transition-colors duration-200">{financeData.pendingPayments}</h3>
            </div>
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors duration-200">
              <h6 className="text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-200">Total Invoices</h6>
              <h3 className="text-cyan-600 dark:text-cyan-400 text-2xl font-bold transition-colors duration-200">{financeData.totalInvoices}</h3>
            </div>
          </div>
        </div>
      </div>
  )
}

export default FinanceSummaryCard

