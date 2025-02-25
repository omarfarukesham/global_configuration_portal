import PlusIcon from '@/assets/icons/PlusIcon';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
// import ProductPoolCreateModal from './product-pool-create/ProductPoolCreateModal';

const ProductPoolsHeader = () => {
  // const [isAddOpen, setIsAddOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <PageHeader title='Product Pools'>
      {/* <Button onClick={() => setIsAddOpen(true)}> */}
      <Button onClick={() => navigate('/admin/product-pools/add-pools')}>
        <PlusIcon className='w-5 h-5 ml-[-5px]' />
        Add New
      </Button>
      {/* {isAddOpen && (
        <ProductPoolCreateModal isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
      )} */}
    </PageHeader>
  );
};

export default ProductPoolsHeader;
