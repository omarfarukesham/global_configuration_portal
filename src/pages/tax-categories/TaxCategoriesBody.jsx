import PageError from '@/components/layout/PageError';
import PageInnerContainer from '@/components/layout/PageInnerContainer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useQueryParamState from '@/hooks/useQueryParamState';
import { useGetTaxCategories } from '@/services/tax/taxCategoryService';
import { useEffect } from 'react';
import TaxCategoriesFilters from './TaxCategoriesFilters';
import TaxCategoriesFooter from './TaxCategoriesFooter';
import TaxCategoriesTable from './TaxCategoriesTable';

const TaxCategoriesBody = () => {
  const defaultFilters = {
    name: '',
    perPage: 10,
    page: 1,
  };
  const [filters, setFilters] = useQueryParamState(defaultFilters);
  const { data, error, isFetching, refetch } = useGetTaxCategories(filters);

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
      <TaxCategoriesFilters
        onFilterChange={handleFilterChange}
        filters={filters}
        paginate={data?.paginate}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />

      {isFetching && <LoadingSpinner text='Loading Tax Categories' />}
      {!isFetching && data && !error && (
        <TaxCategoriesTable data={data?.items} />
      )}
      {!isFetching && error && <PageError message={error.message} />}

      <TaxCategoriesFooter
        onFilterChange={handleFilterChange}
        filters={filters}
        paginate={data?.paginate}
      />
    </PageInnerContainer>
  );
};

export default TaxCategoriesBody;
