"use client";

import { clientClient } from "@/app/api/client/clientClient";
import { useEffect, useState } from "react";

export default function ApiHealth() {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        async function fetchHealth() {
            const response = await clientClient.health.get();
            setData(response.error ? "Error" : `${response.status} OK`);
        }
        fetchHealth();
    }, []);

    return (
        <div>API health: {data}</div>
    );
}
