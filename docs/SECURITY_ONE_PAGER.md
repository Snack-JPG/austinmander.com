# Security & Data Handling — One-Pager
**Change Radar QuickWin™ | Executive + Technical Security Brief**

---

## 🔒 Executive Summary (30 seconds)

Change Radar processes customer project data to deliver explainable AI insights. We treat security and privacy as first-class design constraints: **minimal data ingestion**, **encryption in transit & at rest**, **row-level security (RLS)** in the database, **PII redaction** prior to LLM/AI calls, **auditable event logging** and a **reproducible replay trail** for every decision.

---

## 🛡️ Key Controls (Non-Technical)

### Data Minimisation
We only request the fields necessary to score and surface risks (project metadata, milestones, risks, basic resource info). **No payroll or sensitive personal identifiers required.**

### Encryption
All data uploaded to our staging/prod environments is encrypted **in transit (TLS1.2+)** and **at rest (AES-256)**. S3 buckets and DB storage use provider-managed encryption keys.

### Access Control
Principle of least privilege. **Multi-factor authentication required** for all admin accounts. Role-based access controls for internal team.

### Row-Level Security
Each customer's data segmented via `org_id` with **enforced RLS policies** so database queries are scoped to the customer.

### PII Redaction
Before any audio transcripts or free text are sent to an LLM, we run **deterministic redaction** to remove names, emails, phone numbers and legal identifiers. Redaction is logged.

### Audit Trail & Replay
Every event and model prediction is persisted in an **immutable event_log**. Customers can request a replay and audit of what evidence produced a prediction.

### Vendor Security
Third-party vendors (OpenAI, Supabase, S3) are used under contract; **keys are rotated quarterly**. We do not store raw LLM prompts with unredacted PII.

### Incident Response
Formal runbook — detection → triage → mitigation → notification. We commit to **notifying affected customers within 72 hours** of a confirmed breach.

### Penetration Testing
Regular pentests (annual; immediate retest after major releases). **SOC2/ISO roadmap** available upon request.

### Data Retention & Deletion
Default retention **90 days** for QuickWin projects (can be extended by contract). **Immediate deletion** upon customer request: we remove customer records and provide deletion confirmation.

---

## 🔧 Technical Appendix (For Security Teams)

### Architecture & Flow

1. **Upload:** Client uploads CSV/Excel/transcript via secure presigned S3 or SFTP
2. **Ingest:** Files ingested into staging DB with `org_id` tag. Temporary storage encrypted
3. **Processing:** Event bus & workers process data — runs ML & rule engines. All LLM calls receive redacted content only
4. **Storage:** Results (predictions, top features, evidence pointers) stored as JSONB in Postgres with RLS. Raw transcripts (post-redaction) stored in encrypted S3
5. **Access:** UI/API access secured via JWT with org-scoped claims. Audit logs capture user + action + trace_id

### Encryption
- **TLS 1.2+** for all endpoints
- **AES-256** at rest (DB provider, S3 SSE)
- Secrets stored in vault (Vercel/Env + encrypted secret store)
- **API keys rotated quarterly**

### Authentication & Authorization
- SSO/OAuth available for enterprise customers (optional)
- Admin accounts **MFA enforced**
- Internal engineer EC2/Container access via bastion + limited IP allowlist

### Data Residency & Compliance
- Options for **EU-only hosting** on request (deployable to customer cloud or EU region)
- **DPA template available** (GDPR-compliant)
- **SOC2/ISO readiness roadmap** — available on request

### PII & LLM Usage
- **PII detector/redactor** runs locally before any external LLM call
- LLM calls use only **redacted chunks** plus minimal metadata
- LLM responses stored as **derived artifacts** (no raw user PII)

### Monitoring & Logging
- **Prometheus metrics** exported for event latency, queue health, ML performance
- **Centralized logs** (Sentry/ELK) with masked fields for PII
- **Alerts** (PagerDuty/SMS/Email) for service failure, anomalous usage, and budget thresholds

---

## 📋 Operational Guarantees & Options

### Standard Service
- **QuickWin default retention:** 90 days; permanent deletion option on project close
- **Incident notification SLA:** 72 hours post-confirmation
- **Support:** Standard support during pilot window; enterprise SLA available with Implementation engagements

### Enterprise Options
- **On-prem / VPC option:** For customers requiring maximum control we offer deployment into the customer's VPC or a managed instance on their cloud (quoted separately)
- **Extended retention:** Up to 2 years with appropriate contracts
- **Dedicated instance:** Single-tenant deployment available

---

## 📞 Contacts & Next Steps

| Role | Contact | Email |
|------|---------|-------|
| **Security POC** | Austin Mander | security@austinmander.com |
| **Technical Lead** | [Engineer Name] | eng@austinmander.com |

### To Proceed:
1. Sign QuickWin SOW 
2. Provide data access as per the Data Access Checklist
3. For enterprise-only deployments or DPA requests, contact the Security POC

---

## 📎 Available Attachments

Upon request, we can provide:
- **Data Access Checklist** (Appendix A of SOW)
- **Sample RLS policy snippet** (SQL)
- **DPA + MSA templates**
- **Detailed security architecture diagram**
- **SOC2/ISO readiness assessment**

---

## 🔍 Sample RLS Policy (SQL)

```sql
-- Row Level Security Policy Example
CREATE POLICY tenant_isolation ON projects
    FOR ALL TO authenticated_users
    USING (org_id = current_setting('app.current_org')::uuid);

-- Ensures users can only access data for their organization
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
```

---

## ✅ Security Checklist for Customers

Before sharing data, ensure:
- [ ] Data sharing is approved by your Data Protection Officer
- [ ] No PCI/PHI data is included unless explicitly discussed
- [ ] Meeting recordings have participant consent for AI processing
- [ ] You have internal approval for 90-day retention (or specify alternative)
- [ ] Your security team has reviewed this document

---

*Last Updated: December 2024 | Version 1.0*  
*Next Security Review: March 2025*

**For immediate security concerns or incidents, contact: security@austinmander.com**