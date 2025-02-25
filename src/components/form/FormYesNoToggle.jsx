import { Controller, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import Button from '../ui/Button';

const FormYesNoToggle = ({ label, name }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const Toggler = ({ field }) => (
    <div className='flex'>
      <input
        type='checkbox'
        id={name}
        className='hidden'
        defaultChecked={field.value}
        onChange={(e) => field.onChange(e.target.checked)}
      />

      <Button
        type='button'
        className={twMerge(
          'flex-1 rounded-none rounded-s-md border-gray-5',
          field.value && 'bg-success border-none text-white',
        )}
        variant='outlined'
        size='slim'
        onClick={() => field.onChange(true)}
      >
        Yes
      </Button>

      <Button
        type='button'
        className={twMerge(
          'flex-1 rounded-none rounded-e-md border-gray-5',
          !field.value && 'bg-danger border-none text-white',
        )}
        variant='outlined'
        size='slim'
        onClick={() => field.onChange(false)}
      >
        No
      </Button>
    </div>
  );

  return (
    <div>
      {label && (
        <label className='text-label block mb-2.5' htmlFor={name}>
          {label}
        </label>
      )}
      <Controller name={name} control={control} render={Toggler} />
      {/* Errors */}
      {errors[name] && (
        <p className='text-label text-danger'>{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormYesNoToggle;
