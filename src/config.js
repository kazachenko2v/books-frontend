import axios from "axios";

export const axiosInstance = axios.create({
  baseUrl: "https://books-7jdf.onrender.com",
});
