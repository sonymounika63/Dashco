const RecentUpdatesCard = () => {
  const updates = [
    {
      icon: 'fa-solid fa-building',
      iconColor: 'text-blue-600',
      title: 'New Company Onboarded',
      description: 'TechCorp Inc. has been successfully onboarded',
      time: '2 hours ago',
    },
    {
      icon: 'fa-solid fa-file-invoice',
      iconColor: 'text-green-600',
      title: 'Invoice Generated',
      description: 'Invoice #INV-2024-001 has been generated',
      time: '5 hours ago',
    },
    {
      icon: 'fa-solid fa-user-plus',
      iconColor: 'text-cyan-600',
      title: 'New User Added',
      description: 'John Doe has been added to Company ABC',
      time: '1 day ago',
    },
    {
      icon: 'fa-solid fa-certificate',
      iconColor: 'text-yellow-600',
      title: 'Certificate Updated',
      description: 'ISO 27001:2022 certificate has been updated',
      time: '2 days ago',
    },
  ]

  return (
    <div className="w-full lg:w-1/2 md:w-full px-3 mb-4">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 m-0">Recent Updates</h2>
        </div>
        <div className="p-4">
          <ul className="list-none p-0 m-0">
            {updates.map((update, index) => (
              <li key={index} className="mb-3 pb-3 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <i className={`${update.icon} ${update.iconColor} text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h6 className="m-0 mb-1 font-semibold text-gray-800">{update.title}</h6>
                    <p className="m-0 mb-1 text-sm text-gray-600">{update.description}</p>
                    <small className="text-xs text-gray-500">{update.time}</small>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RecentUpdatesCard

