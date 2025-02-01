import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
  return response.data;
};

const postData = async <T>(endpoint: string, data: T) => {
  const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
  return response.data;
};

const deleteData = async (endpoint: string, id: number) => {
  await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`);
  return id;
};

const editData = async <T>(endpoint: string, id: number, data: T, isPatch = false) => {
  const method = isPatch ? "patch" : "put";
  const response = await axios[method](`${API_BASE_URL}/${endpoint}/${id}`, data);
  return response.data;
};

export const useFetchData = <T>(endpoint: string) => {
  return useQuery<T, Error>({
    queryKey: [endpoint],
    queryFn: () => fetchData(endpoint),
  });
};

export const usePostData = <T>() => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ endpoint, data }: { endpoint: string; data: T }) =>
      postData(endpoint, data),
    onSuccess: (_, { endpoint }) => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });
};

export const useDeleteData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ endpoint, id }: { endpoint: string; id: number }) =>
      deleteData(endpoint, id),
    onSuccess: (_, { endpoint }) => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });
};

export const useEditData = <T>() => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      endpoint,
      id,
      data,
      isPatch,
    }: {
      endpoint: string;
      id: number;
      data: T;
      isPatch?: boolean;
    }) => editData(endpoint, id, data, isPatch),
    onSuccess: (_, { endpoint }) => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });
};
