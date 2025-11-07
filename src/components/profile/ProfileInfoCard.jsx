import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ProfileInfoCard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleToggleDropdown = (e) => {
    e.preventDefault()
    setIsDropdownOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div className="card">
      <div className="header">
        <h2>Info</h2>
        <ul className="header-dropdown list-unstyled m-0 p-0" ref={dropdownRef}>
          <li className="dropdown relative">
            <button
              type="button"
              className="dropdown-toggle bg-transparent border-0 cursor-pointer"
              onClick={handleToggleDropdown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <i className="fa-solid fa-ellipsis-v" aria-hidden="true" />
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu dropdown-menu-right absolute right-0 mt-2 min-w-[150px] bg-white shadow-lg rounded-lg z-10 p-0 list-none">
                <li>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:no-underline" onClick={() => setIsDropdownOpen(false)}>
                    Action
                  </Link>
                </li>
                <li>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:no-underline" onClick={() => setIsDropdownOpen(false)}>
                    Another Action
                  </Link>
                </li>
                <li>
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:no-underline" onClick={() => setIsDropdownOpen(false)}>
                    Something else
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div className="body">
        <small className="text-muted">Address: </small>
        <p>795 Folsom Ave, Suite 600 San Francisco, 94107</p>
        <hr />
        <small className="text-muted">Email address: </small>
        <p>michael@gmail.com</p>
        <hr />
        <small className="text-muted">Mobile: </small>
        <p>+ 202-555-2828</p>
        <hr />
        <small className="text-muted">Birth Date: </small>
        <p className="m-b-0">October 22th, 1990</p>
        <hr />
        <small className="text-muted">Social: </small>
        <p>
          <i className="fa-brands fa-twitter m-r-5"></i> twitter.com/example
        </p>
        <p>
          <i className="fa-brands fa-facebook m-r-5"></i> facebook.com/example
        </p>
        <p>
          <i className="fa-brands fa-github m-r-5"></i> github.com/example
        </p>
        <p>
          <i className="fa-brands fa-instagram m-r-5"></i> instagram.com/example
        </p>
      </div>
    </div>
  )
}

export default ProfileInfoCard

