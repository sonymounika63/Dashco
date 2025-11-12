# Scripts

This folder contains utility and deployment scripts for the project.

## Scripts

### `deploy-commit.js`
Deploy a specific git commit to GitHub Pages for viewing past versions.

**Usage:**
```bash
npm run deploy:commit <commit-hash> [custom-name]
```

**Example:**
```bash
npm run deploy:commit abc123f
npm run deploy:commit abc123f "feature-name"
```

### `list-deployments.js`
List all deployed commits with their URLs and deployment information.

**Usage:**
```bash
npm run list:deployments
```

### `verify-oauth.js`
Verify OAuth configuration for Supabase authentication.

**Usage:**
```bash
npm run verify-oauth
```

**Checks:**
- Environment variables (.env file)
- Supabase URL and API keys
- OAuth callback configuration
- Documentation completeness

## Documentation

See `../docs/DEPLOY-COMMITS.md` for deployment documentation.

