import PageContainer from '@/components/layout/PageContainer';
import PageError from '@/components/layout/PageError';
import PageHeader from '@/components/layout/PageHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetCustomizeCategory } from '@/services/global-config/customizeCategoriesService';
import { useParams } from 'react-router-dom';
import CustomizeCategoriesViewForm from './CustomizeCategoriesViewForm';

const CustomizeCategoriesView = () => {
  const { id } = useParams();
  const {
    data: customizeCategory,
    error,
    isFetching,
  } = useGetCustomizeCategory(id);

  return (
    <PageContainer className='flex flex-col gap-3'>
      <PageHeader title='View Customize Category' />
      <div className='flex-1 flex flex-col overflow-auto bg-white'>
        {isFetching && (
          <LoadingSpinner
            text='Loading Customize Categories'
            className='flex'
          />
        )}
        {!isFetching && customizeCategory && !error && (
          <CustomizeCategoriesViewForm customizeCategory={customizeCategory} />
        )}
        {!isFetching && error && <PageError message={error.message} />}
      </div>
    </PageContainer>
  );
};

export default CustomizeCategoriesView;
