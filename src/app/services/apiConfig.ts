import axios from "axios";

const apiHost = import.meta.env.VITE_API_HOST;

const apiFetch = axios.create({
  baseURL: apiHost,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiFetch;
