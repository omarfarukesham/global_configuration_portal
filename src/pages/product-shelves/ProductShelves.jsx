import PageContainer from '@/components/layout/PageContainer';
import ProductShelvesBody from './ProductShelvesBody';
import ProductShelvesHeader from './ProductShelvesHeader';

const ProductShelves = () => {
  return (
    <PageContainer className='flex flex-col gap-3'>
      <ProductShelvesHeader />
      <ProductShelvesBody />
    </PageContainer>
  );
};

export default ProductShelves;
