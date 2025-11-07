import '../../assets/css/profile.css'

const ProfileIconCard = () => {
  const stats = [
    { icon: 'fa-solid fa-camera', value: '2365', label: 'Shots View' },
    { icon: 'fa-regular fa-thumbs-up', value: '1203', label: 'Likes' },
    { icon: 'fa-regular fa-comments', value: '324', label: 'Comments' },
    { icon: 'fa-solid fa-user', value: '1980', label: 'Profile Views' },
    { icon: 'fa-solid fa-desktop', value: '251', label: 'Website View' },
    { icon: 'fa-regular fa-file-lines', value: '52', label: 'Attachment', iconColor: 'text-warning' },
  ]

  return (
    <div className="card">
      <ul className="row profile_state list-unstyled profile-icon-card-list">
        {stats.map((stat, idx) => (
          <li key={idx} className="col-lg-6 col-6 profile-icon-card-item">
            <div className="body profile-icon-card-body">
              <i className={`${stat.icon} ${stat.iconColor || ''} profile-icon-card-icon`}></i>
              <h5 className="m-b-0 profile-icon-card-value">
                {stat.value}
              </h5>
              <small className="profile-icon-card-label">{stat.label}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProfileIconCard

