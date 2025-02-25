import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormSwitch from '@/components/form/FormSwitch';
import FormTextarea from '@/components/form/FormTextarea';
import FormUploadContentService from '@/components/form/FormUploadContentService';
import FromDropdownRest from '@/components/form/form-dropdown-rest/FromDropdownRest';
import FormDropdown from '@/components/form/form-dropdown/FormDropdown';
import PageError from '@/components/layout/PageError';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useDirectUploadContent } from '@/services/content/contentService';
import { useGetProductPools } from '@/services/global-config/GCProductPoolServices';
import { useEditCustomizeCategory } from '@/services/global-config/customizeCategoriesService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CustomizeCategoriesEditForm = ({ customizeCategoryData }) => {
  const {
    isLoading,
    error,
    mutate: updateCustomizeCategory,
  } = useEditCustomizeCategory();
  const navigate = useNavigate();

  const handleUpdateCustomizeCategory = (data) => {
    updateCustomizeCategory(data, {
      onSuccess: () => {
        toast.success('Successfully updated');
        navigate('/admin/customize-categories');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const statusOptions = [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
  ];

  return (
    <Form
      className='p-10 flex flex-col w-full gap-5'
      onSubmit={handleUpdateCustomizeCategory}
      defaultValues={customizeCategoryData}
    >
      <h4 className='text-center'>Edit -Customize Category</h4>

      <FormInput
        name='name'
        label='Name'
        placeholder='Customize Category'
        validations={{ required: 'Please write a name' }}
      />

      <FormUploadContentService
        name='thumbnail'
        label='Thumbnail Image'
        className='w-40 h-30'
        restServiceHook={useDirectUploadContent}
        restData={{ fileType: 'CUSTOMIZE_CATEGORY_THUMBNAIL' }}
      />
      <FormUploadContentService
        name='icon'
        label='Icon'
        className='w-28 h-20'
        restServiceHook={useDirectUploadContent}
        restData={{ fileType: 'CUSTOMIZE_CATEGORY_ICON' }}
      />

      <FormInput name='slug' label='Slug Name' />
      <FormTextarea
        name='description'
        label='Description'
        placeholder='Customize Category Description'
      />

      <FromDropdownRest
        name='productPoolId'
        label='Product Pool Name'
        placeholder='Please Write a product pool name'
        restServiceHook={useGetProductPools}
        validations={{ required: 'Please select product pool' }}
      />

      <FormDropdown
        name='status'
        label='Status'
        options={statusOptions}
        validations={{ required: 'Please select a status' }}
      />
      <FormSwitch
        name='isFeatured'
        label='Is Featured'
        validations={{ required: 'Please select a Feature Status' }}
      />

      {isLoading && <LoadingSpinner text='Updating Customize Category ' />}
      {!isLoading && (
        <div className='flex justify-center gap-3 mt-5'>
          <Button type='submit'>Save</Button>
        </div>
      )}
      {error && <PageError message={error.message} />}
    </Form>
  );
};

export default CustomizeCategoriesEditForm;
