import axios from "axios";
import { AppConfig } from "../config";

const ApiClient = axios.create({
  baseURL: AppConfig.ApiUrl,
});

export default ApiClient;
