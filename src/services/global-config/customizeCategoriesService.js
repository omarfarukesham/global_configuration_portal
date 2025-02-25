import { GLOBAL_CONFIGURATION_SERVICE_BASE_URL } from '@/configuration/config';
import CustomizeCategories from '@/model/CustomizeCategories';
import ErrorResponse from '@/model/ErrorResponse';
import PaginatedResponse from '@/model/PaginatedResponse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

const config = {
  baseURL: GLOBAL_CONFIGURATION_SERVICE_BASE_URL,
};

const getCustomizeCategories = (filters) => {
  return httpService.get('customize-categories', {
    ...config,
    params: {
      ...filters,
      size: filters.perPage,
      page: filters.page - 1,
    },
  });
};

const getCustomizeCategory = (customizeCategoryId) => {
  return httpService.get(`customize-categories/${customizeCategoryId}`, {
    ...config,
  });
};

const addCustomizeCategory = (customizeCategory) => {
  return httpService
    .post('customize-categories', customizeCategory, {
      ...config,
    })
    .catch((e) => Promise.reject(new ErrorResponse(e.response.data)));
};

const editCustomizeCategory = (productShelf) => {
  return httpService
    .put(`customize-categories/${productShelf.id}`, productShelf, {
      ...config,
    })
    .catch((e) => Promise.reject(new ErrorResponse(e.response.data)));
};

export const useGetCustomizeCategories = (filters) => {
  return useQuery({
    queryKey: ['customize-categories', JSON.stringify(filters)],
    queryFn: () => getCustomizeCategories(filters),
    refetchOnWindowFocus: false,
    select: (response) =>
      new PaginatedResponse(response.data.data, CustomizeCategories),
  });
};

export const useGetCustomizeCategory = (customizeCategoryId) => {
  return useQuery({
    queryKey: ['customize-categories', customizeCategoryId],
    queryFn: () => getCustomizeCategory(customizeCategoryId),
    refetchOnWindowFocus: false,
    select: (response) =>
      new CustomizeCategories(response.data?.data?.content[0]),
  });
};

export const useAddCustomizeCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-customize-categories'],
    mutationFn: addCustomizeCategory,
    select: (response) =>
      new CustomizeCategories(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customize-categories'] });
    },
  });
};

export const useEditCustomizeCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-customize-categories'],
    mutationFn: editCustomizeCategory,
    select: (response) =>
      new CustomizeCategories(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({
        queryKey: ['product-shelf', payload.id],
      });
      queryClient.invalidateQueries({ queryKey: ['customize-categories'] });
    },
  });
};

const customizeCategoriesService = {
  useGetCustomizeCategories,
  useGetCustomizeCategory,
  useAddCustomizeCategory,
  useEditCustomizeCategory,
};

export default customizeCategoriesService;
