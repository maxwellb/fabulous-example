import { Elysia } from "elysia";
import applications from "./applications";

export default function Api(prefix: string, apiKey?: string) {
    const api = new Elysia({ prefix })
        .get("/health", ({ status }) => {
            return status(200, "OK");
        })
        .onBeforeHandle(
            ({ headers, status }) => {
                if (apiKey && headers["x-api-key"] !== apiKey) {
                    return status(401, "Unauthorized");
                }
            }
        )
        .use(applications);

    return api;
}
