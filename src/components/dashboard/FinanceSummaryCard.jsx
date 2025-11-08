const FinanceSummaryCard = () => {
  const financeData = {
    totalRevenue: '$125,450',
    monthlyRevenue: '$45,230',
    pendingPayments: '$12,500',
    totalInvoices: 156,
  }

  return (
    <div className="col-lg-6 col-md-12">
      <div className="card dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
        <div className="header">
          <h2 className="dark:text-white/90 transition-colors duration-200">Finance Summary</h2>
        </div>
        <div className="body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="text-center p-3 bg-light dark:bg-gray-700 rounded transition-colors duration-200">
                <h6 className="text-muted dark:text-gray-400 m-b-0 transition-colors duration-200">Total Revenue</h6>
                <h3 className="m-t-0 text-primary dark:text-blue-400 transition-colors duration-200">{financeData.totalRevenue}</h3>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="text-center p-3 bg-light dark:bg-gray-700 rounded transition-colors duration-200">
                <h6 className="text-muted dark:text-gray-400 m-b-0 transition-colors duration-200">Monthly Revenue</h6>
                <h3 className="m-t-0 text-success dark:text-green-400 transition-colors duration-200">{financeData.monthlyRevenue}</h3>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="text-center p-3 bg-light dark:bg-gray-700 rounded transition-colors duration-200">
                <h6 className="text-muted dark:text-gray-400 m-b-0 transition-colors duration-200">Pending Payments</h6>
                <h3 className="m-t-0 text-warning dark:text-yellow-400 transition-colors duration-200">{financeData.pendingPayments}</h3>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="text-center p-3 bg-light dark:bg-gray-700 rounded transition-colors duration-200">
                <h6 className="text-muted dark:text-gray-400 m-b-0 transition-colors duration-200">Total Invoices</h6>
                <h3 className="m-t-0 text-info dark:text-cyan-400 transition-colors duration-200">{financeData.totalInvoices}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceSummaryCard

