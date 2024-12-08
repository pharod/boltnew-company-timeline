import { clsx } from 'clsx';
import { Plus } from 'lucide-react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  icon?: boolean;
};

const Button = ({ 
  children, 
  variant = 'primary', 
  icon = false,
  className,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center px-4 py-2 rounded-full font-medium transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-100 text-gray-700 hover:bg-gray-200': variant === 'secondary',
        },
        icon && 'gap-2',
        className
      )}
      {...props}
    >
      {icon && <Plus className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default Button;