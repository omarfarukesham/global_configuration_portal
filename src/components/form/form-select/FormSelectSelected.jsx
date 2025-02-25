import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import ArrowUpIcon from '@/assets/icons/ArrowUpIcon';

const FormSelectSelected = ({
  selectedOption,
  placeholder,
  showOptions,
  ...restProps
}) => {
  return (
    <button
      type='button'
      className='flex items-center gap-2 text-left text-label text-gray'
      {...restProps}
    >
      {selectedOption?.label || placeholder}{' '}
      {showOptions ? <ArrowUpIcon /> : <ArrowDownIcon />}
    </button>
  );
};

export default FormSelectSelected;
