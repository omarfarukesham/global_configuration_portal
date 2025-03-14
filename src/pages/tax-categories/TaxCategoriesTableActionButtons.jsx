import EditIcon from '@/assets/icons/EditIcon';
import EyeIcon from '@/assets/icons/EyeIcon';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import TaxCategoryEditModal from './tax-category-edit/TaxCategoryEditModal';
import TaxCategoryViewModal from './tax-category-view/TaxCategoryViewModal';

const TaxCategoriesTableActionButtons = ({ data }) => {
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
        <TaxCategoryViewModal
          isOpen={isViewOpen}
          setIsOpen={setIsViewOpen}
          id={data.id}
        />
      )}

      {isEditOpen && (
        <TaxCategoryEditModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          id={data.id}
        />
      )}
    </div>
  );
};

export default TaxCategoriesTableActionButtons;
