/**
 * A reusable component to upload files by drag and drop
 *
 * @author Fahim
 * @createdAt 2023-06-15
 */

import DescriptionIcon from '@/assets/icons/DescriptionIcon';
import ImageIcon from '@/assets/icons/ImageIcon';
import SpecificationIcon from '@/assets/icons/SpecificationIcon';
import useDragNDrop from '@/hooks/useDragNDrop';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

const isFileTypeValid = (fileType, uploadedType) => {
  if (fileType === 'image') {
    return /^image\/.+/.test(uploadedType);
  } else if (fileType === 'pdf') {
    return /^application\/pdf/.test(uploadedType);
  } else if (fileType === 'excel') {
    return /^(text\/csv|application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet|application\/vnd.ms-excel)$/.test(
      uploadedType,
    );
  }

  return false;
};

/**
 *
 * @param {string} type = 'image' | 'pdf' | 'excel'. excel is for both excel and csv
 * @returns {File[]} uploaded files
 */
const FileUploadByDrag = ({
  onChange,
  type = 'image',
  multiple,
  className,
  placeholder,
  noDefaultPlaceholder,
}) => {
  const types = {
    image: {
      accept: 'image/*',
      icon: ImageIcon,
      placeholder: placeholder ? placeholder : `Drag and Drop Image(s) Here`,
    },
    excel: {
      accept: '.xlsx, .xls, .csv',
      icon: SpecificationIcon,
      placeholder: placeholder ? placeholder : `Drag and Drop Excel/CSV here`,
    },
    pdf: {
      accept: '.pdf',
      icon: DescriptionIcon,
      placeholder: placeholder ? placeholder : `Drag and Drop PDF here`,
    },
  };

  const selectedType = types[type];

  const fileInputRef = useRef(null);

  const onDrop = (files) => {
    if (!files?.length) {
      return;
    }

    let fileTypeWrong = false;
    files.forEach((file) => {
      if (!isFileTypeValid(type, file.type)) {
        fileTypeWrong = true;
      }
    });

    if (fileTypeWrong) {
      alert(`Error: Only ${selectedType.accept} files are allowed.`);
    } else {
      onChange(files);
    }
  };

  const { areaRef, isDragging } = useDragNDrop(onDrop);

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    onDrop(files);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  if (!selectedType) {
    return <p className='text-danger'>Invalid file type selected</p>;
  }

  return (
    <div
      className={twMerge(
        'h-52 w-96 shrink-0 grow-0',
        isDragging && 'scale-125 transition-transform',
        className,
      )}
      ref={areaRef}
    >
      <div
        id='test'
        className='border-2 border-dashed border-gray-4 bg-gray-2 rounded-lg h-full w-full flex flex-col gap-6 items-center justify-center'
        onClick={handleClick}
      >
        <selectedType.icon className='w-10 h-10 fill-gray-5 pointer-events-none' />

        {!noDefaultPlaceholder && (
          <p className='text-gray-6 text-lg pointer-events-none'>
            {selectedType.placeholder}
          </p>
        )}
      </div>
      <input
        id='file-input'
        type='file'
        accept={selectedType.accept}
        multiple={multiple}
        className='hidden'
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default FileUploadByDrag;
