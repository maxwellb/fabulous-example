import { Elysia, t } from "elysia";
import Triage from "./triage";

const applicationSchema = t.Object({
    applicant: t.Object({
        firstName: t.String(),
        lastName: t.String(),
        email: t.String(),
        phone: t.String(),
        dob: t.String(),
        ssn: t.String(),
        address: t.String(),
        address2: t.Optional(t.String()),
        city: t.String(),
        state: t.String(),
        zip: t.String()
    }),
    programInfo: t.Object({
        programName: t.String(),
        amountRequested: t.String(),
        agreementComplete: t.Boolean()
    })
});

export type Application = typeof applicationSchema['static'];

export const applicationDb = new Map<string, Application>();

const submissionSchema = t.Object({
    applicationId: t.String({ format: "uuid" }),
    timeSubmitted: t.String({ format: "date-time" }),
    reviewTier: t.Optional(t.UnionEnum(["standard", "manual_review"])),
    riskFlags: t.Optional(t.Array(t.String()))
});

export type Submission = typeof submissionSchema['static'];

export const submissionDb = new Map<string, Submission>();

const applications = new Elysia()
    .get("/applications", () => "applications")
    .post("/applications", async ({ body, status }) => {
        const applicationId = crypto.randomUUID();
        console.log("Received application: ", applicationId);
        const logBody = {...body};
        if (logBody.applicant) {
            if (logBody.applicant.ssn) {
                logBody.applicant.ssn = "*".repeat(logBody.applicant.ssn.length);
            }
            if (logBody.applicant.phone) {
                logBody.applicant.phone = logBody.applicant.phone.replace(/(\d{1,3})([^d].*?)(\d{1,3})([^d].*?)(\d.*)$/, "$1$2$3$4*****");
            }
            if (logBody.applicant.email) {
                logBody.applicant.email = logBody.applicant.email.replace(/(.{2})(.*)(@.*)/, "$1***$3");
            }
        }
        console.log(JSON.stringify(logBody, null, 2));
        console.log("====");

        applicationDb.set(applicationId, <Application>body);

        submissionDb.set(applicationId, {
            applicationId,
            timeSubmitted: new Date().toISOString()
        });

        await Triage();

        return status(201, { applicationId });
    }, {
        body: applicationSchema,
        response: {
            201: t.Object({
                applicationId: t.String({ format: "uuid" })
            })
        }
    });

export default applications;
