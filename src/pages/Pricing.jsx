import { useState, useEffect } from 'react'
import Navbar from '../components/template/Navbar.jsx'
import Sidebar from '../components/template/Sidebar.jsx'
import PageHeader from '../components/template/PageHeader.jsx'
import PricingCard from '../components/pricing/PricingCard.jsx'

const Pricing = () => {
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing

