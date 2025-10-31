import { useState, useEffect } from 'react'
import Navbar from '../components/template/Navbar.jsx'
import Sidebar from '../components/template/Sidebar.jsx'
import ProfileHeaderCard from '../components/profile/ProfileHeaderCard'
import ProfileInfoCard from '../components/profile/ProfileInfoCard'
import FollowersCard from '../components/profile/FollowersCard'
import ProfileV2Tabs from '../components/profile/ProfileV2Tabs'
import ProfileIconCard from '../components/profile/ProfileIconCard'
import ProfileSliderCard from '../components/profile/ProfileSliderCard'

const ProfileV2 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  const profileSliderData = [
    {
      color: 'blue',
      headerText: 'Visits',
      subTitle: 'This Month',
      data: [
        { label: 'Week 1', value: 45 },
        { label: 'Week 2', value: 52 },
        { label: 'Week 3', value: 48 },
        { label: 'Week 4', value: 61 },
      ],
    },
    {
      color: 'green',
      headerText: 'Revenue',
      subTitle: 'This Month',
      data: [
        { label: 'Week 1', value: 210 },
        { label: 'Week 2', value: 180 },
        { label: 'Week 3', value: 200 },
        { label: 'Week 4', value: 240 },
      ],
    },
  ]

  return (
    <div className="min-h-screen" style={{ paddingTop: '73px', paddingLeft: '0' }}>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[8] md:hidden"
          onClick={handleCloseSidebar}
          aria-hidden="true"
        />
      )}
      {/* Main content area */}
      <main style={{ marginLeft: '265px', padding: '24px 32px' }} className="md:block hidden">
        <div className="container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <h3>User Profile v2</h3>
            <nav>
              <ol className="breadcrumb">
                <li>Page</li>
                <li>Profile V2</li>
              </ol>
            </nav>
          </div>

          <div className="row clearfix">
            <div className="col-lg-4 col-md-12">
              <ProfileHeaderCard />
              <ProfileInfoCard />
              <FollowersCard headerText="Who to follow" />
            </div>
            <div className="col-lg-5 col-md-12">
              <ProfileV2Tabs />
            </div>
            <div className="col-lg-3 col-md-12">
              <ProfileIconCard />
              {profileSliderData.map((data, i) => (
                <ProfileSliderCard
                  key={i}
                  color={data.color}
                  data={data.data}
                  headerText={data.headerText}
                  subTitle={data.subTitle}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* Mobile content */}
      <main className="p-4 md:hidden">
        <div className="container-fluid">
          <div className="page-header">
            <h3>User Profile v2</h3>
            <nav>
              <ol className="breadcrumb">
                <li>Page</li>
                <li>Profile V2</li>
              </ol>
            </nav>
          </div>

          <div className="row clearfix">
            <div className="col-lg-4 col-md-12">
              <ProfileHeaderCard />
              <ProfileInfoCard />
              <FollowersCard headerText="Who to follow" />
            </div>
            <div className="col-lg-5 col-md-12">
              <ProfileV2Tabs />
            </div>
            <div className="col-lg-3 col-md-12">
              <ProfileIconCard />
              {profileSliderData.map((data, i) => (
                <ProfileSliderCard
                  key={i}
                  color={data.color}
                  data={data.data}
                  headerText={data.headerText}
                  subTitle={data.subTitle}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProfileV2

