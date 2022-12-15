import axios from "axios";

export const axiosInstance = axios.create({
  baseUrl: "https://lit-falls-68363.herokuapp.com/",
});
