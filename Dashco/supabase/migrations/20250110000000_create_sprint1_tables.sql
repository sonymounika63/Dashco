-- Sprint 1 Database Migration
-- Creates core tables for Dashco compliance platform
-- Generated: 2025-01-10

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for hashing (if needed)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. USERS TABLE (extends Supabase auth.users)
-- ============================================================================

CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN (
        'super_admin',
        'sub_admin',
        'compliance_manager',
        'management',
        'project_manager',
        'hr',
        'admin',
        'it',
        'developer',
        'qa',
        'user'
    )),
    company_id UUID, -- FK added after companies table is created
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for users
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_company_id ON public.users(company_id);
CREATE INDEX idx_users_role ON public.users(role);

-- ============================================================================
-- 2. PACKAGES TABLE
-- ============================================================================

CREATE TABLE public.packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
    max_users INTEGER NOT NULL DEFAULT 10,
    max_storage_gb INTEGER NOT NULL DEFAULT 10,
    validity_days INTEGER,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for packages
CREATE INDEX idx_packages_status ON public.packages(status);

-- ============================================================================
-- 3. COMPANIES TABLE
-- ============================================================================

CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    compliance_manager_id UUID, -- FK added after users table is created
    email TEXT NOT NULL,
    contact_phone TEXT,
    address TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
        'active',
        'inactive',
        'suspended',
        'archived'
    )),
    package_id UUID REFERENCES public.packages(id) ON DELETE SET NULL,
    trial_ends_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for companies
CREATE INDEX idx_companies_status ON public.companies(status);
CREATE INDEX idx_companies_package_id ON public.companies(package_id);
CREATE INDEX idx_companies_compliance_manager_id ON public.companies(compliance_manager_id);

-- ============================================================================
-- 4. COMPANY_USERS JUNCTION TABLE
-- ============================================================================

CREATE TABLE public.company_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN (
        'compliance_manager',
        'management',
        'project_manager',
        'hr',
        'admin',
        'it',
        'developer',
        'qa'
    )),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(company_id, user_id)
);

-- Indexes for company_users
CREATE INDEX idx_company_users_company_id ON public.company_users(company_id);
CREATE INDEX idx_company_users_user_id ON public.company_users(user_id);
CREATE INDEX idx_company_users_status ON public.company_users(status);

-- ============================================================================
-- 5. PROJECTS TABLE
-- ============================================================================

CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    industry TEXT,
    location TEXT,
    domain TEXT,
    technology TEXT,
    resources TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
        'active',
        'completed',
        'archived'
    )),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for projects
CREATE INDEX idx_projects_company_id ON public.projects(company_id);
CREATE INDEX idx_projects_status ON public.projects(status);

-- ============================================================================
-- 6. DOCUMENTS TABLE
-- ============================================================================

CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN (
        'MSA',
        'SOW',
        'PO',
        'Contract',
        'Security Questionnaire',
        'Other'
    )),
    storage_path TEXT NOT NULL,
    file_size BIGINT,
    mime_type TEXT,
    uploaded_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for documents
CREATE INDEX idx_documents_project_id ON public.documents(project_id);
CREATE INDEX idx_documents_type ON public.documents(type);
CREATE INDEX idx_documents_uploaded_by ON public.documents(uploaded_by);

-- ============================================================================
-- 7. CHECKLISTS TABLE
-- ============================================================================

CREATE TABLE public.checklists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
        'draft',
        'pending_review',
        'approved',
        'archived'
    )),
    total_weightage DECIMAL(5, 2) DEFAULT 0 CHECK (total_weightage >= 0 AND total_weightage <= 100),
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    approved_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for checklists
CREATE INDEX idx_checklists_project_id ON public.checklists(project_id);
CREATE INDEX idx_checklists_status ON public.checklists(status);
CREATE INDEX idx_checklists_created_by ON public.checklists(created_by);

-- ============================================================================
-- 8. CHECKLIST_ITEMS TABLE
-- ============================================================================

CREATE TABLE public.checklist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    checklist_id UUID NOT NULL REFERENCES public.checklists(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    weightage DECIMAL(5, 2) NOT NULL DEFAULT 0 CHECK (weightage >= 0 AND weightage <= 100),
    remarks TEXT,
    evidence TEXT,
    workflow_assigned JSONB,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',
        'in_progress',
        'completed',
        'exception'
    )),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for checklist_items
CREATE INDEX idx_checklist_items_checklist_id ON public.checklist_items(checklist_id);
CREATE INDEX idx_checklist_items_status ON public.checklist_items(status);

-- ============================================================================
-- 9. CERTIFICATES TABLE
-- ============================================================================

CREATE TABLE public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    version TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for certificates
CREATE INDEX idx_certificates_status ON public.certificates(status);

-- ============================================================================
-- 10. ITEMS TABLE (Repository)
-- ============================================================================

CREATE TABLE public.items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN (
        'Process',
        'Template',
        'Checklist',
        'Guideline',
        'Standard',
        'Model',
        'Others'
    )),
    score DECIMAL(5, 2),
    folder_path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for items
CREATE INDEX idx_items_type ON public.items(type);
CREATE INDEX idx_items_folder_path ON public.items(folder_path);

-- ============================================================================
-- 11. PACKAGE_CERTIFICATES JUNCTION TABLE
-- ============================================================================

CREATE TABLE public.package_certificates (
    package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
    certificate_id UUID NOT NULL REFERENCES public.certificates(id) ON DELETE CASCADE,
    PRIMARY KEY (package_id, certificate_id)
);

-- Indexes for package_certificates
CREATE INDEX idx_package_certificates_package_id ON public.package_certificates(package_id);
CREATE INDEX idx_package_certificates_certificate_id ON public.package_certificates(certificate_id);

-- ============================================================================
-- 12. CERTIFICATE_ITEMS JUNCTION TABLE
-- ============================================================================

CREATE TABLE public.certificate_items (
    certificate_id UUID NOT NULL REFERENCES public.certificates(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    PRIMARY KEY (certificate_id, item_id)
);

-- Indexes for certificate_items
CREATE INDEX idx_certificate_items_certificate_id ON public.certificate_items(certificate_id);
CREATE INDEX idx_certificate_items_item_id ON public.certificate_items(item_id);

-- ============================================================================
-- 13. AUDIT_LOGS TABLE
-- ============================================================================

CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    action_type TEXT NOT NULL CHECK (action_type IN (
        'create',
        'update',
        'delete',
        'approve',
        'reject',
        'archive',
        'restore',
        'login',
        'logout'
    )),
    entity_type TEXT NOT NULL,
    entity_id UUID,
    change_details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for audit_logs
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_company_id ON public.audit_logs(company_id);
CREATE INDEX idx_audit_logs_project_id ON public.audit_logs(project_id);
CREATE INDEX idx_audit_logs_action_type ON public.audit_logs(action_type);
CREATE INDEX idx_audit_logs_entity_type ON public.audit_logs(entity_type);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- ============================================================================
-- TRIGGERS: Auto-update updated_at timestamp
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_users_updated_at BEFORE UPDATE ON public.company_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_checklists_updated_at BEFORE UPDATE ON public.checklists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_checklist_items_updated_at BEFORE UPDATE ON public.checklist_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON public.packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON public.certificates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_items_updated_at BEFORE UPDATE ON public.items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ADD CIRCULAR FOREIGN KEYS (after both tables exist)
-- ============================================================================

ALTER TABLE public.users 
    ADD CONSTRAINT fk_users_company_id 
    FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE SET NULL;

ALTER TABLE public.companies 
    ADD CONSTRAINT fk_companies_compliance_manager_id 
    FOREIGN KEY (compliance_manager_id) REFERENCES public.users(id) ON DELETE SET NULL;

-- ============================================================================
-- COMMENTS: Document tables and columns
-- ============================================================================

COMMENT ON TABLE public.users IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE public.companies IS 'Client companies/organizations';
COMMENT ON TABLE public.packages IS 'Subscription packages (Basic, Lite, Business, Enterprise)';
COMMENT ON TABLE public.projects IS 'Compliance projects within companies';
COMMENT ON TABLE public.documents IS 'Uploaded documents (MSA, SOW, PO, etc.)';
COMMENT ON TABLE public.checklists IS 'Compliance checklists for projects';
COMMENT ON TABLE public.checklist_items IS 'Individual items within checklists';
COMMENT ON TABLE public.certificates IS 'Compliance certificates (ISO 27001, SOC 2, etc.)';
COMMENT ON TABLE public.items IS 'Repository items (Processes, Templates, etc.)';
COMMENT ON TABLE public.audit_logs IS 'Audit trail for all user actions';

