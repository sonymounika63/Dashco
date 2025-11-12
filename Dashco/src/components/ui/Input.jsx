import { forwardRef } from 'react'
import { cn } from '../../assets/js/utils'

const Input = forwardRef(
  (
    {
      id,
      name,
      label,
      type = 'text',
      className,
      helperText,
      error,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? name

    return (
      <div className={cn('space-y-2', wrapperClassName)}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          ref={ref}
          className={cn(
            'w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500',
            error && 'border-red-500 focus:ring-red-500',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {(helperText || error) && (
          <p
            id={error ? `${inputId}-error` : `${inputId}-helper`}
            className={cn('text-sm', error ? 'text-red-600' : 'text-slate-500')}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
