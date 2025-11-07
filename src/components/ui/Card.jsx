import { cn } from '../../assets/js/utils'

export const Card = ({ className, children, ...props }) => (
  <div
    className={cn('rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60', className)}
    {...props}
  >
    {children}
  </div>
)

export const CardHeader = ({ className, align = 'left', children, ...props }) => (
  <div
    className={cn(
      'space-y-2 p-8 pb-0',
      align === 'center' ? 'text-center' : 'text-left',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

export const CardTitle = ({ className, children, ...props }) => (
  <h2 className={cn('text-2xl font-semibold text-slate-900', className)} {...props}>
    {children}
  </h2>
)

export const CardDescription = ({ className, children, ...props }) => (
  <p className={cn('text-sm text-slate-500', className)} {...props}>
    {children}
  </p>
)

export const CardContent = ({ className, children, ...props }) => (
  <div className={cn('p-8 pt-6', className)} {...props}>
    {children}
  </div>
)

export const CardFooter = ({ className, children, ...props }) => (
  <div className={cn('p-8 pt-0', className)} {...props}>
    {children}
  </div>
)

export default Card
