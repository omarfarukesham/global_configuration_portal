import PlusIcon from '@/assets/icons/PlusIcon';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductShelfCreateModal from './product-shelf-create/ProductShelfCreateModal';

const ProductShelvesHeader = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <PageHeader title='Product Shelves'>
      <Button onClick={() => navigate('/admin/product-shelf/add-shelves')}>
        <PlusIcon className='w-5 h-5 ml-[-5px]' />
        Add New
      </Button>
      {/* <Button onClick={() => setIsAddOpen(true)}>
        <PlusIcon className='w-5 h-5 ml-[-5px]' />
        Add New
      </Button> */}
      {isAddOpen && (
        <ProductShelfCreateModal isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
      )}
    </PageHeader>
  );
};

export default ProductShelvesHeader;
