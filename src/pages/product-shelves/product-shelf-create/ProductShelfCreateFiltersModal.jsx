import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FromDropdownRest from '@/components/form/form-dropdown-rest/FromDropdownRest';
import Modal from '@/components/modal/Modal';
import Button from '@/components/ui/Button';
import { useGetBrands } from '@/services/product/brandService';
import removeUndefinedKeys from '@/utilities/removeUndefinedKeys';

const ProductShelfCreateFiltersModal = ({
  isOpen,
  setIsOpen,
  filters,
  applyFilters,
  clearFilters,
}) => {
  const filtersData = {
    ...filters,
  };

  const handleApplyFilters = (data) => {
    // console.log(data);
    applyFilters(removeUndefinedKeys(data));
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    clearFilters();
    setIsOpen(false);
  };

  // const statusOptions = [
  //   { value: 'ACTIVE', label: 'Active' },
  //   { value: 'INACTIVE', label: 'Inactive' },
  // ];

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className='flex flex-col gap-10 p-10'
    >
      <Form
        onSubmit={handleApplyFilters}
        defaultValues={filtersData}
        className='flex-1 flex flex-col gap-10'
      >
        <div className='flex-1'>
          <div className='grid md:grid-cols-2 gap-x-10 gap-y-6'>
            <FromDropdownRest
              name='brandId'
              label='Brand Name'
              restServiceHook={useGetBrands}
              className='bg-white'
            />
            <FormInput name='sku' label='SKU' className='bg-white' />
          </div>
        </div>

        <div className='flex justify-center gap-5'>
          <Button type='submit' className='text-white border-white'>
            Apply Filters
          </Button>
          <Button
            onClick={handleClearFilters}
            variant='secondary'
            className='text-white border-white'
          >
            Clear Filters
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductShelfCreateFiltersModal;
