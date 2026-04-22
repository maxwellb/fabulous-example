import { serverClient } from "@/app/api/client/serverClient";

export default async function ApiStatus() {
    const response = await serverClient.health.get();
    return (
        <div>API status (server): {response.error ? "Error" : `${response.status} OK`}</div>
    );
}
