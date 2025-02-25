import NoDataFound from '@/components/layout/NoDataFound';
import DataTable from '@/components/table/data-table/DataTable';
import CustomizeCategoriesTableActionBtn from './CustomizeCategoriesTableActionBtn';
// import ProductPoolsTableActionBtn from './ProductPoolsTableActionBtn';
// import ProductShelvesTableActionBtn from './ProductShelvesTableActionBtn';

const CustomizeCategoriesTable = ({ data }) => {
  // console.log(data);
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
      label: 'Product Pool Name',
      key: 'productPoolName',
    },
    {
      label: 'Is Featured',
      key: 'isFeatured',
      content: (text) => text.toString(),
    },
    {
      label: 'Thumbnails',
      key: 'thumbnail',
      content: (url) => <img src={url} className='w-10 h-10' />,
    },
    // {
    //   label: 'Customize Code',
    //   key: 'code',
    // },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: <div className='text-center'>Action</div>,
      content: (_, rowData) => (
        <CustomizeCategoriesTableActionBtn data={rowData} />
      ),
    },
  ];
  return (
    <div className='flex flex-col overflow-auto'>
      <DataTable columns={columns} data={data} />
      {data.length === 0 && <NoDataFound />}
    </div>
  );
};

export default CustomizeCategoriesTable;
