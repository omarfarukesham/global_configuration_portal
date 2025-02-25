import useOutsideClick from '@/hooks/useClickOutside';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormError from '../FormError';
import FormLabel from '../FormLabel';
import FormSelectOptions from './FormSelectOptions';
import FormSelectSelected from './FormSelectSelected';

const FormSelect = ({
  label,
  name,
  options = [],
  defaultOption,
  onChange = () => null,
  validations = {},
  shouldUnregisterOnUnmount,
  placeholder = 'Select Option',
}) => {
  const { register, unregister, getValues, setValue } = useFormContext();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(() => {
    const value = getValues(name);
    const defaultValue = options.find((option) => option.value === value);
    return defaultValue || defaultOption;
  });

  const onOptionChange = (option) => {
    onChange(option);
    setSelectedOption(option);
    setShowOptions(false);
    setValue(name, option.value);
  };

  useEffect(() => {
    return () => shouldUnregisterOnUnmount && unregister(name);
  }, [name, shouldUnregisterOnUnmount, unregister]);

  const selectRef = useOutsideClick(() => setShowOptions(false));
  return (
    <div className='relative' ref={selectRef}>
      <FormLabel validations={validations} label={label} />
      <input className='hidden' {...register(name, validations)} />
      <FormSelectSelected
        selectedOption={selectedOption}
        showOptions={showOptions}
        placeholder={placeholder}
        onClick={() => setShowOptions(!showOptions)}
      />
      {showOptions && (
        <FormSelectOptions options={options} onOptionChange={onOptionChange} />
      )}
      <FormError name={name} />
    </div>
  );
};

export default FormSelect;
