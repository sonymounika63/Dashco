const ProfileHeaderCard = () => {
  return (
    <div className="card profile-header">
      <div className="body">
        <div className="profile-image">
          <img
            alt="Profile"
            className="rounded-circle"
            src="/static/media/user.ce8ac6aa15a5c0276fee.png"
            onError={(e) => {
              e.target.style.display = 'none'
              const fallback = document.createElement('div')
              fallback.style.cssText = 'width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:flex;align-items:center;justify-content:center;color:white;font-size:48px;font-weight:bold;margin:0 auto 20px'
              fallback.textContent = 'AT'
              e.target.parentNode.insertBefore(fallback, e.target)
            }}
            style={{ width: '120px', height: '120px', objectFit: 'cover', display: 'block', margin: '0 auto 20px' }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h4 className="m-b-0">
            <strong>Alizee</strong> Thomas
          </h4>
          <span style={{ color: '#8892a0', fontSize: '14px' }}>Washington, d.c.</span>
        </div>
        <div className="m-t-15" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '15px' }}>
          <button className="btn btn-primary">Follow</button>
          <button className="btn btn-default">Message</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeaderCard

