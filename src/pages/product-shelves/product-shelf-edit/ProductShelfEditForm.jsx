import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormTextarea from '@/components/form/FormTextarea';
import FromDropdownRest from '@/components/form/form-dropdown-rest/FromDropdownRest';
import FormDropdown from '@/components/form/form-dropdown/FormDropdown';
import PageError from '@/components/layout/PageError';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetProductPools } from '@/services/global-config/GCProductPoolServices';
import { useEditProductShelf } from '@/services/global-config/GCProductShelfServices';
import { useGetMarkets } from '@/services/global-config/marketSettingService';
import { toast } from 'react-toastify';

const ProductShelfEditForm = ({ setIsOpen, productShelf }) => {
  const {
    isLoading,
    error,
    mutate: updateProductShelf,
  } = useEditProductShelf();

  // console.log(productShelf);

  const handleUpdateProductShelf = (data) => {
    updateProductShelf(data, {
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
      className='p-10 flex flex-col w-full gap-5 overflow-hidden'
      onSubmit={handleUpdateProductShelf}
      defaultValues={productShelf}
    >
      <h4 className='text-center'>Edit - Product Shelf</h4>
      <FormInput
        name='name'
        label='Name'
        placeholder='Product Shelf'
        validations={{ required: 'Please write a name' }}
      />
      <FormTextarea
        name='description'
        label='Description'
        placeholder='Product Shelf Description'
      />

      <FromDropdownRest
        name='productPoolId'
        optionsClassName='h-60'
        label='Product Pool'
        isMulti={false}
        restServiceHook={useGetProductPools}
      />

      <FormDropdown
        name='status'
        label='Status'
        options={statusOptions}
        validations={{ required: 'Please select a status' }}
      />

      {/* <FormInput
        name='marketCode'
        label='Market Code'
        placeholder='Product Shelf Market Code'
        validations={{ required: 'Please write a MarketCode' }}
      /> */}

      <FromDropdownRest
        name='marketCode'
        label='Market Code'
        valueKey='marketCode'
        restServiceHook={useGetMarkets}
      />

      <FormInput
        name='code'
        label='Shelf Code'
        placeholder='Product Shelf  Code'
        validations={{ required: 'Please write a Shelf Code' }}
      />
      {isLoading && <LoadingSpinner text='Updating Product Shelf' />}
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

export default ProductShelfEditForm;
