import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetTaxCategory } from '@/services/tax/taxCategoryService';
import TaxCategoryViewForm from './TaxCategoryViewForm';

const TaxCategoryViewModal = ({ isOpen, setIsOpen, id }) => {
  const { data: taxCategory, error, isFetching } = useGetTaxCategory(id);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className='flex justify-center items-center min-h-[100px]'
    >
      {isFetching && (
        <LoadingSpinner text='Loading Tax Rules' className='flex' />
      )}
      {!isFetching && taxCategory && !error && (
        <TaxCategoryViewForm taxCategory={taxCategory} setIsOpen={setIsOpen} />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default TaxCategoryViewModal;
