import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../ui/Breadcrumb';
import Button from '../ui/Button';

const PageHeader = ({ title, breadcrumb, backButton = true, children }) => {
  const navigate = useNavigate();

  return (
    <div className='flex gap-3 items-center justify-between flex-wrap'>
      <div className='grid gap-2'>
        <div className='text-lg font-bold'>{title}</div>
        <Breadcrumb routes={breadcrumb} />
      </div>

      <div className='flex gap-3'>
        {backButton && (
          <Button onClick={() => navigate(-1)}>
            <ArrowLeftIcon className='ml-[-5px]' />
            Back
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
