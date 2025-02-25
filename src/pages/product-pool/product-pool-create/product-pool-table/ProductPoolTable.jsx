import NoDataFound from '@/components/layout/NoDataFound';
import DataTable from '@/components/table/data-table/DataTable';
import Checkbox from '@/components/ui/Checkbox';

const checkIfAllSelected = (data, selectedProducts) => {
  return data.every((product) =>
    selectedProducts.find((pd) => pd.id === product.id),
  );
};

const ProductPoolTable = ({ data, setSelectProduct, selectProduct }) => {
  const toggleSelectAll = () => {
    if (checkIfAllSelected(data, selectProduct)) {
      setSelectProduct(
        selectProduct.filter(
          (product) => data.findIndex((pd) => pd.id === product.id) < 0,
        ),
      );
    } else {
      setSelectProduct([...selectProduct, ...data]);
    }
  };

  const productColumn = [
    {
      label: (
        <Checkbox
          onChange={toggleSelectAll}
          // checked={selectProduct.length == data.length}
          checked={checkIfAllSelected(data, selectProduct)}
        />
      ),
      key: 'selected',
      content: (cellData, row) => {
        return (
          <Checkbox
            onChange={() => {
              setSelectProduct((previous) => {
                const isSelected = previous.find(
                  (product) => product.id === row.id,
                );

                if (isSelected) {
                  return previous.filter((product) => product.id !== row.id);
                } else {
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

export default ProductPoolTable;
