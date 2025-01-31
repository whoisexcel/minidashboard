import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch data from the API
const fetchData = async (endpoint: string) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/${endpoint}`);
  return response.data;
};

// Custom hook to fetch data with a generic type for better type safety
export const useFetchData = <T>(endpoint: string) => {
  return useQuery<T, Error>({
    queryKey: [endpoint],
    queryFn: () => fetchData(endpoint),
  });
};


