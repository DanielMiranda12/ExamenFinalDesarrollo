import axios from "axios";

const API = axios.create({
  baseURL: "https://6931faa111a8738467d128b6.mockapi.io/api/v1"
});

export default API;
