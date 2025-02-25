import DataTable from '@/components/table/data-table/DataTable';

const ProductPoolViewProductList = ({ products }) => {
  const columns = [
    {
      label: 'SL',
      key: 'serial',
      content: (val) => val,
    },
    {
      label: 'name',
      key: 'titles',
      content: (titles) => titles.EN,
    },
  ];

  return (
    <>
      <DataTable data={products} columns={columns} />
    </>
  );
};

export default ProductPoolViewProductList;
