import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormRadioButtonGroup from '@/components/form/FormRadioButtonGroup';
import FormTextarea from '@/components/form/FormTextarea';
import FormUploadContentService from '@/components/form/FormUploadContentService';
import PageContainer from '@/components/layout/PageContainer';
import PageError from '@/components/layout/PageError';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useDirectUploadContent } from '@/services/content/contentService';
import { useAddCustomizeCategory } from '@/services/global-config/customizeCategoriesService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CustomizeCategoriesCreate = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    mutate: addCustomizeCategory,
  } = useAddCustomizeCategory();

  const handleCreateCustomizeCategories = (data) => {
    data.productPoolId = data.productPoolId.trim();
    addCustomizeCategory(data, {
      onSuccess: () => {
        toast.success('Successfully added');
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
    <PageContainer className='flex flex-col gap-3'>
      <PageHeader title='Create Customize Category' />
      <div className='bg-white overflow-auto'>
        <Form
          onSubmit={handleCreateCustomizeCategories}
          className='p-10 flex flex-col gap-5'
        >
          <h4 className='text-center'>New - Customize Category</h4>
          <FormInput
            name='name'
            label='Name'
            placeholder='Customize Category Name'
            validations={{ required: 'Please write a name' }}
          />

          <FormTextarea
            name='description'
            label='Description'
            placeholder='Customize Category Description'
          />

          <FormInput
            name='productPoolId'
            label='Product Pool Id'
            placeholder='Please copy the product pool id and paste here'
          />

          <FormUploadContentService
            name='icon'
            label='Icon'
            className='w-40 h-40'
            restServiceHook={useDirectUploadContent}
            restData={{ fileType: 'CUSTOMIZE_CATEGORY_THUMBNAIL' }}
          />

          <FormUploadContentService
            name='thumbnail'
            label='Thumbnail Image'
            className='w-40 h-40'
            restServiceHook={useDirectUploadContent}
            restData={{ fileType: 'CUSTOMIZE_CATEGORY_THUMBNAIL' }}
          />

          <FormRadioButtonGroup
            name='status'
            label='Status'
            options={statusOptions}
            validations={{ required: 'Please select a status' }}
          />

          {isLoading && <LoadingSpinner text='Adding Product Pool' />}
          {!isLoading && (
            <div className='flex justify-center gap-3 mt-5'>
              <Button type='submit'>Save</Button>
            </div>
          )}
          {error && <PageError message={error.message} />}
        </Form>
      </div>
    </PageContainer>
  );
};

export default CustomizeCategoriesCreate;
