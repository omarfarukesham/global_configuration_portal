const PageError = ({ message, className }) => {
  return (
    <div
      className={`h-full flex justify-center items-center text-danger ${className}`}
    >
      {message}
    </div>
  );
};

export default PageError;
