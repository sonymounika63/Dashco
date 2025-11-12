-- Sprint 1 RLS Policies Migration
-- Enables Row Level Security and creates policies for all tables
-- Generated: 2025-01-10

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to check if user is super admin
CREATE OR REPLACE FUNCTION public.is_super_admin(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users u
        WHERE u.id = check_user_id
        AND u.role = 'super_admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is sub admin
CREATE OR REPLACE FUNCTION public.is_sub_admin(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users u
        WHERE u.id = check_user_id
        AND u.role = 'sub_admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's company ID
CREATE OR REPLACE FUNCTION public.get_user_company_id(check_user_id UUID)
RETURNS UUID AS $$
BEGIN
    RETURN (
        SELECT u.company_id FROM public.users u
        WHERE u.id = check_user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user belongs to a company
CREATE OR REPLACE FUNCTION public.user_belongs_to_company(check_user_id UUID, check_company_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if user is directly assigned to company
    IF EXISTS (
        SELECT 1 FROM public.company_users cu
        WHERE cu.user_id = check_user_id
        AND cu.company_id = check_company_id
        AND cu.status = 'active'
    ) THEN
        RETURN TRUE;
    END IF;
    
    -- Check if user's company_id matches
    IF EXISTS (
        SELECT 1 FROM public.users u
        WHERE u.id = check_user_id
        AND u.company_id = check_company_id
    ) THEN
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is compliance manager of a company
CREATE OR REPLACE FUNCTION public.is_compliance_manager(check_user_id UUID, check_company_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.company_users cu
        WHERE cu.user_id = check_user_id
        AND cu.company_id = check_company_id
        AND cu.role = 'compliance_manager'
        AND cu.status = 'active'
    ) OR EXISTS (
        SELECT 1 FROM public.companies c
        WHERE c.id = check_company_id
        AND c.compliance_manager_id = check_user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- USERS TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_users"
    ON public.users
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- Users can read their own profile
CREATE POLICY "users_read_own_profile"
    ON public.users
    FOR SELECT
    TO authenticated
    USING (id = auth.uid());

-- Users can update their own profile (except role and company_id)
CREATE POLICY "users_update_own_profile"
    ON public.users
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (
        id = auth.uid()
        AND (role IS NULL OR role = (SELECT role FROM public.users WHERE id = auth.uid()))
        AND (company_id IS NULL OR company_id = (SELECT company_id FROM public.users WHERE id = auth.uid()))
    );

-- Compliance Manager: Can read users in their company
CREATE POLICY "compliance_manager_read_company_users"
    ON public.users
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.companies c
            WHERE c.id = public.users.company_id
            AND public.is_compliance_manager(auth.uid(), c.id)
        )
    );

-- Company members: Can read users in their company
CREATE POLICY "company_members_read_company_users"
    ON public.users
    FOR SELECT
    TO authenticated
    USING (
        company_id IS NOT NULL
        AND public.user_belongs_to_company(auth.uid(), company_id)
    );

-- ============================================================================
-- COMPANIES TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_companies"
    ON public.companies
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- Compliance Manager: Full access to their company
CREATE POLICY "compliance_manager_full_access_company"
    ON public.companies
    FOR ALL
    TO authenticated
    USING (public.is_compliance_manager(auth.uid(), id))
    WITH CHECK (public.is_compliance_manager(auth.uid(), id));

-- Company members: Can read their company
CREATE POLICY "company_members_read_company"
    ON public.companies
    FOR SELECT
    TO authenticated
    USING (public.user_belongs_to_company(auth.uid(), id));

-- ============================================================================
-- PACKAGES TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_packages"
    ON public.packages
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- All authenticated users: Can read active packages
CREATE POLICY "users_read_active_packages"
    ON public.packages
    FOR SELECT
    TO authenticated
    USING (status = 'active');

-- ============================================================================
-- COMPANY_USERS TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_company_users"
    ON public.company_users
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- Compliance Manager: Full access to company_users in their company
CREATE POLICY "compliance_manager_manage_company_users"
    ON public.company_users
    FOR ALL
    TO authenticated
    USING (public.is_compliance_manager(auth.uid(), company_id))
    WITH CHECK (public.is_compliance_manager(auth.uid(), company_id));

-- Company members: Can read company_users in their company
CREATE POLICY "company_members_read_company_users"
    ON public.company_users
    FOR SELECT
    TO authenticated
    USING (public.user_belongs_to_company(auth.uid(), company_id));

-- Users: Can read their own company_user record
CREATE POLICY "users_read_own_company_user"
    ON public.company_users
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- ============================================================================
-- PROJECTS TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_projects"
    ON public.projects
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- Compliance Manager: Full access to projects in their company
CREATE POLICY "compliance_manager_full_access_company_projects"
    ON public.projects
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.companies c
            WHERE c.id = company_id
            AND public.is_compliance_manager(auth.uid(), c.id)
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.companies c
            WHERE c.id = company_id
            AND public.is_compliance_manager(auth.uid(), c.id)
        )
    );

-- Project Manager: Full access to projects in their company
CREATE POLICY "project_manager_full_access_company_projects"
    ON public.projects
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.company_users cu
            JOIN public.companies c ON c.id = cu.company_id
            WHERE cu.user_id = auth.uid()
            AND cu.company_id = projects.company_id
            AND cu.role = 'project_manager'
            AND cu.status = 'active'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.company_users cu
            WHERE cu.user_id = auth.uid()
            AND cu.company_id = projects.company_id
            AND cu.role = 'project_manager'
            AND cu.status = 'active'
        )
    );

-- Company members: Can read projects in their company
CREATE POLICY "company_members_read_company_projects"
    ON public.projects
    FOR SELECT
    TO authenticated
    USING (public.user_belongs_to_company(auth.uid(), company_id));

-- ============================================================================
-- DOCUMENTS TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_documents"
    ON public.documents
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- Compliance Manager: Full access to documents in their company's projects
CREATE POLICY "compliance_manager_full_access_documents"
    ON public.documents
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.companies c ON c.id = p.company_id
            WHERE p.id = documents.project_id
            AND public.is_compliance_manager(auth.uid(), c.id)
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.companies c ON c.id = p.company_id
            WHERE p.id = documents.project_id
            AND public.is_compliance_manager(auth.uid(), c.id)
        )
    );

-- Project Manager: Full access to documents in their company's projects
CREATE POLICY "project_manager_full_access_documents"
    ON public.documents
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.company_users cu ON cu.company_id = p.company_id
            WHERE p.id = documents.project_id
            AND cu.user_id = auth.uid()
            AND cu.role = 'project_manager'
            AND cu.status = 'active'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.company_users cu ON cu.company_id = p.company_id
            WHERE p.id = documents.project_id
            AND cu.user_id = auth.uid()
            AND cu.role = 'project_manager'
            AND cu.status = 'active'
        )
    );

-- Company members: Can read documents in their company's projects
CREATE POLICY "company_members_read_documents"
    ON public.documents
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            WHERE p.id = documents.project_id
            AND public.user_belongs_to_company(auth.uid(), p.company_id)
        )
    );

-- Users: Can read documents they uploaded
CREATE POLICY "users_read_own_uploaded_documents"
    ON public.documents
    FOR SELECT
    TO authenticated
    USING (uploaded_by = auth.uid());

-- ============================================================================
-- CHECKLISTS TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_checklists"
    ON public.checklists
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- Compliance Manager: Full access to checklists in their company's projects
CREATE POLICY "compliance_manager_full_access_checklists"
    ON public.checklists
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.companies c ON c.id = p.company_id
            WHERE p.id = checklists.project_id
            AND public.is_compliance_manager(auth.uid(), c.id)
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.companies c ON c.id = p.company_id
            WHERE p.id = checklists.project_id
            AND public.is_compliance_manager(auth.uid(), c.id)
        )
    );

-- Project Manager: Full access to checklists in their company's projects
CREATE POLICY "project_manager_full_access_checklists"
    ON public.checklists
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.company_users cu ON cu.company_id = p.company_id
            WHERE p.id = checklists.project_id
            AND cu.user_id = auth.uid()
            AND cu.role = 'project_manager'
            AND cu.status = 'active'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.company_users cu ON cu.company_id = p.company_id
            WHERE p.id = checklists.project_id
            AND cu.user_id = auth.uid()
            AND cu.role = 'project_manager'
            AND cu.status = 'active'
        )
    );

-- Management: Can read and approve checklists in their company
CREATE POLICY "management_read_approve_checklists"
    ON public.checklists
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.company_users cu ON cu.company_id = p.company_id
            WHERE p.id = checklists.project_id
            AND cu.user_id = auth.uid()
            AND cu.role = 'management'
            AND cu.status = 'active'
        )
    );

-- Management: Can update (approve) checklists
CREATE POLICY "management_approve_checklists"
    ON public.checklists
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.company_users cu ON cu.company_id = p.company_id
            WHERE p.id = checklists.project_id
            AND cu.user_id = auth.uid()
            AND cu.role = 'management'
            AND cu.status = 'active'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.company_users cu ON cu.company_id = p.company_id
            WHERE p.id = checklists.project_id
            AND cu.user_id = auth.uid()
            AND cu.role = 'management'
            AND cu.status = 'active'
        )
    );

-- Company members: Can read checklists in their company's projects
CREATE POLICY "company_members_read_checklists"
    ON public.checklists
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            WHERE p.id = checklists.project_id
            AND public.user_belongs_to_company(auth.uid(), p.company_id)
        )
    );

-- ============================================================================
-- CHECKLIST_ITEMS TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_checklist_items"
    ON public.checklist_items
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- Compliance Manager: Full access to checklist_items in their company
CREATE POLICY "compliance_manager_full_access_checklist_items"
    ON public.checklist_items
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.checklists cl
            JOIN public.projects p ON p.id = cl.project_id
            JOIN public.companies c ON c.id = p.company_id
            WHERE cl.id = checklist_items.checklist_id
            AND public.is_compliance_manager(auth.uid(), c.id)
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.checklists cl
            JOIN public.projects p ON p.id = cl.project_id
            JOIN public.companies c ON c.id = p.company_id
            WHERE cl.id = checklist_items.checklist_id
            AND public.is_compliance_manager(auth.uid(), c.id)
        )
    );

-- Project Manager: Full access to checklist_items in their company
CREATE POLICY "project_manager_full_access_checklist_items"
    ON public.checklist_items
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.checklists cl
            JOIN public.projects p ON p.id = cl.project_id
            JOIN public.company_users cu ON cu.company_id = p.company_id
            WHERE cl.id = checklist_items.checklist_id
            AND cu.user_id = auth.uid()
            AND cu.role = 'project_manager'
            AND cu.status = 'active'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.checklists cl
            JOIN public.projects p ON p.id = cl.project_id
            JOIN public.company_users cu ON cu.company_id = p.company_id
            WHERE cl.id = checklist_items.checklist_id
            AND cu.user_id = auth.uid()
            AND cu.role = 'project_manager'
            AND cu.status = 'active'
        )
    );

-- Company members: Can read checklist_items in their company
CREATE POLICY "company_members_read_checklist_items"
    ON public.checklist_items
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.checklists cl
            JOIN public.projects p ON p.id = cl.project_id
            WHERE cl.id = checklist_items.checklist_id
            AND public.user_belongs_to_company(auth.uid(), p.company_id)
        )
    );

-- ============================================================================
-- CERTIFICATES TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_certificates"
    ON public.certificates
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- All authenticated users: Can read active certificates
CREATE POLICY "users_read_active_certificates"
    ON public.certificates
    FOR SELECT
    TO authenticated
    USING (status = 'active');

-- ============================================================================
-- ITEMS TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_items"
    ON public.items
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- All authenticated users: Can read items
CREATE POLICY "users_read_items"
    ON public.items
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================================================
-- PACKAGE_CERTIFICATES TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_package_certificates"
    ON public.package_certificates
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- All authenticated users: Can read package_certificates
CREATE POLICY "users_read_package_certificates"
    ON public.package_certificates
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================================================
-- CERTIFICATE_ITEMS TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_certificate_items"
    ON public.certificate_items
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- All authenticated users: Can read certificate_items
CREATE POLICY "users_read_certificate_items"
    ON public.certificate_items
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================================================
-- AUDIT_LOGS TABLE POLICIES
-- ============================================================================

-- Super Admin & Sub Admin: Full access
CREATE POLICY "super_admin_full_access_audit_logs"
    ON public.audit_logs
    FOR ALL
    TO authenticated
    USING (public.is_super_admin(auth.uid()) OR public.is_sub_admin(auth.uid()));

-- Compliance Manager: Can read audit logs for their company
CREATE POLICY "compliance_manager_read_company_audit_logs"
    ON public.audit_logs
    FOR SELECT
    TO authenticated
    USING (
        company_id IS NOT NULL
        AND public.is_compliance_manager(auth.uid(), company_id)
    );

-- Users: Can read their own audit logs
CREATE POLICY "users_read_own_audit_logs"
    ON public.audit_logs
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- All authenticated users: Can insert audit logs (for logging their actions)
CREATE POLICY "users_insert_audit_logs"
    ON public.audit_logs
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON FUNCTION public.is_super_admin(UUID) IS 'Check if user is super admin';
COMMENT ON FUNCTION public.is_sub_admin(UUID) IS 'Check if user is sub admin';
COMMENT ON FUNCTION public.get_user_company_id(UUID) IS 'Get user''s company ID';
COMMENT ON FUNCTION public.user_belongs_to_company(UUID, UUID) IS 'Check if user belongs to a company';
COMMENT ON FUNCTION public.is_compliance_manager(UUID, UUID) IS 'Check if user is compliance manager of a company';

