import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/profile.css'

const FollowersCard = ({ headerText = 'Followers' }) => {
  const [imageErrors, setImageErrors] = useState({})

  const followers = [
    { name: 'Chris Fox', role: 'Designer, Blogger', status: 'online', initial: 'C' },
    { name: 'Joge Lucky', role: 'Java Developer', status: 'online', initial: 'J' },
    { name: 'Isabella', role: 'CEO, Thememakker', status: 'offline', initial: 'I' },
    { name: 'Folisise Chosielie', role: 'Art director, Movie Cut', status: 'offline', initial: 'F' },
    { name: 'Alexander', role: 'Writter, Mag Editor', status: 'online', initial: 'A' },
  ]

  const handleImageError = (idx) => {
    setImageErrors((prev) => ({ ...prev, [idx]: true }))
  }

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
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
              </span>
            </div>
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
        </form>
        <ul className="right_chat list-unstyled">
          {followers.map((contact, idx) => (
            <li key={idx} className={contact.status}>
              <Link to="/dashboard" className="block hover:no-underline text-inherit">
                <div className="media flex items-start">
                  {imageErrors[idx] ? (
                    <div className="media-object rounded-full w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {contact.initial}
                    </div>
                  ) : (
                    <img
                      className="media-object rounded-full w-10 h-10 object-cover flex-shrink-0"
                      src={`/api/placeholder/40/40?text=${contact.initial}`}
                      alt={contact.name}
                      onError={() => handleImageError(idx)}
                    />
                  )}
                  <div className="media-body flex-1 min-w-0 ml-2.5">
                    <span className="name block text-[15px] text-[#4f5d75] m-0">{contact.name}</span>
                    <span className="message inline-block text-[13px] text-[#9ca3af]">{contact.role}</span>
                    <span
                      className={`badge badge-outline status inline-block w-[11px] h-[11px] rounded-full border-2 border-white followers-status-badge ${
                        contact.status === 'online' ? 'bg-[#22c55e]' : 'bg-[#94a3b8]'
                      }`}
                      aria-label={contact.status === 'online' ? 'Online' : 'Offline'}
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FollowersCard

