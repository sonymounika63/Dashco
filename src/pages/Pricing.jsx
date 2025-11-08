import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/template/Navbar.jsx'
import Sidebar from '../components/template/Sidebar.jsx'
import PageHeader from '../components/template/PageHeader.jsx'
import PricingCard from '../components/pricing/PricingCard.jsx'

const Pricing = () => {
  // Sidebar should be open by default on desktop (xl screens >= 1280px)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth >= 1280
  })
  // Sidebar toggle state for desktop collapse/expand
  const [sidebarToggle, setSidebarToggle] = useState(false)
  // Track if we're on mobile to avoid checking window.innerWidth during render
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1280)
  const location = useLocation()

  useEffect(() => {
    // Scroll to top on mount (matching Lucid behavior)
    window.scrollTo(0, 0)
  }, [location])

  // Handle window resize to keep sidebar state in sync with screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const mobile = width < 1280
      setIsMobile(mobile)
      
      if (width >= 1280) {
        // On desktop, sidebar should always be open (but can be collapsed)
        setIsSidebarOpen(true)
      } else {
        // On mobile, close sidebar when resizing from desktop
        setIsSidebarOpen(false)
      }
    }

    // Check on mount
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lock body scroll when sidebar is open on mobile (match TailAdmin behavior)
  useEffect(() => {
    // Only lock body scroll on mobile when sidebar is open
    // On desktop, body should never be locked - content area handles scrolling
    if (isSidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      // Always restore scroll on unmount
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen, isMobile])

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleToggleSidebarCollapse = () => {
    setSidebarToggle((prev) => !prev)
  }

  const packages = [
    {
      name: 'Basic',
      price: '$99/month',
      icon: 'fa-solid fa-rocket',
      features: [
        '10 Users',
        'ISO 27001',
        '10 GB Storage Space',
        'Security Updates',
        'Email Support',
        '15-day Free Trial',
      ],
      isPopular: false,
    },
    {
      name: 'Lite',
      price: '$199/month',
      icon: 'fa-solid fa-star',
      features: [
        'Everything in Basic',
        'SOC 2 Type II',
        'GDPR Compliance',
        '50 GB Storage Space',
        'Priority Support',
        '15-day Free Trial',
      ],
      isPopular: true,
    },
    {
      name: 'Business',
      price: '$399/month',
      icon: 'fa-solid fa-briefcase',
      features: [
        'Everything in Lite',
        'Multiple Certifications',
        '25 Users',
        '100 GB Storage Space',
        'Advanced Analytics',
        'Dedicated Support',
      ],
      isPopular: false,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      icon: 'fa-solid fa-crown',
      features: [
        'Everything in Business',
        '100 Users',
        '500 GB Storage Space',
        'Custom Security Updates',
        '24/7 Premium Support',
        'Custom Integrations',
      ],
      isPopular: false,
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden dark:bg-gray-900">
      {/* ===== Sidebar Start ===== */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        sidebarToggle={sidebarToggle}
      />
      {/* ===== Sidebar End ===== */}

      {/* ===== Content Area Start ===== */}
      <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto h-full max-h-screen">
        {/* Small Device Overlay Start - Match TailAdmin mobile overlay */}
        {isSidebarOpen && window.innerWidth < 1280 && (
          <div
            className="fixed inset-0 z-[9998] h-screen w-screen bg-black/50 transition-opacity duration-300 xl:hidden"
            onClick={(e) => {
              e.stopPropagation()
              handleCloseSidebar()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleCloseSidebar()
              }
            }}
            aria-hidden="true"
            role="button"
            tabIndex={-1}
          ></div>
        )}
        {/* Small Device Overlay End */}

        {/* ===== Main Content Start ===== */}
        <main>
          {/* ===== Header Start ===== */}
          <Navbar
            onToggleSidebar={handleToggleSidebar}
            onToggleSidebarCollapse={handleToggleSidebarCollapse}
            sidebarToggle={sidebarToggle}
            isSidebarOpen={isSidebarOpen}
          />
          {/* ===== Header End ===== */}

          <div className="mx-auto max-w-screen-2xl p-4 pb-20 md:p-6 md:pb-6">
            <PageHeader
              HeaderText="Pricing"
              Breadcrumb={[
                { name: 'Page', navigate: '' },
                { name: 'Pricing', navigate: '' },
              ]}
            />
              
            <div className="row clearfix">
              {packages.map((pkg, index) => (
                <PricingCard
                  key={index}
                  name={pkg.name}
                  price={pkg.price}
                  features={pkg.features}
                  isPopular={pkg.isPopular}
                  icon={pkg.icon}
                />
              ))}
            </div>
          </div>
        </main>
        {/* ===== Main Content End ===== */}
      </div>
      {/* ===== Content Area End ===== */}
    </div>
  )
}

export default Pricing

