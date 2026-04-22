"use client";

import Link from "next/link";

export default function CTA() {
    return (
        <div className="mt-4 mb-4">
            <Link href="/apply"
                className="bg-blue-400 text-white px-6 py-3 rounded-md font-bold">
                Apply Now!
            </Link>
        </div>
    );
}
