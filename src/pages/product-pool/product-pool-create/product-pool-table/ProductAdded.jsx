import RemoveIcon from '@/assets/icons/RemoveIcon';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';

const ProductAdded = ({
  isOpen,
  selectProduct,
  setIsOpen,
  setSelectProduct,
}) => {
  const handleAddProduct = (productId) => {
    setSelectProduct((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className='flex flex-col gap-10 p-10 w-full h-[95%]  overflow-auto'
      >
        <p> Product Qty - {selectProduct.length}</p>
        {selectProduct.length ? (
          <table className='w-1/2 lg:w-full border border-gray-4'>
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
          ''
        )}
      </Modal>
    </>
  );
};

export default ProductAdded;
