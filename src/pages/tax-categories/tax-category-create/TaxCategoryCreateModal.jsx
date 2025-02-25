import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormRadioButtonGroup from '@/components/form/FormRadioButtonGroup';
import FormTextarea from '@/components/form/FormTextarea';
import PageError from '@/components/layout/PageError';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAddTaxCategory } from '@/services/tax/taxCategoryService';
import { toast } from 'react-toastify';

const TaxCategoryCreateModal = ({ isOpen, setIsOpen }) => {
  const { isLoading, error, mutate: addTaxCategory } = useAddTaxCategory();
  const handleCreateTaxCategory = (data) => {
    addTaxCategory(data, {
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
        onSubmit={handleCreateTaxCategory}
        className='p-10 flex flex-col gap-5'
      >
        <h4 className='text-center'>New - Tax Category</h4>
        <FormInput
          name='name'
          label='Name'
          placeholder='Tax Category Name'
          validations={{ required: 'Please write a name' }}
        />

        <FormTextarea
          name='description'
          label='Description'
          placeholder='Tax Category Description'
        />

        <FormRadioButtonGroup
          name='status'
          label='Status'
          options={statusOptions}
          validations={{ required: 'Please select a status' }}
        />
        {isLoading && <LoadingSpinner text='Adding Tax Category' />}
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

export default TaxCategoryCreateModal;
