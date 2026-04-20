See [notes.md](notes/notes.md) for now.

## Process

- Bootstrap `bun` management of project under `apps`
- `npm init` in repo root
- `npm install --save-dev bun` .. create `.gitignore`
- `npm install` chains `cd apps && npx bun install`
- Disable package-lock at root so "real" packages don't get confused
- `npm run dev` chains `cd apps && npx bun run dev`
- Run project creation from templates via CLI
