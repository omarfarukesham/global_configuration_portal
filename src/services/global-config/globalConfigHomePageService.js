import { GLOBAL_CONFIGURATION_SERVICE_BASE_URL } from '@/configuration/config';
import { useQuery } from '@tanstack/react-query';
import httpService from '../http/httpService';

const config = {
  baseURL: GLOBAL_CONFIGURATION_SERVICE_BASE_URL,
};

const getGlobalConfigs = () => {
  return httpService.get('global-configurations', {
    ...config,
  });
};
const getGlobalConfig = (globalConfigId) => {
  return httpService.get(`global-configurations/${globalConfigId}`, {
    ...config,
  });
};

export const useGetGlobalConfigs = () => {
  return useQuery({
    queryKey: ['global-configurations', JSON.stringify()],
    queryFn: () => getGlobalConfigs(),
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      // Handle the response data here
      response.data?.data;
    },
    // select: (response) => new PaginatedResponse(response.data.data, TaxRate),
  });
};

export const useGetGlobalConfig = (configId) => {
  return useQuery({
    queryKey: ['global-configurations', configId],
    queryFn: () => getGlobalConfig(configId),
    refetchOnWindowFocus: false,
    // select: (response) => new TaxRate(response.data?.data?.content[0]),
  });
};

const globalConfigHomePageService = {
  useGetGlobalConfigs,
  useGetGlobalConfig,
};

export default globalConfigHomePageService;
