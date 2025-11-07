# Task List - Dashco Development

## Phase 1: Core Modules

### 1. Product Owner Dashboard (Super Admin)

#### 1.1. Dashboard Page
- [ ] Create dashboard layout with sidebar navigation
- [ ] Implement overview cards (onboarded companies count, recent updates, finance summary)
- [ ] Add upcoming renewals notifications section
- [ ] Create responsive grid layout for dashboard widgets
- [ ] Add data visualization charts (if needed)

#### 1.2. Companies Module
- [ ] Create Companies list page with search and filters
- [ ] Implement Create Company form with all required fields:
  - Name, Compliance Manager, Email ID, Contact Nos., Address
  - Verification Documents upload (optional)
  - Status dropdown (Active/Inactive/Suspended/Archived)
  - Package selection (Basic/Lite/Business/Enterprise)
- [ ] Add 15-day free trial option
- [ ] Implement company list table with:
  - Search functionality
  - Filters (status, package, compliance manager)
  - Edit/Delete actions
  - Status badges
- [ ] Add company detail view page

#### 1.3. Packages Module
- [ ] Create Packages list page
- [ ] Implement Create Package form:
  - Title, Cost, Certificates (multi-select), Validity, Status
- [ ] Add package list with edit/delete functionality
- [ ] Link packages with companies
- [ ] Display package details and associated companies

#### 1.4. Certificates Module
- [ ] Create Certificates list page
- [ ] Implement Create Certificate form:
  - Title, Select Items (Processes/Templates/Standards), Status
- [ ] Add version control functionality (e.g., ISO 27001:2015 → ISO 27001:2022)
- [ ] Implement certificate list with:
  - Search functionality
  - Active/Inactive filter
  - Version history display
- [ ] Add certificate detail view with version comparison

#### 1.5. Items (Repository) Module
- [ ] Create Items repository page with folder structure
- [ ] Implement Create Item form:
  - Title, Description, Type (dropdown), Score
- [ ] Organize items by type (Process/Template/Checklist/Guideline/Standard/Model/Others)
- [ ] Add folder structure navigation
- [ ] Implement item list with filtering by type
- [ ] Add item detail view and edit functionality

#### 1.6. Finance Module
- [ ] Create Finance dashboard page
- [ ] Implement Payment Reports view
- [ ] Add Invoice generation functionality
- [ ] Create Invoice list with filters (date range, company, status)
- [ ] Add invoice detail view and download option
- [ ] Implement payment status tracking

#### 1.7. Users Module
- [ ] Create Users list page
- [ ] Implement Create Sub-Admin User form
- [ ] Add role and permissions definition interface
- [ ] Create user list with search and filters
- [ ] Implement user edit/delete functionality
- [ ] Add user detail view with permission summary

#### 1.8. Settings Module
- [ ] Create Settings page with tabs/sections
- [ ] Implement Product Branding section:
  - Title, Description, Logo upload
- [ ] Add Contact Information section:
  - Phone, Email, Address fields
- [ ] Create GST and Tax Configurations section
- [ ] Add Limits Configuration section
- [ ] Implement save/update functionality for all settings

---

### 2. Company Onboarding

- [ ] Create company onboarding flow
- [ ] Implement pre-filled company details form
- [ ] Add activation email sending functionality
- [ ] Create secure activation link generation
- [ ] Implement password creation page at activation
- [ ] Add 2FA email verification (Phase 1)
- [ ] Create activation success page
- [ ] Add error handling for expired/invalid links

---

### 3. Company Dashboard (For Compliance Manager & Management)

#### 3.1. Dashboard Page
- [ ] Create company dashboard layout
- [ ] Implement statistics cards (Active projects, progress overview)
- [ ] Add recent updates section
- [ ] Create upcoming audits section
- [ ] Add product & security updates section
- [ ] Implement responsive grid layout

#### 3.2. Projects Module
- [ ] Create Projects list page
- [ ] Implement Create Project form:
  - Project name, description
  - Upload: MSA, SOW, PO, Contract Documents, Security Questionnaire
  - Enter Scope: Industry, Location, Domain, Technology, Resources
- [ ] Add project list with search and filters
- [ ] Implement project detail view
- [ ] Add document upload functionality with preview
- [ ] Create document management interface

#### 3.3. Checklist Management (Manual Flow - Phase 1)
- [ ] Create checklist creation interface
- [ ] Implement manual checklist item addition:
  - Description, Weightage, Remarks/Evidence field, Workflow association
- [ ] Add checklist review interface for Compliance Manager & Project Manager
- [ ] Implement checklist item edit/delete functionality
- [ ] Add exception item flagging for management review
- [ ] Create approval workflow interface
- [ ] Implement checklist versioning
- [ ] Add workflow auto-generation based on checklist items

#### 3.4. Workflow Management
- [ ] Create workflow visualization interface
- [ ] Implement role mapping to workflow stages
- [ ] Add workflow versioning (archive old, activate new)
- [ ] Create workflow status tracking
- [ ] Implement workflow approval chain display
- [ ] Add scope change detection and new workflow trigger

#### 3.5. User Management
- [ ] Create company user list page
- [ ] Implement Create User form with role assignment
- [ ] Add user role assignment interface (Compliance Manager, Management, Project Manager, HR/Admin, IT/Developer)
- [ ] Create user list with search and filters
- [ ] Implement user edit/delete functionality
- [ ] Add user detail view with role summary

#### 3.6. Billing Module
- [ ] Create Billing page
- [ ] Display package details
- [ ] Show invoices list with due dates
- [ ] Implement user statistics display:
  - Total vs active users
  - Users per security level
- [ ] Add last login reports
- [ ] Create billing history view

#### 3.7. Settings Module
- [ ] Create Company Settings page
- [ ] Implement Company Profile section:
  - Logo upload, Title
- [ ] Add Communication section:
  - Contact numbers, emails, address
- [ ] Add Support contact section
- [ ] Implement save/update functionality

---

### 4. Authentication & Authorization

- [ ] Implement login page
- [ ] Add password hashing
- [ ] Create role-based access control (RBAC) system
- [ ] Implement session management
- [ ] Add 2FA email verification (Phase 1)
- [ ] Create password reset functionality
- [ ] Implement logout functionality
- [ ] Add route protection based on roles

---

### 5. Audit Logs

- [ ] Create audit log database schema
- [ ] Implement audit log recording for all user actions:
  - User ID, timestamp, change details
- [ ] Create audit log viewing interface
- [ ] Add audit log search and filters
- [ ] Implement audit log export functionality
- [ ] Add audit log retention policy (12 months)

---

### 6. Rollback Functionality

- [ ] Implement workflow state versioning
- [ ] Create rollback interface for Product Owner
- [ ] Add rollback interface for Compliance Manager
- [ ] Implement state comparison view (current vs previous)
- [ ] Add rollback confirmation and logging

---

### 7. General UI/UX Tasks

- [ ] Set up Tailwind CSS configuration
- [ ] Create reusable UI components library
- [ ] Implement responsive navigation sidebar
- [ ] Add loading states and spinners
- [ ] Implement error handling and error pages
- [ ] Create toast/notification system
- [ ] Add form validation
- [ ] Implement data tables with pagination
- [ ] Create modal/dialog components
- [ ] Add file upload components
- [ ] Implement search and filter components

---

### 8. Security Implementation

- [ ] Implement encrypted storage for sensitive data
- [ ] Add role-based access control enforcement
- [ ] Create activity logging system
- [ ] Implement strong password requirements
- [ ] Add secure session management
- [ ] Implement CSRF protection
- [ ] Add input sanitization

---

## Phase 2: Advanced Features

### 9. AI-Driven Checklist Generation

- [ ] Integrate AI module for document review
- [ ] Implement document parsing and analysis
- [ ] Create AI checklist generation interface
- [ ] Add checklist item weightage auto-calculation
- [ ] Implement workflow auto-mapping based on AI analysis
- [ ] Add AI confidence scoring
- [ ] Create manual override options for AI suggestions

---

### 10. Payment Gateway Integration

- [ ] Research and select payment gateway provider
- [ ] Implement payment gateway integration
- [ ] Create payment processing interface
- [ ] Add payment status tracking
- [ ] Implement invoice generation with payment links
- [ ] Add payment history and receipts

---

### 11. SSO Integration

- [ ] Research SSO providers and protocols
- [ ] Implement SSO authentication flow
- [ ] Add SSO configuration in settings
- [ ] Create SSO login option
- [ ] Implement SSO user mapping

---

### 12. Custom Packages

- [ ] Create custom package builder interface
- [ ] Implement package configuration options
- [ ] Add custom package assignment to companies
- [ ] Create custom package pricing calculator

---

## Technical Infrastructure Tasks

### 13. Backend Development

- [ ] Set up backend framework
- [ ] Design database schema
- [ ] Implement API endpoints for all modules
- [ ] Add authentication middleware
- [ ] Implement file upload handling
- [ ] Create email service integration
- [ ] Add database migrations
- [ ] Implement API documentation

### 14. Database Design

- [ ] Design companies table
- [ ] Design users table with roles
- [ ] Design packages table
- [ ] Design certificates table with versioning
- [ ] Design items/repository table
- [ ] Design projects table
- [ ] Design checklists table
- [ ] Design workflows table
- [ ] Design audit logs table
- [ ] Design invoices/payments table
- [ ] Create relationships and indexes

### 15. Testing

- [ ] Write unit tests for components
- [ ] Create integration tests for workflows
- [ ] Add E2E tests for critical paths
- [ ] Implement test coverage reporting
- [ ] Add performance testing

### 16. Deployment

- [ ] Set up production environment
- [ ] Configure CI/CD pipeline
- [ ] Implement backup strategy (daily incremental, weekly full)
- [ ] Set up monitoring and logging
- [ ] Configure SSL/TLS certificates
- [ ] Add health check endpoints

---

## Priority Order

1. **High Priority (Phase 1 Core)**
   - Authentication & Authorization
   - Product Owner Dashboard - Companies Module
   - Company Onboarding
   - Company Dashboard - Projects Module
   - Checklist Management (Manual)
   - User Management
   - Audit Logs

2. **Medium Priority (Phase 1)**
   - Product Owner Dashboard - Other Modules (Packages, Certificates, Items, Finance, Users, Settings)
   - Company Dashboard - Other Modules (Billing, Settings)
   - Rollback Functionality
   - General UI/UX Components

3. **Low Priority (Phase 2)**
   - AI-Driven Checklist Generation
   - Payment Gateway Integration
   - SSO Integration
   - Custom Packages

