import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormRadioButtonGroup from '@/components/form/FormRadioButtonGroup';
import FormTextarea from '@/components/form/FormTextarea';
import FromDropdownRest from '@/components/form/form-dropdown-rest/FromDropdownRest';
import PageContainer from '@/components/layout/PageContainer';
import PageError from '@/components/layout/PageError';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAddProductShelf } from '@/services/global-config/GCProductShelfServices';
import { useGetMarkets } from '@/services/global-config/marketSettingService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductShelfCreate = () => {
  const navigate = useNavigate();
  const { isLoading, error, mutate: addProductShelf } = useAddProductShelf();
  // console.log(useGetMarkets);

  const handleCreateProductShelf = (data) => {
    data.productPoolId = data.productPoolId.trim();
    // console.log(data);
    addProductShelf(data, {
      onSuccess: () => {
        toast.success('Successfully added');
        navigate('/admin/product-shelf');
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
    <PageContainer className='flex flex-col gap-3'>
      <PageHeader title='Create Product Shelves' />
      <div className='bg-white overflow-auto'>
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
            name='productPoolId'
            label='Product Pool'
            placeholder='Please copy the product pool id and paste here'
          />

          {/* <FromDropdownRest
            name='productPoolId'
            label='Product Pool'
            isMulti={false}
            restServiceHook={useGetProductPools}
          /> */}
          <FromDropdownRest
            name='marketCode'
            label='Market Code'
            valueKey='marketCode'
            restServiceHook={useGetMarkets}
          />

          {/* <FromDropdownRest
            name='marketCode'
            // optionsClassName='h-60'
            label='Market Code'
            placeholder='Market Code like DK, SE'
            isMulti={false}
            restServiceHook={useGetMarkets}
          /> */}
          <FormInput
            name='code'
            label='Shelf Code'
            placeholder='Shelf Code'
            validations={{ required: 'Please write a shelf code' }}
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
            </div>
          )}
          {error && <PageError message={error.message} />}
        </Form>
      </div>
    </PageContainer>
  );
};

export default ProductShelfCreate;
