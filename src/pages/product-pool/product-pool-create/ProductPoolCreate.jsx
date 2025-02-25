import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormRadioButtonGroup from '@/components/form/FormRadioButtonGroup';
import FormTextarea from '@/components/form/FormTextarea';
import PageContainer from '@/components/layout/PageContainer';
import PageError from '@/components/layout/PageError';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAddProductPool } from '@/services/global-config/GCProductPoolServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductAdded from './product-pool-table/ProductAdded';
import ProductPoolAddProductModal from './product-pool-table/ProductPoolAddProductModal';

const ProductPoolCreate = () => {
  const navigate = useNavigate();
  const { isLoading, error, mutate: addProductPool } = useAddProductPool();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAddedOpen, setIsAddedOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState([]);

  const handleCreateProductPool = (data) => {
    const formData = {
      ...data,
      productIds: selectProduct.map((product) => product.id),
    };
    addProductPool(formData, {
      onSuccess: () => {
        toast.success('Successfully added');
        navigate('/admin/product-pools');
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
      <PageHeader title='Create Product Pool' />
      <div className='bg-white overflow-auto'>
        <Form
          onSubmit={handleCreateProductPool}
          className='p-10 flex flex-col gap-5'
        >
          <h4 className='text-center'>New - Product Pool</h4>
          <FormInput
            name='name'
            label='Name'
            placeholder='Product Pool Name'
            validations={{ required: 'Please write a name' }}
          />

          <FormTextarea
            name='description'
            label='Description'
            placeholder='Product Pool Description'
          />

          {/* <DataTable data={productsData?.items} columns={productColumn} /> */}
          <div className='flex flex-col justify-start gap-3 mt-5'>
            <div className='flex gap-5'>
              <p>Please Add Products to Product Pool </p>
              <Button size='small' onClick={() => setIsAddOpen(true)}>
                Add
              </Button>
            </div>
            <div>
              <button
                className=' underline text-primary font-bold py-4 cursor-pointer'
                type='button'
                onClick={() => setIsAddedOpen(true)}
              >
                Total Selected Products - {selectProduct?.length || 0}
              </button>
            </div>
          </div>

          {/* total selected products showing modal ...  */}
          {isAddedOpen && (
            <ProductAdded
              isOpen={isAddedOpen}
              setIsOpen={setIsAddedOpen}
              selectProduct={selectProduct}
              setSelectProduct={setSelectProduct}
            />
          )}

          {/* This modal is working for product pool adding from Modal  */}
          {isAddOpen && (
            <ProductPoolAddProductModal
              isOpen={isAddOpen}
              setIsOpen={setIsAddOpen}
              setSelectProduct={setSelectProduct}
              selectProduct={selectProduct}
            />
          )}

          <FormRadioButtonGroup
            name='status'
            label='Status'
            options={statusOptions}
            validations={{ required: 'Please select a status' }}
          />

          {isLoading && <LoadingSpinner text='Adding Product Pool' />}
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

export default ProductPoolCreate;
