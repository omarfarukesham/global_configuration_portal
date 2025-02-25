const FormSelectOptions = ({ options, onOptionChange = () => null }) => {
  const handleOptionSelect = (option) => {
    onOptionChange(option);
  };

  return (
    <ul
      className={
        'absolute z-20 left-0 bg-white rounded shadow min-w-[10rem] overflow-hidden'
      }
    >
      {options.map((option) => (
        <li
          key={option.value}
          className={
            'cursor-pointer hover:bg-bg-color p-2 text-label flex items-center gap-2'
          }
          onClick={() => handleOptionSelect(option)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default FormSelectOptions;
