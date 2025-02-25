// import Market from '@/modal/Market';
// import PaginatedResponse from '@/modal/PaginatedResponse';
import { SETTINGS_SERVICE_BASE_URL } from '@/configuration/config';
import Market from '@/model/Market';
import PaginatedResponse from '@/model/PaginatedResponse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

const config = {
  baseURL: SETTINGS_SERVICE_BASE_URL,
};

//axios calling by this function
function getMarkets(filters) {
  return httpService.get('markets', {
    ...config,
    params: {
      name: filters.name,
      perPage: filters.perPage,
      page: filters.page - 1,
      sort: filters.sort,
      status: filters.status,
    },
  });
}

//single data calling from this function
export const getMarket = (marketId) => {
  return httpService.get(`markets/${marketId}`, {
    ...config,
  });
};

//get all data from zone api following the filters conditions
export const useGetMarkets = (filters) => {
  return useQuery({
    queryKey: ['markets', JSON.stringify(filters)],
    queryFn: () => getMarkets(filters),
    refetchOnWindowFocus: false,
    select: (response) => new PaginatedResponse(response.data.data, Market),
    // select: (response) => console.log(response.data?.data),
  });
};

//Zone data add service function here
const addMarket = (market) => {
  return httpService.post('markets', market, {
    ...config,
  });
};

//Single Edit data of zone functional service here ....
const editMarket = (market) => {
  return httpService.put(`markets/${market.id}`, market, {
    ...config,
  });
};

//Get single data to view data on modal service here ...
export const useGetSingleMarket = (marketId) => {
  return useQuery({
    queryKey: ['markets', marketId],
    queryFn: () => getMarket(marketId),
    refetchOnWindowFocus: false,
    select: (response) => new Market(response.data?.data?.content[0]),
  });
};

//data create from ui to db service ...
export const useAddMarket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-markets'],
    mutationFn: addMarket,
    select: (response) => new Market(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markets'] });
    },
  });
};

// Edit any single data from UI and update to db service here ...
export const useEditMarket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-market'],
    mutationFn: editMarket,
    select: (response) => new Market(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: ['markets', payload.id] });
      queryClient.invalidateQueries({ queryKey: ['markets'] });
    },
  });
};

//export all service as default ...
const marketSettingService = {
  getMarket,
  useGetSingleMarket,
  useAddMarket,
  useEditMarket,
};

export default marketSettingService;
