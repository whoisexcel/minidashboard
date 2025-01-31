import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async (endpoint: string) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/${endpoint}`);
  return response.data;
};

const useFetchData = (endpoint: string) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchData(endpoint),
  });
};

export default useFetchData;



