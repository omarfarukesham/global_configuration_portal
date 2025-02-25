import NoDataFound from '@/components/layout/NoDataFound';
import DataTable from '@/components/table/data-table/DataTable';
import ProductShelvesTableActionBtn from './ProductShelvesTableActionBtn';

const ProductShelvesTable = ({ data }) => {
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
      label: 'Description',
      key: 'description',
    },
    {
      label: 'Pool Name',
      key: 'productPoolName',
    },
    {
      label: 'MarketCode',
      key: 'marketCode',
    },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: <div className='text-center'>Action</div>,
      content: (_, rowData) => <ProductShelvesTableActionBtn data={rowData} />,
    },
  ];
  return (
    <div className='h-full flex flex-col overflow-auto'>
      <DataTable columns={columns} data={data} />
      {data.length === 0 && <NoDataFound />}
    </div>
  );
};

export default ProductShelvesTable;
