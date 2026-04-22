import { Elysia } from "elysia";

export default function Api(prefix: string) {
    const api = new Elysia({ prefix })
        .get("/health", ({ status }) => {
            return status(200, "OK");
        });
    return api;
}
