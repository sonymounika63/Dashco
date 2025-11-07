import { useState, useEffect } from 'react'
import Navbar from '../components/template/Navbar.jsx'
import Sidebar from '../components/template/Sidebar.jsx'
import PageHeader from '../components/template/PageHeader.jsx'
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
    <div id="wrapper">
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      
      <div id="main-content">
        <div
          className="flex-1"
          onClick={() => {
            document.body.classList.remove('offcanvas-active')
          }}
        >
          <div>
            <div className="container-fluid">
              <PageHeader
                HeaderText="User Profile v2"
                Breadcrumb={[
                  { name: 'Page', navigate: '' },
                  { name: 'Profile V2', navigate: '' },
                ]}
              />

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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileV2

