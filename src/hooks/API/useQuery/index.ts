import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'https://momentum.redberryinternship.ge/api';
const BEARER_TOKEN = '9e6c6a5d-4451-409b-b271-d67750053df0';

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
