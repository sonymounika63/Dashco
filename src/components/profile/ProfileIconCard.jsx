const ProfileIconCard = () => {
  const stats = [
    { icon: 'fa-camera', value: '2365', label: 'Shots View' },
    { icon: 'fa-thumbs-up', value: '1203', label: 'Likes' },
    { icon: 'fa-comments', value: '324', label: 'Comments' },
    { icon: 'fa-user', value: '1980', label: 'Profile Views' },
    { icon: 'fa-desktop', value: '251', label: 'Website View' },
    { icon: 'fa-file-text', value: '52', label: 'Attachment', iconColor: 'text-warning' },
  ]

  return (
    <div className="card">
      <ul className="row profile_state list-unstyled" style={{ margin: 0, padding: 0 }}>
        {stats.map((stat, idx) => (
          <li key={idx} className="col-lg-6 col-6" style={{ listStyle: 'none' }}>
            <div className="body" style={{ textAlign: 'center', padding: '20px' }}>
              <i className={`fa ${stat.icon} ${stat.iconColor || ''}`} style={{ fontSize: '24px', color: '#5b7dfa', marginBottom: '10px', display: 'block' }}></i>
              <h5 className="m-b-0" style={{ fontSize: '20px', fontWeight: 600, marginBottom: '5px' }}>
                {stat.value}
              </h5>
              <small style={{ color: '#8892a0', fontSize: '13px' }}>{stat.label}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProfileIconCard

