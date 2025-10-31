import { cn } from '../../lib/utils'

const Checkbox = ({
  id,
  name,
  label,
  description,
  className,
  containerClassName,
  ...props
}) => {
  const checkboxId = id ?? name

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        'group flex cursor-pointer items-start space-x-3 text-sm text-slate-700',
        containerClassName,
      )}
    >
      <span className="relative flex h-5 w-5 flex-none items-center justify-center">
        <input
          id={checkboxId}
          name={name}
          type="checkbox"
          className={cn(
            'peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-colors duration-200 checked:border-transparent checked:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            className,
          )}
          {...props}
        />
        <svg
          className="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.704 5.293a1 1 0 0 0-1.408-1.42l-6.285 6.231-2.299-2.28a1 1 0 1 0-1.408 1.42l3.003 2.977a1 1 0 0 0 1.408 0l7.989-7.928Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="leading-relaxed">
        <span className="font-medium text-slate-900">{label}</span>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </span>
    </label>
  )
}

export default Checkbox
