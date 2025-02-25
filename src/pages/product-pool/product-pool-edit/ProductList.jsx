import RemoveIcon from '@/assets/icons/RemoveIcon';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';

const ProductList = ({
  isOpen,
  setIsOpen,
  selectProduct,
  setSelectProduct,
}) => {
  const handleAddProduct = (productId) => {
    setSelectProduct((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className='flex flex-col gap-10 p-10 overflow-auto max-h-[95%]'
    >
      <small className='font-bold text-primary'>
        Total Product list... {selectProduct?.length}
      </small>

      {selectProduct.length > 0 ? (
        <table className='w-full border border-gray-4'>
          <thead className=''>
            <tr className='border-gray-4'>
              <th className='py-2 px-4 border-b text-start border-gray-4'>
                Sl No
              </th>
              <th className='py-2 px-4 border-b text-start border-gray-4'>
                Selected Product
              </th>
              <th className='py-2 px-4 border-b text-start border-gray-4'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {selectProduct.map((product, index) => (
              <tr key={index} className='border-gray-4'>
                <td className='py-2 px-4 border-b border-gray-4'>
                  {index + 1}
                </td>
                <td className='py-2 px-4 border-b border-gray-4'>
                  {product.titles.EN}
                </td>
                <td className='py-2 px-4 border-b border-gray-4'>
                  <Button
                    size='small'
                    onClick={() => handleAddProduct(product.id)}
                    className=''
                  >
                    <RemoveIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No selected products.</p>
      )}
    </Modal>
  );
};

export default ProductList;
