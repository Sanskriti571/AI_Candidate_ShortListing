import axios from "axios";

const API = axios.create({
  baseURL: "https://ats-backend-080t.onrender.com/api",
});

export default API;