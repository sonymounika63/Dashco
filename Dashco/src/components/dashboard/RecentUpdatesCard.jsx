const RecentUpdatesCard = () => {
  const updates = [
    {
      id: 'update-1',
      icon: 'fa-solid fa-building',
      iconColor: 'text-primary dark:text-blue-400',
      title: 'New Company Onboarded',
      description: 'SecureTech Solutions has been successfully onboarded with Business package',
      time: '2 hours ago',
    },
    {
      id: 'update-2',
      icon: 'fa-solid fa-file-invoice',
      iconColor: 'text-success dark:text-green-400',
      title: 'Invoice Generated',
      description: 'Invoice #INV-2024-087 for DataSecure Ltd. (Enterprise package) - $15,000',
      time: '5 hours ago',
    },
    {
      id: 'update-3',
      icon: 'fa-solid fa-certificate',
      iconColor: 'text-info dark:text-cyan-400',
      title: 'Certificate Assigned',
      description: 'ISO 27001:2022 and SOC 2 Type II assigned to CloudServices Co.',
      time: '8 hours ago',
    },
    {
      id: 'update-4',
      icon: 'fa-solid fa-user-plus',
      iconColor: 'text-warning dark:text-yellow-400',
      title: 'Sub-Admin Created',
      description: 'New sub-admin user created with delegated access for Finance module',
      time: '1 day ago',
    },
    {
      id: 'update-5',
      icon: 'fa-solid fa-box',
      iconColor: 'text-success dark:text-green-400',
      title: 'Package Upgraded',
      description: 'TechCorp Inc. upgraded from Lite to Business package',
      time: '1 day ago',
    },
    {
      id: 'update-6',
      icon: 'fa-solid fa-folder-open',
      iconColor: 'text-info dark:text-cyan-400',
      title: 'Repository Item Added',
      description: 'New compliance template added to repository: GDPR Data Protection Checklist',
      time: '2 days ago',
    },
  ]

  return (
    <div className="card bg-white dark:bg-white/[0.03] border-0 dark:border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm transition-colors duration-200">
        <div className="header p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-gray-900 dark:text-white/90 text-xl font-semibold transition-colors duration-200 m-0">Recent Updates</h2>
        </div>
        <div className="body p-5">
          <ul className="list-none m-0 p-0">
            {updates.map((update) => (
              <li key={update.id} className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0 last:mb-0 last:pb-0 transition-colors duration-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <i className={`${update.icon} ${update.iconColor === 'text-primary' ? 'text-blue-500 dark:text-blue-400' : update.iconColor === 'text-success' ? 'text-green-500 dark:text-green-400' : update.iconColor === 'text-info' ? 'text-cyan-500 dark:text-cyan-400' : update.iconColor === 'text-warning' ? 'text-yellow-500 dark:text-yellow-400' : update.iconColor} text-2xl transition-colors duration-200`}></i>
                  </div>
                  <div className="flex-1">
                    <h6 className="m-0 text-gray-900 dark:text-white/90 font-semibold mb-1 transition-colors duration-200">{update.title}</h6>
                    <p className="m-0 text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-200">{update.description}</p>
                    <small className="text-gray-500 dark:text-gray-400 transition-colors duration-200">{update.time}</small>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
  )
}

export default RecentUpdatesCard

