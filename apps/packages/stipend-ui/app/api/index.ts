import { Api } from "@fabulous-example/stipend-api";

const api = Api("/api", process.env.BACKEND_API_KEY);

export default api;
export type Backend = typeof api;

