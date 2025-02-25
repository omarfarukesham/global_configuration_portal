import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductPoolViewProductList from './ProductPoolViewProductList';

const ProductPoolViewForm = ({ productPool }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('view');

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className='w-full p-5 grid gap-5'>
      <h4 className='text-center'>View - Product Pool</h4>

      <div className='flex gap-3 justify-center'>
        <Button
          variant={viewMode === 'view' ? 'secondary' : ''}
          onClick={() => toggleViewMode('view')}
          size='small'
        >
          Basic Info
        </Button>

        <Button
          variant={viewMode === 'productDetails' ? 'secondary' : ''}
          onClick={() => toggleViewMode('productDetails')}
          size='small'
        >
          Product List
        </Button>
      </div>

      {/* this is product details  */}
      {viewMode === 'productDetails' && (
        <ProductPoolViewProductList products={productPool?.products} />
      )}

      {viewMode === 'view' && (
        <>
          <Input value={productPool.name} label='Name' disabled />
          <Textarea
            value={productPool.description}
            label='Description'
            disabled
          />
          <Input value={productPool.status} label='Status' disabled />
        </>
      )}

      <div className='flex justify-center mt-5'>
        <Button
          variant='secondary'
          onClick={() => navigate('/admin/product-pools')}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default ProductPoolViewForm;
