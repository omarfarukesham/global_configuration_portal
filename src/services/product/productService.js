import { CATALOG_SERVICE_BASE_URL } from '@/configuration/config';
import PaginatedResponse from '@/model/PaginatedResponse';
import Product from '@/model/Product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

const config = {
  baseURL: CATALOG_SERVICE_BASE_URL,
};

const getProducts = (filters) => {
  return httpService.get('products', {
    ...config,
    params: {
      ...filters,
      titleEn: filters.name,
      size: filters.perPage,
      page: filters.page - 1,
    },
  });
};
const getProduct = (id) => {
  return httpService.get(`products/${id}`, {
    ...config,
  });
};
const addProduct = (data) => {
  return httpService.post('products', data, {
    ...config,
  });
};

const editProduct = (data) => {
  return httpService.put(`products/${data.id}`, data, {
    ...config,
  });
};

export const useGetProducts = (filters = {}) => {
  return useQuery({
    queryKey: ['products', JSON.stringify(filters)],
    queryFn: () => getProducts(filters),
    refetchOnWindowFocus: false,
    select: (response) => new PaginatedResponse(response.data.data, Product),
  });
};

export const useGetProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    refetchOnWindowFocus: false,
    // select: (response) => new Product(response.data?.data?.content[0]),
    select: (response) => new Product(response.data?.data?.content[0]),
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
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-product'],
    mutationFn: addProduct,
    select: (response) => new Product(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
export const useEditProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-product'],
    mutationFn: editProduct,
    select: (response) => new Product(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({ queryKey: ['product', payload.id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
const productService = {
  useGetProducts,
  useGetProduct,
  useAddProduct,
  useEditProduct,
};

export default productService;
