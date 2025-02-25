import { GLOBAL_CONFIGURATION_SERVICE_BASE_URL } from '@/configuration/config';
import ErrorResponse from '@/model/ErrorResponse';
import PaginatedResponse from '@/model/PaginatedResponse';
import ProductPool from '@/model/ProductPool';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

const config = {
  baseURL: GLOBAL_CONFIGURATION_SERVICE_BASE_URL,
};

const getProductPools = (filters) => {
  return httpService.get('product-pools', {
    ...config,
    params: {
      ...filters,
      size: filters.perPage,
      page: filters.page - 1,
    },
  });
};

const getProductPool = (productPoolId) => {
  return httpService.get(`product-pools/${productPoolId}`, {
    ...config,
  });
};

const getProductPoolDetails = (productPoolId) => {
  return httpService.get(`product-pools/${productPoolId}/details`, {
    ...config,
  });
};

const addProductPool = (productPool) => {
  return httpService
    .post('product-pools', productPool, {
      ...config,
    })
    .catch((e) => Promise.reject(new ErrorResponse(e.response.data)));
};

const editProductPool = (productPool) => {
  return httpService
    .put(`product-pools/${productPool.id}`, productPool, {
      ...config,
    })
    .catch((e) => Promise.reject(new ErrorResponse(e.response.data)));
};

export const useGetProductPools = (filters) => {
  return useQuery({
    queryKey: ['product-pools', JSON.stringify(filters)],
    queryFn: () => getProductPools(filters),
    refetchOnWindowFocus: false,
    select: (response) =>
      new PaginatedResponse(response.data.data, ProductPool),
  });
};

export const useGetProductPool = (ProductPoolId) => {
  return useQuery({
    queryKey: ['product-pools', ProductPoolId],
    queryFn: () => getProductPool(ProductPoolId),
    refetchOnWindowFocus: false,
    select: (response) => new ProductPool(response.data?.data?.content[0]),
  });
};
export const useGetProductPoolDetails = (ProductPoolId) => {
  return useQuery({
    queryKey: ['product-pools-details', ProductPoolId],
    queryFn: () => getProductPoolDetails(ProductPoolId),
    refetchOnWindowFocus: false,
    select: (response) => new ProductPool(response.data?.data?.content[0]),
  });
};

export const useAddProductPool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-product-pool'],
    mutationFn: addProductPool,
    select: (response) => new ProductPool(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-pools'] });
    },
  });
};

export const useEditProductPool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-product-pool'],
    mutationFn: editProductPool,
    select: (response) => new ProductPool(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({
        queryKey: ['product-pools', payload.id],
      });
      queryClient.invalidateQueries({ queryKey: ['product-pools'] });
    },
  });
};

const GCProductPoolServices = {
  useGetProductPools,
  useGetProductPool,
  useAddProductPool,
  useEditProductPool,
};

export default GCProductPoolServices;
