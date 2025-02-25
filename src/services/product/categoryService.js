// import Category from '@/model/Category';
import { CATALOG_SERVICE_BASE_URL } from '@/configuration/config';
import Category from '@/model/Category';
import PaginatedResponse from '@/model/PaginatedResponse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

const config = {
  baseURL: CATALOG_SERVICE_BASE_URL,
};

const getCategories = (filters) => {
  return httpService.get('categories', {
    ...config,
    params: {
      ...filters,
      size: filters ? filters.perPage : '',
      page: filters ? filters.page - 1 : '',
    },
  });
};

const getCategory = (id) => {
  return httpService.get(`categories/${id}`, {
    ...config,
  });
};

const addCategory = (data) => {
  return httpService.post('categories', data, {
    ...config,
  });
};

const edit = (data) => {
  return httpService.put(`categories/${data.id}`, data, {
    ...config,
  });
};

export const useGetCategories = (filters) => {
  return useQuery({
    queryKey: ['categories', JSON.stringify(filters)],
    queryFn: () => getCategories(filters),
    refetchOnWindowFocus: false,
    // select: (response) => console.log(response.data.data),
    select: (response) => new PaginatedResponse(response.data.data, Category),
  });
};

export const useGetCategory = (id) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => getCategory(id),
    refetchOnWindowFocus: false,
    select: (response) => new Category(response.data?.data?.content[0]),
  });
};
export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-category'],
    mutationFn: addCategory,
    select: (response) => new Category(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-category'],
    mutationFn: edit,
    select: (response) => new Category(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: ['', payload.id] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

const categoryService = {
  useGetCategories,
  useGetCategory,
  useAddCategory,
  useEditCategory,
};

export default categoryService;
