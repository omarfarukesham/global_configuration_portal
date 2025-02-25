import { CATALOG_SERVICE_BASE_URL } from '@/configuration/config';
import Brand from '@/model/Brand';
import PaginatedResponse from '@/model/PaginatedResponse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

const config = {
  baseURL: CATALOG_SERVICE_BASE_URL,
};

const getBrands = (filters) => {
  return httpService.get('brands', {
    ...config,
    params: {
      ...filters,
      titleEn: filters.name,
      size: filters.perPage,
      page: filters.page - 1,
    },
  });
};
const getBrand = (id) => {
  return httpService.get(`brands/${id}`, {
    ...config,
  });
};
const addBrand = (data) => {
  return httpService.post('brands', data, {
    ...config,
  });
};

const editBrand = (data) => {
  return httpService.put(`brands/${data.id}`, data, {
    ...config,
  });
};

export const useGetBrands = (filters = {}) => {
  return useQuery({
    queryKey: ['brands', JSON.stringify(filters)],
    queryFn: () => getBrands(filters),
    refetchOnWindowFocus: false,
    select: (response) => new PaginatedResponse(response.data.data, Brand),
  });
};

export const useGetBrand = (id) => {
  return useQuery({
    queryKey: ['Brand', id],
    queryFn: () => getBrand(id),
    refetchOnWindowFocus: false,
    select: (response) => new Brand(response.data?.data?.content[0]),
  });
};

// export const useGetBrand = (brandId) => {
//   return useQuery({
//     queryKey: ['brand', brandId],
//     queryFn: () => getBrand(brandId),
//     refetchOnWindowFocus: false,
//     select: (response) => new Brand(response.data?.data?.content[0]),
//   });
// };
export const useAddBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-brand'],
    mutationFn: addBrand,
    select: (response) => new Brand(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
};

export const useEditBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-brand'],
    mutationFn: editBrand,
    select: (response) => new Brand(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: ['brand', payload.id] });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
};
const brandService = {
  useGetBrands,
  useGetBrand,
  useAddBrand,
  useEditBrand,
};

export default brandService;
