const ProfileIconCard = () => {
  const stats = [
    { icon: 'fa-solid fa-camera', value: '2365', label: 'Shots View' },
    { icon: 'fa-regular fa-thumbs-up', value: '1203', label: 'Likes' },
    { icon: 'fa-regular fa-comments', value: '324', label: 'Comments' },
    { icon: 'fa-solid fa-user', value: '1980', label: 'Profile Views' },
    { icon: 'fa-solid fa-desktop', value: '251', label: 'Website View' },
    { icon: 'fa-regular fa-file-lines text-warning', value: '52', label: 'Attachment' },
  ]

  return (
    <div className="card">
      <ul className="row profile_state list-unstyled">
        {stats.map((stat, idx) => (
          <li key={idx} className="col-lg-6 col-6">
            <div className="body">
              <i className={stat.icon}></i>
              <h5 className="m-b-0 number count-to" data-from="0" data-to={stat.value} data-speed="1000" data-fresh-interval="700">
                {stat.value}
              </h5>
              <small>{stat.label}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProfileIconCard

