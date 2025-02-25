import EditIcon from '@/assets/icons/EditIcon';
import EyeIcon from '@/assets/icons/EyeIcon';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
// import ProductPoolViewModal from './product-pool-view/ProductPoolViewModal';

const CustomizeCategoriesTableActionBtn = ({ data }) => {
  // const [isViewOpen, setIsViewOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='flex gap-3 pl-6 justify-center'>
      <Button
        variant='table-action'
        onClick={() => navigate('/admin/customize-categories/' + data.id)}
      >
        <EyeIcon className='fill-gray-8' />
      </Button>
      <Button
        variant='table-action'
        onClick={() =>
          navigate('/admin/customize-categories/' + data.id + '/edit')
        }
      >
        <EditIcon className='fill-gray-8' />
      </Button>
    </div>
  );
};

export default CustomizeCategoriesTableActionBtn;
