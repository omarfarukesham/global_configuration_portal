import PlusIcon from '@/assets/icons/PlusIcon';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

const CustomizeCategoriesHeader = () => {
  const navigate = useNavigate();
  return (
    <PageHeader title='Customize Category'>
      <Button onClick={() => navigate('/admin/customize-categories/add')}>
        <PlusIcon className='w-5 h-5 ml-[-5px]' />
        Add New
      </Button>
    </PageHeader>
  );
};

export default CustomizeCategoriesHeader;
