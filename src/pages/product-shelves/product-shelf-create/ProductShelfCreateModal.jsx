import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormRadioButtonGroup from '@/components/form/FormRadioButtonGroup';
import FormTextarea from '@/components/form/FormTextarea';
import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAddProductShelf } from '@/services/global-config/GCProductShelfServices';
import { toast } from 'react-toastify';

const ProductShelfCreateModal = ({ isOpen, setIsOpen }) => {
  const { isLoading, error, mutate: addProductShelf } = useAddProductShelf();
  const handleCreateProductShelf = (data) => {
    addProductShelf(data, {
      onSuccess: () => {
        toast.success('Successfully added');
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const statusOptions = [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
  ];
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        onSubmit={handleCreateProductShelf}
        className='p-10 flex flex-col gap-5'
      >
        <h4 className='text-center'>New - Product Shelf</h4>
        <FormInput
          name='name'
          label='Name'
          placeholder='Product Shelf Name'
          validations={{ required: 'Please write a name' }}
        />

        <FormTextarea
          name='description'
          label='Description'
          placeholder='Product Shelf Description'
        />
        <FormInput
          name='marketCode'
          label='Market Code'
          placeholder='Product Shelf Market Code'
          validations={{ required: 'Please write market code' }}
        />
        <FormRadioButtonGroup
          name='status'
          label='Status'
          options={statusOptions}
          validations={{ required: 'Please select a status' }}
        />
        {isLoading && <LoadingSpinner text='Adding Product Shelf' />}
        {!isLoading && (
          <div className='flex justify-center gap-3 mt-5'>
            <Button type='submit'>Save</Button>
            <Button variant='secondary' onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        )}
        {error && <PageError message={error.message} />}
      </Form>
    </Modal>
  );
};

export default ProductShelfCreateModal;
