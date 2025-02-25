import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetProductShelf } from '@/services/global-config/GCProductShelfServices';
import ProductShelfEditForm from './ProductShelfEditForm';

const ProductShelfEditModal = ({ isOpen, setIsOpen, id }) => {
  const { data: productShelf, error, isFetching } = useGetProductShelf(id);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className='flex justify-center items-center min-h-[100px] overflow-auto h-[95%]'
    >
      {isFetching && (
        <LoadingSpinner text='Loading Product Shelf' className='flex' />
      )}
      {!isFetching && productShelf && !error && (
        <ProductShelfEditForm
          productShelf={productShelf}
          setIsOpen={setIsOpen}
        />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </Modal>
  );
};

export default ProductShelfEditModal;
