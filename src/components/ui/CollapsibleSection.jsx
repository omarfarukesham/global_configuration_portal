import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const CollapsibleSection = ({
  icon: Icon,
  title,
  isRequired = false,
  open = true,
  isCollapsible = true,
  id,
  headChildren,
  children,
  className,
  contentClassName,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const toggleSection = () => {
    if (isCollapsible) setIsOpen(!isOpen);
  };

  return (
    <div id={id} className={className}>
      {/* Title Area */}
      <div
        className='flex items-center gap-5 py-3 border-b border-gray-4 cursor-pointer'
        onClick={toggleSection}
      >
        <div className='flex-1 text-base-1 font-bold flex items-center gap-3'>
          {Icon && <Icon />}
          {title}
          {isRequired && (
            <span className='text-xs rounded-full bg-danger text-white px-2 py-1'>
              Required
            </span>
          )}
        </div>

        {headChildren}

        {isCollapsible && (
          <ArrowDownIcon
            className={`transition ${isOpen ? '' : 'rotate-180'}`}
          />
        )}
      </div>

      {/* Content Area */}
      <div className={twMerge('py-6', !isOpen && 'sr-only', contentClassName)}>
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSection;
