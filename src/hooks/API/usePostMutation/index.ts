import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

export const usePostMutation = <T, V>(
  url: string,
  method: 'POST' | 'PUT' = 'POST',
) => {
  return useMutation<T, Error, V>({
    mutationFn: async (data: V) => {
      const isFormData = data instanceof FormData;
      const headers = isFormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' };

      const response = await apiClient.request<T>({
        url,
        method,
        data,
        headers,
      });

      return response.data;
    },
  });
};
