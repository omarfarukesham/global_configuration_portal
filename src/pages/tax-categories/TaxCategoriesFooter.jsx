import Pagination from '@/components/ui/Pagination';

const TaxCategoriesFooter = ({ onFilterChange, filters, paginate }) => {
  return (
    <div className='p-5 flex-1 flex flex-col gap-3 md:items-end'>
      <Pagination
        perPage={filters.perPage}
        page={filters.page}
        paginate={paginate}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default TaxCategoriesFooter;
