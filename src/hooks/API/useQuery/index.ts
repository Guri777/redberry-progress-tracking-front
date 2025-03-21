import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const useFetchQuery = <T>(
  key: string,
  endpoint: string,
  options?: UseQueryOptions<T, Error>,
) => {
  return useQuery<T, Error>({
    queryKey: [key],
    queryFn: async () => {
      const response = await apiClient.get<T>(endpoint);
      return response.data;
    },
    ...options,
  });
};
