# Product Requirements Document (PRD)

## Compliance Repository & Workflow Automation Platform - Dashco

### 1. Project Overview

The Compliance Repository & Workflow Automation Platform (Dashco) is designed to help organizations streamline compliance processes across multiple standards (e.g., ISO 27001, SOC 2, GDPR). The system allows a Product Owner (Super Admin) to onboard client companies, assign compliance packages, and manage user access, certificates, templates, and financials from a secure centralized dashboard.

Each onboarded company receives access to its Company Dashboard, enabling compliance managers and management teams to create projects, upload documents, generate checklists through AI analysis, and manage workflows and roles throughout the compliance lifecycle.

---

### 2. Objectives

1. Simplify onboarding of client companies and standardize compliance management.
2. Automate checklist generation based on uploaded contracts, standards, and scope details.
3. Enable AI-assisted review and scoring of compliance checklists mapped to MSA and ISO 27001.
4. Maintain a secure, auditable environment with full role-based access control and rollback features.
5. Provide dashboards for performance tracking, finance, and audit visibility.

---

### 3. Stakeholders

| Role                                    | Responsibilities                                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Product Owner / Super Admin**         | Create and manage companies, users, certificates, items, packages, and system settings.          |
| **Compliance Manager**                  | Manage compliance projects, review AI-generated checklists, assign roles, and approve workflows. |
| **Project Manager**                     | Review and approve project-level deliverables (e.g., checklists, reports).                       |
| **Management**                          | Oversee project progress, exceptions, and final approvals.                                       |
| **Developers, QA, HR, Admin, IT Users** | Execute tasks assigned in the workflow with restricted permissions.                              |

---

### 4. Functional Scope

#### 4.1. Product Owner Dashboard (Super Admin)

##### 4.1.1. Dashboard

- Overview of onboarded companies
- Recent updates and finance summary
- Upcoming renewals notifications

##### 4.1.2. Companies

**Create Company:**

- Fields: Name, Compliance Manager, Email ID, Contact Nos., Address, Verification Documents (Optional), Status (Active/Inactive/Suspended/Archived)
- Package selection (15-day free trial)
  - **Basic**: 10 Users, ISO 27001, 10 GB space, Security updates
  - **Lite**: Basic + SOC 2 Type II, GDPR, 50 GB space
  - **Business**: Lite + Multiple Certifications, 25 Users, 100 GB space
  - **Enterprise**: Business + 100 Users, 500 GB space, Custom Security Updates
  - **Phase 2**: Custom packages

**List of Companies:**

- Searchable
- Filterable by status, package, or compliance manager

##### 4.1.3. Packages

- **Create Package**: Title, Cost, Certificates, Validity, Status
- **List of Packages**: Editable, linked with companies

##### 4.1.4. Certificates

- **Create Certificate**: Title, Select Items (Processes/Templates/Standards), Status (Active/Archived)
- Version control (e.g., ISO 27001:2015 → ISO 27001:2022)
- **List of Certificates**: Searchable, active/inactive filter

##### 4.1.5. Items (Repository)

- **Create Item**: Title, Description, Type (Process/Template/Checklist/Guideline/Standard/Model/Others), Score
- **List of Items**: Organized folder structure by item type

##### 4.1.6. Finance

- View Payment Reports
- Generate & View Invoices
- Payment Gateway Integration (Phase 2)

##### 4.1.7. Users

- Create Sub-Admin Users (clone of Super Admin with delegated access)
- Define Role and Permissions at dashboard level
- List and manage users

##### 4.1.8. Settings

- Product Branding: Title, Description, Logo
- Contact Information: Phone, Email, Address
- GST and Tax Configurations
- Limits Configuration

---

#### 4.2. Company Onboarding

- Pre-filled company details (Name, Compliance Manager, Email, Package)
- Activation email sent with secure link
- Password creation at activation with:
  - **Phase 1**: 2FA - Email verification
  - **Phase 2**: SSO

---

#### 4.3. Company Dashboard (For Compliance Manager & Management)

##### 4.3.1. Dashboard

- Statistics: Active projects, progress overview
- Recent updates
- Upcoming audits
- Product & security updates

##### 4.3.2. Projects

- Create Project / List Projects
- Upload: MSA, SOW, PO, Contract Documents, Security Questionnaire
- Enter Scope: Industry, Location, Domain, Technology, Resources

##### 4.3.3. AI-Driven Checklist Generation (Phase 2)

- AI reviews uploaded documents and selected standards to create a project-specific checklist.
- Each checklist item includes:
  - Description
  - Weightage (summing to 100)
  - Remarks/Evidence field
  - Workflow association

##### 4.3.4. Review Cycle

- Compliance Manager & Project Manager jointly review checklist.
- Items can be deleted/modified before final approval.
- Exception items trigger management review and approval.
- Post-approval, AI regenerates final weighted checklist.
- Workflow auto-generated and roles mapped based on checklist items.

##### 4.3.5. Example Workflow

| Sl. No. | Security Checklist Item | Weightage | Remarks / Evidence   | Workflow                         |
| ------- | ----------------------- | --------- | -------------------- | -------------------------------- |
| 1       | Code Review             | 15        | Code Review Document | Developer → PM → CM → Management |

- Scope changes trigger a new checklist and workflow version.
- Previous workflows are archived; new workflows are activated with updated mapping.

##### 4.3.6. User Management

- Compliance Manager can create users and assign specific security roles.
- View and manage all users within the company.

##### 4.3.7. User Roles

| Role Type          | Examples                      |
| ------------------ | ----------------------------- |
| Compliance Manager | QMS Manager, CISO             |
| Management         | CEO, Director                 |
| Project Manager    | Project Admin, Technical Lead |
| HR / Admin         | HR Manager, Admin Manager     |
| IT / Developer     | Developer, QA, IT Engineer    |

##### 4.3.8. Billing

- Package details, invoices, due dates
- User statistics: total vs active users
- Users per security level
- Last login reports

##### 4.3.9. Settings

- Company Profile: Logo, Title
- Communication: Contact numbers, emails, address
- Support contact

---

### 5. General System Requirements

#### 5.1. Audit Logs

- For all user actions (user ID, timestamp, change details).

#### 5.2. Rollback Option

- Product Owner and Compliance Manager can revert changes to a previous workflow state if accidental changes occur.

#### 5.3. Security

- Encrypted storage for sensitive data
- Role-based access
- Activity logs with traceability

#### 5.4. Scalability

- Must support multi-company and multi-standard operations.

---

### 6. Non-Functional Requirements

| Category              | Requirement                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| **Performance**       | Dashboard to load within 3 seconds for up to 10,000 records.                             |
| **Security**          | All passwords hashed; enforce strong password and 2FA.                                   |
| **Availability**      | 99.5% uptime SLA.                                                                        |
| **Scalability**       | Support up to 1,000 companies and 100,000 users.                                         |
| **Auditability**      | All actions logged and retrievable for at least 12 months.                               |
| **Backup & Recovery** | Daily incremental backup, weekly full backup.                                            |
| **Integration**       | Payment gateway (Phase 2), Email service (SMTP/SendGrid), AI module for document review. |

---

### 7. Phased Implementation Plan

#### Phase 1

- Core modules – Product Owner Dashboard, Company Onboarding, Company Dashboard (manual checklist flow), Audit Logs

#### Phase 2

- AI-based checklist generation, Payment Gateway, SSO Integration, Custom Packages

---

### 8. Assumptions & Dependencies

1. AI model accuracy depends on quality of uploaded documents.
2. Email domain used for activation must support secure communication (SSL/TLS).

---

### 9. Technical Stack

- **Frontend**: React (latest version), Tailwind CSS
- **Backend**: (To be determined)
- **Database**: (To be determined)
- **Authentication**: 2FA (Phase 1), SSO (Phase 2)

---

### 10. Design Guidelines

- Follow Lucid React Admin Template design structure
- Use Tailwind CSS for styling (no inline CSS)
- Maintain responsive breakpoints
- Use React hooks (useState, useEffect, etc.)
- Functional components only
- Modern event handling patterns
