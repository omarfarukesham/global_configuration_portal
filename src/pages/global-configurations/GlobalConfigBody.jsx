import PageInnerContainer from '@/components/layout/PageInnerContainer';
import { useGetGlobalConfigs } from '@/services/global-config/globalConfigHomePageService';
import MPHPHeader from './MPHPHeader';

const GlobalConfigBody = () => {
  const { data, error, isLoading } = useGetGlobalConfigs();

  // console.log(data?.data?.data?.content[0].template);

  if (isLoading) {
    // Handle loading state
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle error state
    return <div>Error: {error.message}</div>;
  }

  // Check if data is available before processing it
  // if (!data) {
  //   return <div>No data available</div>;
  // }

  // let content = '';

  // const getContent = (data) => {
  //   if (typeof data === 'object' && data !== null) {
  //     Object.entries(data).forEach(([key, value]) => {
  //       if (typeof value === 'object') {
  //         getContent(value);
  //       } else {
  //         content += `${key}: ${value}\n`;
  //       }
  //     });
  //   }
  // };

  // getContent(data);

  // console.log(content);

  // const lines = content.split('\n').filter(Boolean);

  // Convert each line into a key-value pair
  // const objectData = lines.reduce((acc, line) => {
  //   const [key, value] = line.split(':').map((item) => item.trim());
  //   acc[key] = value === 'true';
  //   return acc;
  // }, {});

  // console.log(objectData);
  // const renderSwitches = () => {
  //   return Object.entries(objectData).map(([key, value]) => (
  //     <div key={key}>
  //       <p>
  //         {value ? `${key} Active` : key}
  //         <FormSwitch name={key} />
  //       </p>
  //     </div>
  //   ));
  // };

  return (
    // <PageInnerContainer className='flex flex-col p-4'>
    //   <PageInnerContainer className='flex flex-col p-4 overflow-y-auto'>
    //     <Form defaultValues={objectData} onSubmit={() => {}}>
    //       {/* <div className='grid grid-cols-3 gap-5'>{renderSwitches()}</div> */}
    //       <Form defaultValues={objectData} onSubmit={() => {}}>
    //         <div className='grid grid-cols-3 gap-5'>
    //           <p>
    //             {objectData.Logo ? 'Logo Active' : ' Logo'}
    //             <FormSwitch name='Logo' />
    //           </p>
    //           <p className=''>
    //             {objectData.Search ? 'Search Active' : 'Search'}
    //             <FormSwitch name={'Search'}></FormSwitch>
    //           </p>
    //           <p className=''>
    //             {objectData.Blob ? 'Blog Active' : 'Blog'}
    //             <FormSwitch name={'Blob'}></FormSwitch>
    //           </p>
    //           <p className=''>
    //             {objectData.Categories ? 'Categories Active' : 'Categories'}
    //             <FormSwitch name={'Categories'}></FormSwitch>
    //           </p>

    //           <p className=' '>
    //             {objectData.baseUrl ? 'baseUrl Active' : 'baseUrl'}
    //             <FormSwitch name={'baseUrl'}></FormSwitch>
    //           </p>
    //           <p className=' '>
    //             {objectData.User ? 'User Active' : 'User'}
    //             <FormSwitch name={'User'}></FormSwitch>
    //           </p>
    //           <p className=''>
    //             {objectData.Cart ? 'Cart Active' : 'Cart'}
    //             <FormSwitch name={'Cart'}></FormSwitch>
    //           </p>
    //           <p className=' '>
    //             {objectData.Newsletter ? 'Newsletter Active' : 'Newsletter'}
    //             <FormSwitch name={'Newsletter'}></FormSwitch>
    //           </p>
    //           <p className=' '>
    //             {objectData.clarifyTimeoutError
    //               ? 'clarifyTimeoutError Active'
    //               : 'ClarifyTimeoutError'}
    //             <FormSwitch name={'clarifyTimeoutError'}></FormSwitch>
    //           </p>
    //           <p className=' '>
    //             {objectData.code ? 'Code Active' : 'Code'}
    //             <FormSwitch name={'code'}></FormSwitch>
    //           </p>
    //         </div>
    //       </Form>
    //     </Form>
    //   </PageInnerContainer>
    // </PageInnerContainer>
    <>
      <PageInnerContainer>
        <MPHPHeader headerData={data?.data?.data?.content[0].template.Header} />
      </PageInnerContainer>
    </>
  );
};

export default GlobalConfigBody;
