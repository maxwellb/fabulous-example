"use server";

import { serverClient } from "@/app/api/client/serverClient";
import { redirect } from "next/navigation";

export default async function formSubmit(formData: FormData) {
    let result = null;
    try {
        const response = await serverClient.applications.post({
            applicant: {
                firstName: formData.get("firstName") as string,
                lastName: formData.get("lastName") as string,
                email: formData.get("email") as string,
                phone: formData.get("phone") as string,
                dob: formData.get("dob") as string,
                ssn: formData.get("ssn") as string,
                address: formData.get("address") as string,
                address2: formData.get("address2") as string,
                city: formData.get("city") as string,
                state: formData.get("state") as string,
                zip: formData.get("zip") as string
            },
            programInfo: {
                programName: formData.get("programName") as string,
                amountRequested: formData.get("amountRequested") as string,
                agreementComplete: formData.get("agreementComplete") === "true"
            }
        }, {
            headers: {
                "x-api-key": process.env.BACKEND_API_KEY || ""
            }
        });

        if (response.error) {
            result = { error: response.error };
        } else {
            result = {
                data: {
                    applicationId: response.data.applicationId
                }
            };
        }
    } catch (error) {
        result = { error: error instanceof Error ? error.message : "Unknown error" };
    }

    if (result.error) {
        redirect("/application-submitted/error");
    } else {
        const searchParams = new URLSearchParams({ applicationId: result.data?.applicationId || "" }).toString();
        redirect(`/application-submitted?${searchParams}`);
    }
}
