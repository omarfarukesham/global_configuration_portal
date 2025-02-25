import PageContainer from '@/components/layout/PageContainer';
import PageError from '@/components/layout/PageError';
import PageHeader from '@/components/layout/PageHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetProductPoolDetails } from '@/services/global-config/GCProductPoolServices';
import { useParams } from 'react-router-dom';
import ProductPoolEditForm from './ProductPoolEditForm';

const ProductPoolEdit = () => {
  const { id } = useParams();
  const { data, error, isFetching } = useGetProductPoolDetails(id);
  return (
    <PageContainer className='flex flex-col gap-3'>
      <PageHeader
        title='Edit Product Pool'
        breadcrumb={[
          { label: 'Home', path: '/' },
          { label: 'Product Pools', path: '/admin/product-pools' },
          { label: 'Edit', path: '' },
        ]}
      />
      <div className='flex-1 flex flex-col overflow-auto bg-white'>
        {isFetching && (
          <LoadingSpinner text='Loading Product Pool' className='flex' />
        )}
        {!isFetching && data && !error && (
          <ProductPoolEditForm productPool={data} />
        )}
        {!isFetching && error && <PageError message={error.message} />}
      </div>
    </PageContainer>
  );
};
export default ProductPoolEdit;
