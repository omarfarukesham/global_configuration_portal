import PageError from '@/components/layout/PageError';
import PageInnerContainer from '@/components/layout/PageInnerContainer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useQueryParamState from '@/hooks/useQueryParamState';
// import { useGetProductPools } from '@/services/global-config/GCProductPoolServices';
import { useGetProducts } from '@/services/product/productService';
import { useEffect } from 'react';
import ProductShelfCreateFilters from './ProductShelfCreateFilters';
import ProductShelfTable from './ProductShelfTable';
// import ProductPoolCreateFilters from './ProductPoolCreateFilters';
// import ProductPoolTable from './ProductPoolTable';
// import ProductPoolsFilters from './ProductPoolsFilters';
// import ProductPoolsTable from './ProductPoolsTable';

const ProductShelfCreateBody = ({ setSelectProduct, selectProduct }) => {
  const defaultFilters = {
    name: '',
    perPage: 10,
    page: 1,
  };
  const [filters, setFilters] = useQueryParamState(defaultFilters);
  const { data, error, isFetching, refetch } = useGetProducts(filters);
  // console.log(data);

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
      <ProductShelfCreateFilters
        onFilterChange={handleFilterChange}
        filters={filters}
        paginate={data?.paginate}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />

      {isFetching && <LoadingSpinner text='Loading Products Shelf' />}
      {!isFetching && data && !error && (
        <ProductShelfTable
          data={data?.items}
          setSelectProduct={setSelectProduct}
          selectProduct={selectProduct}
        />
      )}
      {!isFetching && error && <PageError message={error.message} />}
    </PageInnerContainer>
  );
};

export default ProductShelfCreateBody;
