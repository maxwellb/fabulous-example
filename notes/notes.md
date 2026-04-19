
## TODO

- [ ] UI: stipend-ui
- [ ] API: stipend-api
- [ ] Install with `npm install`
- [ ] Run with `npm run dev`
- [ ] API: `POST /api/applications` returns `applicationId`
- [ ] API: Storage
- [ ] API/UI: Auth with `X-API-Key` or `401`
- [ ] API: `reviewTier: standard`
- [ ] API: `reviewTier: manual_review`


## Misc notes

### Manual Review

Informs structure of application

Rules for manual review

- `amount_requested > threshold`
  - `threshold = '$1000'`
- `applicant_age < minimum_age`
  - `applicant_dob`
  - `minimum_age = '18 years'`
- `ssn match (pattern)`
- "Other simple, deterministic checks"

### Further processing

- API/UI data in memory
- Initial data processing (API) with review/etc.
- Workflow state data - new Storage
  - Access pattern for "System B"

### README

- [ ] PII Handling: what is sensitive
- [ ] PII Handling: how it is handled
- [ ] Business rules: how triage logic works
- [ ] AI Tool usage: describe
