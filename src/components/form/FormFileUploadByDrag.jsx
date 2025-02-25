import { useFormContext } from 'react-hook-form';
import FileUploadByDrag from '../upload/FileUploadByDrag';

const FormFileUploadByDrag = ({
  name,
  label,
  type,
  onChange = () => null,
  setFormattedValue,
  multiple,
  validations,
  className,
  labelClassName,
  placeholder,
  noDefaultPlaceholder,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleFileChange = (selectedFiles) => {
    let fileToSetOnForm;

    if (setFormattedValue) {
      fileToSetOnForm = setFormattedValue(selectedFiles);
    } else if (!multiple) {
      fileToSetOnForm = selectedFiles?.[0];
    } else {
      fileToSetOnForm = selectedFiles;
    }

    setValue(name, fileToSetOnForm);
    onChange(fileToSetOnForm);
  };

  return (
    <div>
      {label && (
        <label
          className={`text-label block mb-2.5 relative ${labelClassName}`}
          htmlFor={name}
        >
          {label}{' '}
          {validations?.required && <span className='text-danger'>*</span>}
        </label>
      )}
      <input
        type='file'
        id={name}
        className='hidden'
        {...register(name)}
        onChange={handleFileChange}
      />
      <FileUploadByDrag
        type={type}
        multiple={multiple}
        onChange={handleFileChange}
        className={className}
        noDefaultPlaceholder={noDefaultPlaceholder}
        placeholder={placeholder}
      />
      {/* Errors */}
      {errors[name] && (
        <p className='text-label text-danger'>{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormFileUploadByDrag;
