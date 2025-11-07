const RenewalsCard = () => {
  const renewals = [
    {
      company: 'TechCorp Inc.',
      package: 'Enterprise',
      renewalDate: '2024-02-15',
      daysLeft: 15,
      status: 'warning',
    },
    {
      company: 'DataSecure Ltd.',
      package: 'Business',
      renewalDate: '2024-02-20',
      daysLeft: 20,
      status: 'info',
    },
    {
      company: 'CloudServices Co.',
      package: 'Lite',
      renewalDate: '2024-02-25',
      daysLeft: 25,
      status: 'info',
    },
  ]

  const getStatusClass = (status) => {
    const statusMap = {
      warning: 'text-yellow-600',
      info: 'text-cyan-600',
      danger: 'text-red-600',
    }
    return statusMap[status] || 'text-cyan-600'
  }

  return (
    <div className="w-full lg:w-1/2 md:w-full px-3 mb-4">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 m-0">Upcoming Renewals</h2>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200 hover:bg-gray-50 m-0">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renewal Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Left</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {renewals.map((renewal, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{renewal.company}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{renewal.package}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{renewal.renewalDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getStatusClass(renewal.status)}`}>
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

