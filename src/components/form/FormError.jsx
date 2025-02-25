import { useFormContext } from 'react-hook-form';

const FormError = ({ name }) => {
  const {
    formState: { errors },
  } = useFormContext();

  if (!name) return null;

  const fieldName =
    name.split('.').reduce((obj, key) => obj && obj[key], errors) || {};

  if (!fieldName?.message) return null;
  return <p className='text-label text-danger'>{fieldName.message}</p>;
};

export default FormError;
