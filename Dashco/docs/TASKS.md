# TASKS.md — Dashco Roadmap & Sprint Plan

## How to use

- Each task should be a small, testable change. Use branches named `feat/<short-desc>`.
- All schema/auth/storage changes must include migrations + unit tests + dry-run patches.

---

## Sprint 1 — Core Integration & Dynamic Setup (Nov 2025)

**Goal:** Make Dashco dynamic — Supabase integration, Google OAuth, backend schema, file upload, and minimal connected frontend.
**Duration:** 2 weeks (10 work days + buffer)

Based on PRD requirements:

- Product Owner Dashboard (Super Admin) - Companies, Packages, Certificates, Items, Users management
- Company Onboarding - Activation flow with 2FA
- Company Dashboard - Projects, Documents, Checklists, Workflows, User Management
- Core database schema with RLS policies
- Authentication (Google OAuth + Email)
- File storage for documents
- Audit logging

| Day             | Focus                          | Deliverables                                                                                                                                   | Status | Notes                                          |
| --------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------- |
| **Day 1**       | Setup Supabase Project         | Confirm Supabase DB URL & API keys.`<br>`Connect safely in `.env`.`<br>`Init supabase CLI.                                                     | ✅     | Completed                                      |
| **Day 2**       | Database Design                | Create ERD.`<br>`Define tables: users, companies, projects, documents, checklists, checklist_items, packages, certificates, items, audit_logs. | ✅     | Migration created with all core tables per PRD |
| **Day 3**       | Migration Execution            | Apply migration via Supabase CLI.`<br>`Verify tables & constraints.                                                                            | ⬜     | Pending                                        |
| **Day 4**       | RLS Policies & Roles           | Enable RLS.`<br>`Policies: super_admin, sub_admin, compliance_manager, project_manager, management, company members.                           | ✅     | RLS policies created for all tables            |
| **Day 5**       | Auth Integration               | Implement Google OAuth + email signup/login using Supabase Auth.`<br>`Wire frontend Login page.                                                | ✅     | Auth integration completed                     |
| **Day 6**       | Edge Function `create-project` | Use service_role safely.`<br>`Write audit log entry.                                                                                           | ⬜     | Pending                                        |
| **Day 7**       | File Storage Setup             | Buckets `private-docs` & `public-assets`.`<br>`Upload validation + signed URLs.                                                                | ⬜     | Pending                                        |
| **Day 8**       | Frontend Project Page          | Connect create/list UI to API.`<br>`Display uploaded files.                                                                                    | ⬜     | Pending                                        |
| **Day 9**       | Smoke Testing                  | Manual test: Signup → Company → Project → Upload.                                                                                              | ⬜     | Pending                                        |
| **Day 10**      | Docs & Review                  | Update TASKS.md progress.`<br>`Add README setup guide + .env template.                                                                         | 🔄     | In progress                                    |
| **Buffer Days** | Fixes & QA                     | Resolve issues.`<br>`Review RLS and Edge Functions.                                                                                            | ⬜     | Pending                                        |

### ✅ Sprint 1 Completion Criteria

- [x] Auth (Google + email) working
- [x] Database migrations created (users, companies, projects, documents, checklists, checklist_items, packages, certificates, items, audit_logs)
- [x] RLS policies enabled for all tables
- [ ] Migration executed in Supabase
- [ ] `create-project` Edge Function + file uploads operational
- [ ] Connected frontend (Login, Company Onboarding, Project List, Project Detail)
- [ ] Updated TASKS.md and README

---

## Sprint 2 — Stabilize & Security

Based on PRD Section 4.3 (Company Dashboard):

- [ ] Checklist CRUD APIs + frontend UI
- [ ] Workflow management (assign roles, map checklist items to workflows)
- [ ] Audit logging (DB triggers implemented, audit_logs table ready)
- [ ] User management within companies (Compliance Manager can create users)
- [ ] Project creation and document upload UI
- [ ] CI workflow (migrations, tests, deploy to staging)
- [ ] Backups — nightly DB export to protected bucket

---

## Sprint 3 — Features & Scale

Based on PRD Section 4.3.3 (AI-Driven Checklist Generation) and Phase 2:

- [ ] AI checklist integration (AI reviews uploaded documents and generates checklists)
- [ ] Review cycle workflow (Compliance Manager & Project Manager review)
- [ ] Exception handling (management review and approval)
- [ ] Workflow auto-generation based on checklist items
- [ ] Payments / SSO (Phase 2)
- [ ] Load testing + scaling plan

---

## Ongoing Chores

- [ ] Keep vendor/minified files read-only unless approved
- [ ] Monitor Supabase usage and budget
- [ ] Document Edge Functions and secret usage

---

## Completed Tasks Log

### Sprint 1 Core (Nov 10-11, 2025)

- 2025-11-10 — Database schema design completed (all Sprint 1 tables defined per PRD)
- 2025-11-10 — RLS policies created for all tables with role-based access control
- 2025-11-10 — Auth integration (Google OAuth + Email) implemented
- 2025-11-10 — Supabase connection configured
- 2025-11-11 — Frontend pages completed (Dashboard, Profile, Pricing)
- 2025-11-11 — OAuth redirect URI centralized and verified

### UI/UX Polish (Nov 12, 2025)

- 2025-11-12 — Dashboard dark mode styling enhanced (#171f2e backgrounds for all cards)
- 2025-11-12 — Table styling improved (white headers in dark mode, proper borders)
- 2025-11-12 — Profile page styling completed (icons, badges, followers card, Font Awesome 7 support)
- 2025-11-12 — Badge system implemented (circular status dots, color-coded pill badges)
- 2025-11-12 — RenewalsCard package badges color-coded (green/orange/blue for Enterprise/Business/Lite)
- 2025-11-12 — CSS utilities added with color-mix() for opacity backgrounds (light & dark mode)
- 2025-11-12 — Tailwind config extended (success/orange/blue colors with opacity support)
- 2025-11-12 — Project structure organized (scripts/ and docs/ folders created)
- 2025-11-12 — GitHub Pages deployment configured with proper routing
