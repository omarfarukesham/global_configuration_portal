import NoDataFound from '@/components/layout/NoDataFound';
import DataTable from '@/components/table/data-table/DataTable';
import Checkbox from '@/components/ui/Checkbox';

const ProductShelfTable = ({ data, setSelectProduct, selectProduct }) => {
  // const { data: productsData } = useGetProducts();
  // console.log(data);
  const productColumn = [
    {
      label: 'Select',
      key: 'selected',
      content: (cellData, row) => {
        // console.log(row.id);
        return (
          <Checkbox
            onChange={() => {
              setSelectProduct((previous) => {
                const isSelected = previous.find(
                  (product) => product.id === row.id,
                );

                if (isSelected) {
                  // If already selected, remove it
                  return previous.filter((product) => product.id !== row.id);
                } else {
                  // If not selected, add it
                  return [...previous, row];
                }
              });
            }}
            value={row.id}
            checked={!!selectProduct.find((product) => product.id === row.id)}
          />
        );
      },
    },
    {
      label: 'Name',
      key: 'titles',
      content: (cellData) => cellData['EN'],
    },
    {
      label: 'SKU',
      key: 'sku',
    },
    {
      label: 'Brand Name',
      key: 'brandName',
    },
  ];
  return (
    <>
      <div className='h-full flex flex-col overflow-auto'>
        <DataTable data={data} columns={productColumn} />
        {data?.length === 0 && <NoDataFound />}
      </div>
    </>
  );
};

export default ProductShelfTable;
