import axios from "axios";

const apiHost = import.meta.env.VITE_API_HOST;

export const useApiMock = import.meta.env.VITE_USE_API_MOCK;

const apiFetch = axios.create({
  baseURL: apiHost,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiFetch;
