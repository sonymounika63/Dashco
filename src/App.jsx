import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProfileV2 from './pages/ProfileV2.jsx'
import Pricing from './pages/Pricing.jsx'
import DarkModeToggle from './components/ui/DarkModeToggle.jsx'

function App() {
  return (
    <div id="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profilev2page" element={<ProfileV2 />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
        <DarkModeToggle />
      </Router>
    </div>
  )
}

export default App
