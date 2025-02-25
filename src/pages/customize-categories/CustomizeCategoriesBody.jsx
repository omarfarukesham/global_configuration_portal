import PageError from '@/components/layout/PageError';
import PageInnerContainer from '@/components/layout/PageInnerContainer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useQueryParamState from '@/hooks/useQueryParamState';
import { useGetCustomizeCategories } from '@/services/global-config/customizeCategoriesService';
import { useEffect } from 'react';
import CustomizeCategoriesFilters from './CustomizeCategoriesFilters';
import CustomizeCategoriesTable from './CustomizeCategoriesTable';

const CustomizeCategoriesBody = () => {
  const defaultFilters = {
    name: '',
    perPage: 10,
    page: 1,
  };
  const [filters, setFilters] = useQueryParamState(defaultFilters);
  const { data, error, isFetching, refetch } =
    useGetCustomizeCategories(filters);

  // Data fetch will occur whenever filter is changed
  useEffect(() => {
    refetch(filters);
  }, [filters, refetch]);

  // Changing the filter base on user interaction
  const handleFilterChange = (newFilters) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  // Apply the filters
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Clearing the filters
  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <PageInnerContainer className='flex flex-col'>
      <CustomizeCategoriesFilters
        onFilterChange={handleFilterChange}
        filters={filters}
        paginate={data?.paginate}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />

      {isFetching && <LoadingSpinner text='Loading Customize Category' />}
      {!isFetching && data && !error && (
        <CustomizeCategoriesTable data={data?.items} />
      )}
      {!isFetching && error && <PageError message={error.message} />}

      {/* <ProductShelvesFilters
        onFilterChange={handleFilterChange}
        filters={filters}
        paginate={data?.paginate}
      /> */}
    </PageInnerContainer>
  );
};

export default CustomizeCategoriesBody;
