import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const FileUpload = ({
  accept,
  onChange,
  multiple = false,
  className,
  label = 'Browse',
  ...rest
}) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('No File Chosen');

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (event) => {
    const files = Array.from(event.target.files);

    if (!files?.length) {
      return;
    }

    // check if file type is correct
    let fileTypeWrong = false;
    Array.from(files).forEach((file) => {
      // console.log(files);
      if (!file.type.includes(accept.split('/')[0])) {
        fileTypeWrong = true;
      }
    });

    if (fileTypeWrong) {
      alert(`Error: Only ${accept} files are allowed.`);
    } else {
      onChange(files);
      // join file names with comma if multiple files uploaded
      let newFileName = '';
      Array.from(files).forEach((file) => (newFileName += file.name + ', '));
      setFileName(newFileName.slice(0, -2));
    }
  };

  const truncateFileName = (fileName, maxLength) => {
    if (fileName.length <= maxLength) {
      return fileName;
    }
    return `${fileName.substring(0, maxLength)}...`;
  };

  return (
    <div className='flex items-center gap-2 cursor-pointer whitespace-nowrap overflow-hidden'>
      <div
        className={twMerge(
          'border border-gray-6 px-3 py-2 min-w-fit rounded',
          className,
        )}
        onClick={handleClick}
      >
        {label}
      </div>
      <input
        id='file-input'
        type='file'
        accept={accept}
        multiple={multiple}
        className='sr-only'
        ref={fileInputRef}
        onChange={handleInputChange}
        {...rest}
      />
      <span className='text-gray-6'>{truncateFileName(fileName, 30)}</span>
    </div>
  );
};

export default FileUpload;
