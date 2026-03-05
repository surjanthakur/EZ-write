import axios from "axios";

const API_URL = axios.create({
  baseURL: "http://localhost:8000/api/v1.0/posts",
  withCredentials: true,
});
