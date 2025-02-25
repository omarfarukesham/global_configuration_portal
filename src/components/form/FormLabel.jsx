const FormLabel = ({ label, name, validations = {}, className }) => {
  if (!label) return null;
  return (
    <label
      className={`text-label block mb-2.5 relative ${className}`}
      htmlFor={name}
    >
      {label} {validations?.required && <span className='text-danger'>*</span>}
    </label>
  );
};

export default FormLabel;
