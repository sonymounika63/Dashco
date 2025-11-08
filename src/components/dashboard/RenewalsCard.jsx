const RenewalsCard = () => {
  const renewals = [
    {
      id: 'renewal-1',
      company: 'TechCorp Inc.',
      package: 'Enterprise',
      renewalDate: '2024-02-15',
      daysLeft: 15,
      status: 'warning',
    },
    {
      id: 'renewal-2',
      company: 'DataSecure Ltd.',
      package: 'Business',
      renewalDate: '2024-02-20',
      daysLeft: 20,
      status: 'info',
    },
    {
      id: 'renewal-3',
      company: 'CloudServices Co.',
      package: 'Lite',
      renewalDate: '2024-02-25',
      daysLeft: 25,
      status: 'info',
    },
  ]

  const getStatusClass = (status) => {
    const statusMap = {
      warning: 'text-warning dark:text-yellow-400',
      info: 'text-info dark:text-cyan-400',
      danger: 'text-danger dark:text-red-400',
    }
    return `${statusMap[status] || 'text-info dark:text-cyan-400'} transition-colors duration-200`
  }

  return (
    <div className="col-lg-6 col-md-12">
      <div className="card dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
        <div className="header">
          <h2 className="dark:text-white/90 transition-colors duration-200">Upcoming Renewals</h2>
        </div>
        <div className="body">
          <div className="table-responsive">
            <table className="table table-hover m-b-0 dark:text-white/90 transition-colors duration-200">
              <thead>
                <tr>
                  <th className="dark:text-white/90 dark:border-gray-700 transition-colors duration-200">Company</th>
                  <th className="dark:text-white/90 dark:border-gray-700 transition-colors duration-200">Package</th>
                  <th className="dark:text-white/90 dark:border-gray-700 transition-colors duration-200">Renewal Date</th>
                  <th className="dark:text-white/90 dark:border-gray-700 transition-colors duration-200">Days Left</th>
                </tr>
              </thead>
              <tbody>
                {renewals.map((renewal) => (
                  <tr key={renewal.id} className="dark:border-gray-700 transition-colors duration-200">
                    <td className="dark:text-white/90 transition-colors duration-200">{renewal.company}</td>
                    <td className="dark:text-white/90 transition-colors duration-200">
                      <span className="badge badge-default dark:bg-gray-700 dark:text-white/90 transition-colors duration-200">{renewal.package}</span>
                    </td>
                    <td className="dark:text-white/90 transition-colors duration-200">{renewal.renewalDate}</td>
                    <td className="dark:text-white/90 transition-colors duration-200">
                      <span className={getStatusClass(renewal.status)}>
                        {renewal.daysLeft} days
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RenewalsCard

