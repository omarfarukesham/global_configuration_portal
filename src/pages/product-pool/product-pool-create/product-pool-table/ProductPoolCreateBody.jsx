import PageError from '@/components/layout/PageError';
import PageInnerContainer from '@/components/layout/PageInnerContainer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useQueryParamState from '@/hooks/useQueryParamState';
import { useGetProducts } from '@/services/product/productService';
import { useEffect } from 'react';
import ProductPoolCreateFilters from './ProductPoolCreateFilters';
import ProductPoolTable from './ProductPoolTable';

const ProductPoolCreateBody = ({ setSelectProduct, selectProduct }) => {
  const defaultFilters = {
    name: '',
    perPage: 10,
    page: 1,
  };
  const [filters, setFilters] = useQueryParamState(defaultFilters);
  const { data, error, isFetching, refetch } = useGetProducts(filters);

  useEffect(() => {
    refetch(filters);
  }, [filters, refetch]);

  // console.log(data?.items);
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
      <ProductPoolCreateFilters
        onFilterChange={handleFilterChange}
        filters={filters}
        paginate={data?.paginate}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />

      {isFetching && <LoadingSpinner text='Loading Products Pool' />}
      {!isFetching && data && !error && (
        <ProductPoolTable
          data={data?.items}
          setSelectProduct={setSelectProduct}
          selectProduct={selectProduct}
        />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </PageInnerContainer>
  );
};

export default ProductPoolCreateBody;
