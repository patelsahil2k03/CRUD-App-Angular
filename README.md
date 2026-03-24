# CRUD-App-Angular

Production-hardened Angular CRUD frontend for Tutorials management.

## Overview

This repository contains an Angular 14 app that integrates with a backend API to:
- Create, read, update, and delete tutorials
- Search tutorials by title
- Toggle tutorial publish status

## Project Structure

- `angular-14-crud-example-master/` - Angular source project
- `angular-14-crud-example-master/src/app/components/` - UI screens
- `angular-14-crud-example-master/src/app/services/` - API integration
- `angular-14-crud-example-master/src/environments/` - environment configs

## Tech Stack

- Angular 14
- TypeScript (strict mode)
- Bootstrap 4
- Karma + Jasmine

## Prerequisites

- Node.js 16+ (recommended for Angular 14)
- npm 8+
- Running backend API (e.g. Node/PostgreSQL service)

## Setup

```bash
cd angular-14-crud-example-master
npm ci
```

## Configuration

The frontend API endpoint is configured in:
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Default value:
- `http://localhost:8080/api/tutorials`

If your backend runs on another host/port, update both environment files accordingly.

## Runbook

Start dev server:
```bash
cd angular-14-crud-example-master
npm start
```

Build production bundle:
```bash
npm run build
```

Run tests:
```bash
npm run test -- --watch=false --browsers=ChromeHeadless
```

## Production-Readiness Enhancements Applied

- Removed hardcoded branding and normalized navigation routes
- Added resilient loading/empty/error UI states
- Added input validation for create/update actions
- Added submit/save/delete in-flight guards to prevent duplicate requests
- Improved TypeScript typing in model/service methods
- Moved API base URL usage into environment configs
- Stabilized unit tests with proper testing module imports

## Security Notes

- Do not commit backend secrets or DB credentials in frontend repo
- Keep API URL non-secret and environment-specific
- Use backend-side CORS restrictions for allowed frontend origins

## Known Issues

- `npm audit` reports vulnerabilities from older Angular ecosystem dependencies in this legacy sample project.
- Upgrading Angular major version requires planned migration and compatibility testing.

## License

MIT
