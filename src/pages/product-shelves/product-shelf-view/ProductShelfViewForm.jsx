import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Button from '@/components/ui/Button';

const ProductShelfViewForm = ({ productShelf, setIsOpen }) => {
  // console.log(productShelf);
  return (
    <div className='w-full p-5 grid gap-5'>
      <h4 className='text-center'>View - Product Shelf</h4>
      <Input value={productShelf.name} label='Name' disabled />
      <Input
        value={productShelf?.productPoolName}
        label='Product Pool Name'
        disabled
      />
      <Textarea value={productShelf.description} label='Description' disabled />
      <Input value={productShelf.marketCode} label='Market Code' disabled />

      <Input value={productShelf.code} label='Shelf Code' disabled />
      <Input value={productShelf.status} label='Status' disabled />
      <div className='flex justify-center mt-5'>
        <Button variant='secondary' onClick={() => setIsOpen(false)}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default ProductShelfViewForm;
