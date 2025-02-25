import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import ProductPoolCreateBody from './ProductPoolCreateBody';

const ProductPoolAddProductModal = ({
  isOpen,
  setIsOpen,
  setSelectProduct,
  selectProduct,
}) => {
  const saveProduct = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className='flex flex-col gap-10 p-10 w-full h-[95%]  overflow-auto'
      >
        <ProductPoolCreateBody
          setSelectProduct={setSelectProduct}
          selectProduct={selectProduct}
        />

        <Button onClick={saveProduct}>Done</Button>
      </Modal>
    </>
  );
};

export default ProductPoolAddProductModal;
