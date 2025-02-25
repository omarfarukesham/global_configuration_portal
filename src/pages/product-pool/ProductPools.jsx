import PageContainer from '@/components/layout/PageContainer';
import ProductPoolsBody from './ProductPoolsBody';
import ProductPoolsHeader from './ProductPoolsHeader';

const ProductPools = () => {
  return (
    <PageContainer className='flex flex-col gap-3'>
      <ProductPoolsHeader />
      <ProductPoolsBody />
    </PageContainer>
  );
};

export default ProductPools;
