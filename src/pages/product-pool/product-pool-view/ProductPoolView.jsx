import PageContainer from '@/components/layout/PageContainer';
import PageError from '@/components/layout/PageError';
import PageHeader from '@/components/layout/PageHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetProductPoolDetails } from '@/services/global-config/GCProductPoolServices';
import { useParams } from 'react-router-dom';
import ProductPoolViewForm from './ProductPoolViewForm';

const ProductPoolView = () => {
  const { id } = useParams();
  const { data: productPool, error, isFetching } = useGetProductPoolDetails(id);
  return (
    <PageContainer className='flex flex-col gap-3'>
      <PageHeader
        title='Product Pool view'
        breadcrumb={[
          { label: 'Home', path: '/' },
          { label: 'Product Pools', path: '/admin/product-pools' },
          { label: 'Edit', path: '' },
        ]}
      />

      <div className='bg-white overflow-auto'>
        {isFetching && (
          <LoadingSpinner text='Loading Product Pool' className='flex' />
        )}
        {!isFetching && productPool && !error && (
          <ProductPoolViewForm productPool={productPool} />
        )}
        {!isFetching && error && <PageError message={error.message} />}
      </div>
    </PageContainer>
  );
};

export default ProductPoolView;
