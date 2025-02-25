import { CONTENT_SERVICE_BASE_URL } from '@/configuration/config';
import { useMutation } from '@tanstack/react-query';
import httpService from '../http/httpService';

const config = {
  baseURL: CONTENT_SERVICE_BASE_URL,
};

const uploadContentS3 = (data) => {
  return httpService.post('s3/content-upload', data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
const uploadContentFTP = (data) => {
  return httpService.post('ftp/content-upload', data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
const directUploadContent = (data) => {
  return httpService.post('direct-content-upload', data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUploadContentS3 = () => {
  return useMutation({
    mutationKey: ['s3-upload-content'],
    mutationFn: uploadContentS3,
  });
};
export const useUploadContentFTP = () => {
  return useMutation({
    mutationKey: ['ftp-upload-content'],
    mutationFn: uploadContentFTP,
  });
};
export const useDirectUploadContent = () => {
  return useMutation({
    mutationKey: ['direct-upload-content'],
    mutationFn: directUploadContent,
  });
};
const contentService = {
  useUploadContentS3,
  useUploadContentFTP,
  useDirectUploadContent,
};

export default contentService;
