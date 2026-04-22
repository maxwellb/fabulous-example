# README (This File)

Note: I did perform a commit and push after the original submission

- To push changes that were uncommitted at the time of submission
- To finalize the in-progress focus
- To add clarity to the README for the reviewer

I do think in total, the level of effort represented in this repository
is approximately 4 hours of development time.

Given some distractions in my environment during the evening, I
chose not to treat 12:00 AM as a strict "pencils down". Neither did
I extend the scope of my submission to additional areas.

Please see [Next Steps](#next-steps).

## Process

- Bootstrap `bun` management of project under `apps`
- `npm init` in repo root
- `npm install --save-dev bun` .. create `.gitignore`
- `npm install` chains `cd apps && npx bun install`
- Disable package-lock at root so "real" packages don't get confused
- `npm run dev` chains `cd apps && npx bun run dev`
- Run project creation from templates via CLI
- Add MDX support
- Run "apps" concurrently
- Run from root `package.json`
- Host api on "/api"
- Managed client, server actions, separate package for api

## What was Built

- Clone this repository
- Run `npm install` followed by `npm run dev`
- Support for `npm run clean` to clean `node_modules` and `.next`

### 1. User Interface

See https://localhost:3000/ and https://localhost:3000/apply .

### 2. API Endpoint

API is defined in the [stipend-api](./apps/packages/stipend-api/README.md) project.

API is hosted on the Next.js app via [/api/*](./apps/packages/stipend-ui/app/api/[[...slugs]]/route.ts) .

API Key is defined in [stipend-ui/.env](./apps/packages/stipend-ui/.env) and passed to the [factory method `Api(prefix: string, apiKey?: string)`](./apps/packages/stipend-api/index.ts) .

### 3. Basic Business Rules (Triage)

See [triage.ts](./apps/packages/stipend-api/api/applications/triage.ts) .

### 4. Downstream Handoff

See the separation of "tables" (in-memory `Map` types for this demo) in [stipend-api/api/applications](./apps/packages/stipend-api/api/applications/index.ts) .

The design begins to accommodate least-privilege access by separating workflow state from application data.

For example, the application data might have row-level security or other authorization checks and
auditing. And if the submission status doesn't even need to be updated, the raw application data is
not even being scanned through.

### 5. Minimal Testing

Primarily, I performed manual testing. I would add coded tests in later next steps with some additional time.

Reference: https://elysiajs.com/patterns/unit-test.html

That being said, I did validate the API returns 401 by implementing a GET endpoint at `/api/applications`.

Also, the root page at https://localhost:3000/ has a status display for API success response of a `/health`
health-check endpoint. It is exercised both as a client component and a server component.

That said, the API is defined with schemas that validate.

## PII Handling

- Any user provided data is sensitive - applicant information and program information are stored separately
  - In fully implemented scenarios, these would be separately enhanced, and have independent access and
    authorization
- Specific identifiers such as email, DOB, etc. get extra treatment when logging
  - In this demo, selective masking of submitted data
  - `console.log` represents any type of monitoring or logging (Sentry, New Relic, disk log, etc.)


## Business Rules and Handoff

- The application form is handled by a server action
- The server action POSTs to the API with the API key defined in `.env`
- The endpoint validates against a schema
- For demo purposes, the application JSON body is logged to the console after
  obfuscation of PII
- The application data is persisted to `applicationDb` (in-memory map)
- A submission record is created with the `applicationId` and review flags (time
  submitted, review flags, risk tier)
- After an application is submitted, the API performs a triage pass
    - For demo purposes, perform full scan on every submission
    - Find submissions without a `review_tier` value
    - Retrieve individual application from `applicationDb`
    - Perform logic checks - for each condition met, add a review flag
    - If any review flags were set, set `review_tier` to `manual`, otherwise `standard`
- Redirect the user to a new page: `/application-submitted?applicationId={...}`
  on success, `/application-submitted/error` on error

## AI Tool usage

I did not use any agentic coding. However, I do have an active
GitHub copilot subscription, and this provided smart completions
in several cases. I would characterize this as saving me a few
seconds here and there.

In more extreme cases, after performing an edit to populate a DTO,
the inline suggestions assisted with the boilerplate of performing
similar code to later properties after I began implementing code
on the first several properties.

Additionally, web search results today have an AI component
which assisted me with information retrieval, documentation,
usage examples, etc.

## Next Steps

I spent some additional time after submitting my email wrapping
up, as described at the [top of this README](#readme-this-file).

With additional time to implement, I would focus on the following areas:

- Unit tests per https://elysiajs.com/patterns/unit-test.html
  - Especially to codify validations already occurring on the API
    to survive later code changes and refactoring
  - Straightforward mocking of request/response
- **NOTE:** API Key is not required in the `npm run dev`/`bun dev` of the
  __stipend-api__ project.
  - [server.ts](./apps/packages/stipend-api/server.ts) does not add a required `X-API-Key` header
  - [stipend-ui/api/*](./apps/packages/stipend-ui/app/api/index.ts) does
  - In this demo, even for a static API key, it keeps it to one copy instead of two
  - Developer testing on http://localhost:9000/applications does not need `X-API-Key`
- Refinement of data validation and formats, including opportunity for the client to
  correct the submission and retry.
  - native calendar control
  - fixing bugs in date-to-API transformation, and API request parsing
  - unit tests with mock http requests for edge cases and data diversity
- Completion of requested manual review rules (current version has a clear place for this to go)
  - _Applicant under 18_ - currently implemented but failing
  - _Invalid or unusual SSN patterns_ - TODO
- Demonstration of downstream processing or access. There is not a way to introspect
  the in-memory `Map` objects in this version
- Add [OpenAPI](https://elysiajs.com/patterns/openapi.html) interface when
  `NODE_ENV !== "production"`

In addition to what I would do next to complete the current scope,
I have areas of next possible improvement across different areas of interest.

- Demonstrate calling the API from external tools (cURL, etc.)
- More graceful handling of errors on UI