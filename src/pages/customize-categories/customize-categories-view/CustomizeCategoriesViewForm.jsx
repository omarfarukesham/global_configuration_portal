import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

const CustomizeCategoriesViewForm = ({ customizeCategory }) => {
  // console.log(customizeCategory);
  const navigate = useNavigate();
  return (
    <div className='w-full p-5 grid gap-5'>
      <h4 className='text-center'>View - Customize category</h4>
      <Input value={customizeCategory.name} label='Name' disabled />
      <Textarea
        value={customizeCategory.description}
        label='Description'
        disabled
      />
      <Input
        value={customizeCategory.productPoolName}
        label='Product Pool Name'
        disabled
      />

      <div>
        <p className='mb-2'>Thumbnail Image</p>
        <img src={customizeCategory.thumbnail} className='w-40 h-28' disabled />
      </div>
      <div>
        <p className='mb-2'>Icon</p>
        <img
          src={customizeCategory.icon}
          className='w-10 h-10 bg-gray-2'
          disabled
        />
      </div>

      <Input value={customizeCategory.status} label='Status' disabled />

      <div className='flex justify-center mt-5'>
        <Button
          variant='secondary'
          onClick={() => navigate('/admin/customize-categories')}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default CustomizeCategoriesViewForm;
