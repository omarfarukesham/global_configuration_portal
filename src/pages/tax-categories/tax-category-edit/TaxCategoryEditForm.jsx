import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormTextarea from '@/components/form/FormTextarea';
import FormDropdown from '@/components/form/form-dropdown/FormDropdown';
import PageError from '@/components/layout/PageError';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useEditTaxCategory } from '@/services/tax/taxCategoryService';
import { toast } from 'react-toastify';

const TaxCategoryEditForm = ({ setIsOpen, taxCategory }) => {
  const { isLoading, error, mutate: updateTaxCategory } = useEditTaxCategory();
  const handleUpdateTaxCategory = (data) => {
    updateTaxCategory(data, {
      onSuccess: () => {
        toast.success('Successfully updated');
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
    <Form
      className='p-10 flex flex-col w-full gap-5'
      onSubmit={handleUpdateTaxCategory}
      defaultValues={taxCategory}
    >
      <h4 className='text-center'>Edit - Tax Category</h4>
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
      <FormDropdown
        name='status'
        label='Status'
        options={statusOptions}
        validations={{ required: 'Please select a status' }}
      />
      {isLoading && <LoadingSpinner text='Updating Tax Category' />}
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
  );
};

export default TaxCategoryEditForm;
