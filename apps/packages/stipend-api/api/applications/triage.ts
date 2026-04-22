import { submissionDb, applicationDb } from ".";
import type { Application, Submission } from ".";
import { DateTime } from "luxon";

export default async function Triage() {
    submissionDb.entries().filter(([_, submission]) => !submission.reviewTier)
        .forEach(([applicationId, submission]) => {
            if (submission.riskFlags === undefined) {
                submission.riskFlags = [];
            }
            const application = applicationDb.get(applicationId) as Application;
            if (!application) {
                console.error(`No application found for submission ${applicationId}`);
                return;
            }

            const requestThreshold = 1000;
            const applicantDob = DateTime.fromISO(application.applicant.dob)
                || DateTime.fromFormat(application.applicant.dob, "M/d/yyyy")
                || DateTime.fromFormat(application.applicant.dob, "MM/dd/yyyy")
                || DateTime.fromFormat(application.applicant.dob, "yyyy-MM-dd");
            const minAge = 18;
            const maxDob = DateTime.now().minus({ years: minAge });
            const applicantAgeThreshold = applicantDob > maxDob;

            if (Number(application.programInfo.amountRequested) > requestThreshold) {
                submission.riskFlags.push(`request_threshold\nAmount requested exceeds $${requestThreshold}`);
            }
            if (applicantAgeThreshold) {
                submission.riskFlags.push(`age_threshold\nApplicant age below ${minAge}`);
            }
            if (!application.programInfo.agreementComplete) {
                submission.riskFlags.push("agreement_incomplete\nAgreement not complete");
            }

            if (submission.riskFlags.length > 0) {
                submission.reviewTier = "manual_review";
                console.log(`Application ${applicationId} flagged for manual review:\n\n${submission.riskFlags.join("\n\n")}`);
            } else {
                submission.reviewTier = "standard";
            }

            submissionDb.set(applicationId, submission);
        });
}
