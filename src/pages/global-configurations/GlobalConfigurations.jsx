import PageContainer from '@/components/layout/PageContainer';
import GlobalConfigBody from './GlobalConfigBody';
import GlobalConfigHeader from './GlobalConfigHeader';

const GlobalConfigurations = () => {
  return (
    <>
      <PageContainer className='flex flex-col gap-3'>
        <GlobalConfigHeader />
        <GlobalConfigBody />
        {/* <DynamicForm /> */}
      </PageContainer>
    </>
  );
};

export default GlobalConfigurations;
