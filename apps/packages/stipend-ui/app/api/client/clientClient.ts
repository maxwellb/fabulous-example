import { treaty } from "@elysiajs/eden";
import type { Backend } from "..";

const publicHost = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

export const clientClient = treaty<Backend>(`${publicHost}/api`);
