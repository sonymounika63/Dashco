import { useState } from 'react'
import Navbar from '../components/template/Navbar.jsx'
import Sidebar from '../components/template/Sidebar.jsx'

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

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
        {/* Dashboard content goes here */}
      </main>
      {/* Mobile content */}
      <main className="p-4 md:hidden">
        {/* Dashboard content goes here */}
      </main>
    </div>
  )
}

export default Dashboard
