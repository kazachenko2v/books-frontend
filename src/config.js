import axios from "axios";

console.log(window.location);

const qwe =
  window.location.hostname === "localhost"
    ? "http://localhost:8800"
    : "https://books-7jdf.onrender.com";

export const axiosInstance = axios.create({
  baseUrl: "https://books-7jdf.onrender.com",
});
