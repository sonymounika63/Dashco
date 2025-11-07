import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Checkbox from '../components/ui/Checkbox'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Add your login logic here
    // Login attempt: { ...formData, rememberMe }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F2F7FF] via-[#DCEBFF] to-[#AFCBED] p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-[#88BDF2] p-[1px] shadow-lg shadow-slate-900/10">
        <div className="rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] border border-[#88BDF2] bg-white/95 p-6 sm:p-8">
          <div className="space-y-2 pb-4 sm:pb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#384959]">Dashco</h1>
            <p className="text-xs sm:text-sm text-[#6A89A7]">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <Input id="email" name="email" type="email" label="Email Address" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />

            <Input id="password" name="password" type="password" label="Password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <Checkbox id="remember-me" name="rememberMe" label="Remember me" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
              <a href="#" className="text-xs sm:text-sm font-medium text-blue-600 transition-colors hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full">Sign In</Button>
          </form>

          <div className="pt-4 sm:pt-6 space-y-2 sm:space-y-3 text-center text-xs sm:text-sm text-slate-600">
            <p>
              Don't have an account?{' '}
              <a href="#" className="font-medium text-blue-600 transition-colors hover:text-blue-500">
                Sign up
              </a>
            </p>
            <p>
              Ready to continue?{' '}
              <Link to="/dashboard" className="font-medium text-blue-600 transition-colors hover:text-blue-500">
                Go to dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
