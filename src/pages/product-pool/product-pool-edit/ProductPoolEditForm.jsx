import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormTextarea from '@/components/form/FormTextarea';
import FormDropdown from '@/components/form/form-dropdown/FormDropdown';
import PageError from '@/components/layout/PageError';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useEditProductPool } from '@/services/global-config/GCProductPoolServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductPoolAddProductModal from '../product-pool-create/product-pool-table/ProductPoolAddProductModal';
import ProductList from './ProductList';

const ProductPoolEditForm = ({ productPool }) => {
  const { isLoading, error, mutate: updateProductPool } = useEditProductPool();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAddedOpen, setIsAddedOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState(productPool.products);

  const navigate = useNavigate();

  const handleUpdateProductPool = (data) => {
    // console.log(data);
    const formData = {
      description: data.description,
      id: data.id,
      productIds: selectProduct?.map((p) => p.id),
      name: data.name,
      status: data.status,
    };
    // console.log(formData);
    updateProductPool(formData, {
      onSuccess: () => {
        toast.success('Successfully updated');
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
    <Form
      className='p-10 flex flex-col w-full gap-5'
      onSubmit={handleUpdateProductPool}
      defaultValues={productPool}
    >
      <h4 className='text-center'>Edit - Product Pool</h4>

      <FormInput
        name='name'
        label='Name'
        placeholder='Product Pool'
        validations={{ required: 'Please write a name' }}
      />

      {/* Existing data show and remove from this code  */}
      <div className='flex flex-col justify-start gap-3 mt-5'>
        <div className='flex gap-5'>
          <p>Please Edit Products to Product Pool </p>
          <Button size='small' onClick={() => setIsAddOpen(true)}>
            Add New Product
          </Button>
        </div>
        <div>
          <button
            className='text-primary font-bold underline'
            type='button'
            onClick={() => setIsAddedOpen(true)}
          >
            Total Product - {selectProduct?.length}
          </button>
        </div>
      </div>

      <FormTextarea
        name='description'
        label='Description'
        placeholder='Product Pool Description'
      />

      <FormDropdown
        name='status'
        label='Status'
        options={statusOptions}
        validations={{ required: 'Please select a status' }}
      />

      {isAddOpen && (
        <ProductPoolAddProductModal
          isOpen={isAddOpen}
          setIsOpen={setIsAddOpen}
          setSelectProduct={setSelectProduct}
          selectProduct={selectProduct}
        />
      )}

      {isAddedOpen && (
        <ProductList
          isOpen={isAddedOpen}
          setIsOpen={setIsAddedOpen}
          setSelectProduct={setSelectProduct}
          selectProduct={selectProduct}
        />
      )}
      {isLoading && <LoadingSpinner text='Updating Product Pool' />}
      {!isLoading && (
        <div className='flex justify-center gap-3 mt-5'>
          <Button type='submit'>Save</Button>
        </div>
      )}
      {error && <PageError message={error.message} />}
    </Form>
  );
};

export default ProductPoolEditForm;
