import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import ProductShelfCreateBody from './ProductShelfCreateBody';
// import ProductPoolCreateBody from './ProductPoolCreateBody';

const ProductShelfAddProductModal = ({
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
        className='flex flex-col gap-10 p-10 overflow-auto'
      >
        <ProductShelfCreateBody
          setSelectProduct={setSelectProduct}
          selectProduct={selectProduct}
        />

        <Button onClick={saveProduct}>Done</Button>
      </Modal>
    </>
  );
};

export default ProductShelfAddProductModal;
