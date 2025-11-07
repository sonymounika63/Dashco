import { useState } from 'react'
import userImage from '../../assets/images/user.png'

const ProfileHeaderCard = () => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="card profile-header">
      <div className="body">
        <div className="profile-image">
          {imageError ? (
            <div className="rounded-full w-[120px] h-[120px] bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-5xl font-bold mx-auto mb-5">
              AT
            </div>
          ) : (
            <img
              alt="Profile"
              className="rounded-circle w-[120px] h-[120px] object-cover block mx-auto mb-5"
              src={userImage}
              onError={handleImageError}
            />
          )}
        </div>
        <div className="text-center">
          <h4 className="m-b-0">
            <strong>Alizee</strong> Thomas
          </h4>
          <span className="text-[#8892a0] text-sm">Washington, d.c.</span>
        </div>
        <div className="flex gap-3 justify-center mt-[15px]">
          <button className="btn btn-primary mr-1">Follow</button>
          <button className="btn btn-outline-secondary">Message</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeaderCard

