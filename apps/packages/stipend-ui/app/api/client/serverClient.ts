import "server-only";
import { treaty } from "@elysiajs/eden";
import type { Backend } from "..";

const host = process.env.BACKEND_URL || `${process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"}/api`;

export const serverClient = treaty<Backend>(host);
