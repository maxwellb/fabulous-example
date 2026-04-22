import { Api } from "@fabulous-example/stipend-api";

const api = Api("/api");
export default api;
export type Backend = typeof api;

