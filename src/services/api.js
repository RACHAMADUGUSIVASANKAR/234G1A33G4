import axios from "axios";
import { TOKEN } from "../config";

const api = axios.create({
  baseURL: "http://4.224.186.213/evaluation-service",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default api;