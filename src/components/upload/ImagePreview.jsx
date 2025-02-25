import CrossIcon from '@/assets/icons/CrossIcon';
import { twMerge } from 'tailwind-merge';

const ImagePreview = ({
  url,
  file,
  image = {},
  variant = 'large',
  onRemove,
  onSet,
  className,
  label,
  labelClassName,
  index,
  ...props
}) => {
  const imageURL = file ? URL.createObjectURL(file) : url;
  const altText = file?.name || image?.title;

  return (
    <div>
      {label && (
        <label
          className={`text-label block mb-2.5 relative ${labelClassName}`}
          htmlFor={label + '_preview'}
        >
          {label}
        </label>
      )}
      <div
        className={twMerge(
          'relative shrink-0 grow-0 border-2 border-dashed border-gray-4 bg-gray-2 rounded-lg flex items-center justify-center',
          variant === 'small' && 'h-28 w-48',
          variant === 'large' && 'h-52 w-96',
          className,
        )}
        id={label + '_preview'}
      >
        {image ? (
          <>
            {onSet && (
              <div className='group'>
                <button
                  type='button'
                  className='absolute top-1 left-1 rounded-full p-2 h-6 w-6 border border-gray-6 hover:bg-gray-6'
                  onClick={() => onSet(index)}
                ></button>
                <div className='absolute top-1 left-8 z-10 bg-secondary text-primary py-1 px-2 rounded text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200'>
                  Show as main image?
                </div>
              </div>
            )}
            {onRemove && (
              <button
                type='button'
                className='absolute top-1 right-1 bg-gray-5 rounded-full p-2 h-6 w-6'
                onClick={() => onRemove(index)}
              >
                <CrossIcon className='fill-white h-full w-full' />
              </button>
            )}
            <img
              src={imageURL}
              alt={altText}
              className={twMerge(
                'max-w-full max-h-full object-scale-down',
                className,
              )}
              {...props}
            />
          </>
        ) : (
          <p className='text-base-2 text-gray-7'>Main Image Preview</p>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
