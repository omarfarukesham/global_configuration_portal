import PageContainer from '@/components/layout/PageContainer';
import TaxCategoriesBody from './TaxCategoriesBody';
import TaxCategoriesHeader from './TaxCategoriesHeader';

const TaxCategories = () => {
  return (
    <PageContainer className='flex flex-col gap-3'>
      <TaxCategoriesHeader />
      <TaxCategoriesBody />
    </PageContainer>
  );
};

export default TaxCategories;
