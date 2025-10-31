const FollowersCard = ({ headerText = 'Followers' }) => {
  const followers = [
    { name: 'Chris Fox', role: 'Designer, Blogger', status: 'online', img: '/api/placeholder/40/40' },
    { name: 'Joge Lucky', role: 'Java Developer', status: 'online', img: '/api/placeholder/40/40' },
    { name: 'Isabella', role: 'CEO, Thememakker', status: 'offline', img: '/api/placeholder/40/40' },
    { name: 'Folisise Chosielie', role: 'Art director, Movie Cut', status: 'offline', img: '/api/placeholder/40/40' },
    { name: 'Alexander', role: 'Writter, Mag Editor', status: 'online', img: '/api/placeholder/40/40' },
  ]

  return (
    <div className="card">
      <div className="header">
        <h2>{headerText}</h2>
      </div>
      <div className="body">
        <form>
          <div className="input-group m-b-20">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="icon-magnifier"></i>
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
        </form>
        <ul className="right_chat list-unstyled">
          {followers.map((contact, idx) => (
            <li key={idx} className={contact.status}>
              <a href="/dashboard" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="media">
                  <img
                    className="media-object"
                    src={contact.img}
                    alt={contact.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const fallback = document.createElement('div')
                      fallback.style.cssText = 'width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:flex;align-items:center;justify-content:center;color:white;font-size:14px;font-weight:bold'
                      fallback.textContent = contact.name.charAt(0)
                      e.target.parentNode.insertBefore(fallback, e.target)
                    }}
                  />
                  <div className="media-body">
                    <span className="name">{contact.name}</span>
                    <span className="message">{contact.role}</span>
                    <span
                      className={`badge badge-outline status`}
                      style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: contact.status === 'online' ? '#22c55e' : '#94a3b8',
                        marginTop: '4px',
                      }}
                    ></span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FollowersCard

