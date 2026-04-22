# README (This File)


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

## PII Handling

- Any user provided data is sensitive
- Specific identifiers such as email, DOB, etc. get extra treatment

## Business Rules and Handoff

- TODO

## AI Tool usage

I did not use any agentic coding. However, I do have an active
GitHub copilot subscription, and this provided smart completions
in several cases. I would characterize this as saving me a few
seconds here and there.

Additionally, web search results today have an AI component
which assisted me with information retrieval, documentation,
usage examples, etc.

