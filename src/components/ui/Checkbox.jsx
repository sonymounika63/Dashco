import { cn } from "../../assets/js/utils";
import { useState, useEffect } from "react";

const Checkbox = ({
  id,
  name,
  label,
  description,
  className,
  containerClassName,
  checked,
  onChange,
  ...props
}) => {
  const checkboxId = id ?? name;
  const [isChecked, setIsChecked] = useState(checked || false);

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = (e) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(e);
    }
  };

  const currentChecked = checked !== undefined ? checked : isChecked;

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        "group flex cursor-pointer items-center space-x-3 text-sm text-[#667085] dark:text-gray-400",
        containerClassName
      )}
    >
      <span className="relative flex h-5 w-5 flex-none items-center justify-center">
        <input
          id={checkboxId}
          name={name}
          type="checkbox"
          checked={currentChecked}
          onChange={handleChange}
          className={cn(
            "h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 dark:border-gray-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            currentChecked ? "border-transparent bg-blue-600" : "",
            className
          )}
          {...props}
        />
        <svg
          className={cn(
            "pointer-events-none absolute h-3 w-3 text-white transition-opacity duration-200",
            currentChecked ? "opacity-100" : "opacity-0"
          )}
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
      <span className="flex items-center h-5 leading-5">
        <span className="font-medium">{label}</span>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </span>
    </label>
  );
};

export default Checkbox;
