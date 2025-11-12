import { cn } from '../../assets/js/utils'

const variants = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 disabled:bg-blue-300',
  secondary:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-400 disabled:bg-slate-100 disabled:text-slate-400',
  outline:
    'border border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400 disabled:text-slate-300',
  ghost:
    'text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-200 disabled:text-blue-300',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-12 px-6 text-base',
}

const Button = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  isLoading = false,
  icon,
  fullWidth = true,
  ...props
}) => {
  const variantClass = variants[variant] ?? variants.primary
  const sizeClass = sizes[size] ?? sizes.md

  const content = (
    <>
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      <span className="truncate">{children}</span>
    </>
  )

  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80',
        fullWidth ? 'w-full' : 'w-auto',
        variantClass,
        sizeClass,
        className,
      )}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className="flex items-center">Loading...</span> : content}
    </button>
  )
}

export default Button
