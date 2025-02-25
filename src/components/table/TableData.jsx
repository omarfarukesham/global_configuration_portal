const TableData = ({ children, className = '', ...props }) => {
  return (
    <td className={`p-3 whitespace-normal ${className}`} {...props}>
      {children}
    </td>
  );
};

export default TableData;
