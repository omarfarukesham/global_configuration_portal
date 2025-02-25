import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Button from '@/components/ui/Button';

const TaxCategoryViewForm = ({ taxCategory, setIsOpen }) => {
  return (
    <div className='w-full p-5 grid gap-5'>
      <h4 className='text-center'>View - Tax Category</h4>
      <Input value={taxCategory.name} label='Name' disabled />
      <Textarea value={taxCategory.description} label='Description' disabled />
      <Input value={taxCategory.status} label='Status' disabled />
      <div className='flex justify-center mt-5'>
        <Button variant='secondary' onClick={() => setIsOpen(false)}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default TaxCategoryViewForm;
