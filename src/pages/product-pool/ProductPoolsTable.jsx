import NoDataFound from '@/components/layout/NoDataFound';
import DataTable from '@/components/table/data-table/DataTable';
import ProductPoolsTableActionBtn from './ProductPoolsTableActionBtn';
// import ProductShelvesTableActionBtn from './ProductShelvesTableActionBtn';

const ProductPoolsTable = ({ data }) => {
  const columns = [
    {
      label: 'SL No.',
      key: 'serial',
    },
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Product Pool Id',
      key: 'id',
    },
    {
      label: 'Description',
      key: 'description',
    },
    {
      label: 'Product Qty',
      key: 'productIdsLength',
      // content: (_, rowData)
    },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: <div className='text-center'>Action</div>,
      content: (_, rowData) => <ProductPoolsTableActionBtn data={rowData} />,
    },
  ];
  return (
    <div className='h-full flex flex-col overflow-auto'>
      <DataTable columns={columns} data={data} />
      {data.length === 0 && <NoDataFound />}
    </div>
  );
};

export default ProductPoolsTable;
