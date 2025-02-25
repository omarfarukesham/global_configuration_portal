import FormSwitch from '@/components/form/FormSwitch';
// eslint-disable-next-line import/named
import { useGetGlobalConfigs2 } from '@/services/global-config/globalConfigHomePageService';

const DynamicForm = () => {
  const { data } = useGetGlobalConfigs2();
  const renderFormElements = (section, parentKey = '') => {
    return Object.keys(section).map((key) => {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof section[key] === 'object') {
        return (
          <div key={currentKey} className='ml-5'>
            <p>
              {key}
              <FormSwitch name={`on${currentKey}`}></FormSwitch>
            </p>
            {renderFormElements(section[key], currentKey)}
          </div>
        );
      } else {
        return (
          <div key={currentKey} className='ml-5'>
            <p>
              {key}
              <FormSwitch name={`on${currentKey}`}></FormSwitch>
            </p>
          </div>
        );
      }
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>{renderFormElements(data)}</form>
  );
};

export default DynamicForm;
