import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormTextEditor = ({
  name,
  label,
  className,
  labelClassName,
  validations,
}) => {
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
  ];

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const Editor = ({ field }) => (
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
      <input className='hidden' {...register(name)} />
      <ReactQuill
        theme='snow'
        ref={quillRef}
        value={field.value}
        onChange={field.onChange}
        modules={modules}
        formats={formats}
        className={`editor bg-white ${className}`}
      />

      {/* Errors */}
      {errors[name] && (
        <p className='text-label text-danger'>{errors[name].message}</p>
      )}
    </div>
  );
  return <Controller control={control} render={Editor} name={name} />;
};

export default FormTextEditor;
