import PageContainer from '@/components/layout/PageContainer';
import CustomizeCategoriesBody from './CustomizeCategoriesBody';
import CustomizeCategoriesHeader from './CustomizeCategoriesHeader';

const CustomizeCategories = () => {
  return (
    <PageContainer className='flex flex-col'>
      <CustomizeCategoriesHeader />
      <CustomizeCategoriesBody />
    </PageContainer>
  );
};

export default CustomizeCategories;
