const RecentUpdatesCard = () => {
  const updates = [
    {
      id: 'update-1',
      icon: 'fa-solid fa-building',
      iconColor: 'text-primary dark:text-blue-400',
      title: 'New Company Onboarded',
      description: 'TechCorp Inc. has been successfully onboarded',
      time: '2 hours ago',
    },
    {
      id: 'update-2',
      icon: 'fa-solid fa-file-invoice',
      iconColor: 'text-success dark:text-green-400',
      title: 'Invoice Generated',
      description: 'Invoice #INV-2024-001 has been generated',
      time: '5 hours ago',
    },
    {
      id: 'update-3',
      icon: 'fa-solid fa-user-plus',
      iconColor: 'text-info dark:text-cyan-400',
      title: 'New User Added',
      description: 'John Doe has been added to Company ABC',
      time: '1 day ago',
    },
    {
      id: 'update-4',
      icon: 'fa-solid fa-certificate',
      iconColor: 'text-warning dark:text-yellow-400',
      title: 'Certificate Updated',
      description: 'ISO 27001:2022 certificate has been updated',
      time: '2 days ago',
    },
  ]

  return (
    <div className="col-lg-6 col-md-12">
      <div className="card dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
        <div className="header">
          <h2 className="dark:text-white/90 transition-colors duration-200">Recent Updates</h2>
        </div>
        <div className="body">
          <ul className="list-unstyled">
            {updates.map((update) => (
              <li key={update.id} className="mb-3 pb-3 border-bottom dark:border-gray-700 transition-colors duration-200">
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0 me-3">
                    <i className={`${update.icon} ${update.iconColor} fa-2x transition-colors duration-200`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="m-b-0 dark:text-white/90 transition-colors duration-200">{update.title}</h6>
                    <p className="m-b-0 text-muted dark:text-gray-400 transition-colors duration-200">{update.description}</p>
                    <small className="text-muted dark:text-gray-500 transition-colors duration-200">{update.time}</small>
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

