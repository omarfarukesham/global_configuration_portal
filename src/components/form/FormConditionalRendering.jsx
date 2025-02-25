import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const FormConditionalRendering = ({ children, fieldName }) => {
  const [fieldValue, setFieldValue] = useState(null);
  const { getValues } = useFormContext();

  const watchValue = useWatch({ name: fieldName });

  useEffect(() => {
    setFieldValue(getValues(fieldName));
  }, [fieldName, getValues, watchValue]);

  if (fieldValue) return <>{children(fieldValue)}</>;
  return null;
};

export default FormConditionalRendering;
