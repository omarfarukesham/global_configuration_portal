import { GLOBAL_CONFIGURATION_SERVICE_BASE_URL } from '@/configuration/config';
import ErrorResponse from '@/model/ErrorResponse';
import PaginatedResponse from '@/model/PaginatedResponse';
import Product from '@/model/Product';
import ProductShelf from '@/model/ProductShelf';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import httpService from '../http/httpService';

const config = {
  baseURL: GLOBAL_CONFIGURATION_SERVICE_BASE_URL,
};

const getProductShelves = (filters) => {
  return httpService.get('product-shelves', {
    ...config,
    params: {
      ...filters,
      size: filters.perPage,
      page: filters.page - 1,
    },
  });
};

const getProductShelf = (productShelfId) => {
  return httpService.get(`product-shelves/${productShelfId}`, {
    ...config,
  });
};

const getProductShelfDetails = (productShelfId) => {
  return httpService.get(`product-shelves/${productShelfId}/details`, {
    ...config,
  });
};

const addProductShelf = (productShelf) => {
  return httpService
    .post('product-shelves', productShelf, {
      ...config,
    })
    .catch((e) => Promise.reject(new ErrorResponse(e.response.data)));
};

const editProductShelf = (productShelf) => {
  return httpService
    .put(`product-shelves/${productShelf.id}`, productShelf, {
      ...config,
    })
    .catch((e) => Promise.reject(new ErrorResponse(e.response.data)));
};

export const useGetProductShelves = (filters) => {
  return useQuery({
    queryKey: ['product-shelves', JSON.stringify(filters)],
    queryFn: () => getProductShelves(filters),
    refetchOnWindowFocus: false,
    select: (response) =>
      new PaginatedResponse(response.data.data, ProductShelf),
  });
};
export const useGetProductShelfDetails = (ProductShelfId) => {
  return useQuery({
    queryKey: ['product-shelves-details', ProductShelfId],
    queryFn: () => getProductShelfDetails(ProductShelfId),
    refetchOnWindowFocus: false,
    select: (response) =>
      response.data?.data?.content[0].products.map(
        (product) => new Product(product),
      ),
  });
};

export const useGetProductShelf = (productShelfId) => {
  return useQuery({
    queryKey: ['product-shelves', productShelfId],
    queryFn: () => getProductShelf(productShelfId),
    refetchOnWindowFocus: false,
    select: (response) => new ProductShelf(response.data?.data?.content[0]),
  });
};

export const useAddProductShelf = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-product-shelf'],
    mutationFn: addProductShelf,
    select: (response) => new ProductShelf(response.data?.data?.content[0]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-shelves'] });
    },
  });
};

export const useEditProductShelf = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-product-shelf'],
    mutationFn: editProductShelf,
    select: (response) => new ProductShelf(response.data?.data?.content[0]),
    onSuccess: (response, payload) => {
      queryClient.invalidateQueries({
        queryKey: ['product-shelf', payload.id],
      });
      queryClient.invalidateQueries({ queryKey: ['product-shelves'] });
    },
  });
};

const GCProductShelfServices = {
  useGetProductShelves,
  useGetProductShelf,
  useAddProductShelf,
  useEditProductShelf,
};

export default GCProductShelfServices;
