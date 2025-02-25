import EditIcon from '@/assets/icons/EditIcon';
import EyeIcon from '@/assets/icons/EyeIcon';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import ProductShelfEditModal from './product-shelf-edit/ProductShelfEditModal';
import ProductShelfViewModal from './product-shelf-view/ProductShelfViewModal';

const ProductShelvesTableActionBtn = ({ data }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  return (
    <div className='flex gap-3 pl-6 justify-center'>
      <Button variant='table-action' onClick={() => setIsViewOpen(true)}>
        <EyeIcon className='fill-gray-8' />
      </Button>
      <Button variant='table-action' onClick={() => setIsEditOpen(true)}>
        <EditIcon className='fill-gray-8' />
      </Button>

      {isViewOpen && (
        <ProductShelfViewModal
          isOpen={isViewOpen}
          setIsOpen={setIsViewOpen}
          id={data.id}
        />
      )}

      {isEditOpen && (
        <ProductShelfEditModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          id={data.id}
        />
      )}
    </div>
  );
};

export default ProductShelvesTableActionBtn;
