# SOW — Change Radar QuickWin™ (1–2 week Proof of Value)

**Project:** Change Radar QuickWin™ — 2-Week Proof of Value  
**Client:** [Client Legal Name]  
**Consultant:** Austin Mander / Change Radar  
**SOW ID:** CR-QW-YYYYMMDD  
**Fee:** £10,000 (or £8k–12k as agreed)  
**Payment:** 50% upfront on signature; 50% on delivery  
**Duration:** 10 business days (2 weeks) from data access approval  

---

## Objective

Deliver rapid, measurable evidence that Change Radar can surface actionable programme risks and return leadership time by integrating a representative dataset and producing an executive decision pack.

---

## Scope & Deliverables

### ✅ Included

#### 1. Kickoff & Data Intake (Day 0–1)
- 60 minute kickoff with Sponsor + PMO
- Delivery of Data Access Checklist & secure upload instructions
- Assign project lead & communication cadence

#### 2. Data Ingest & Configuration (Day 1–4)
- Ingest up to 3 data sources (e.g., Excel exports, Jira/Smartsheet extract, PMO report)
- Minimal transformation and mapping to Change Radar schema
- Privacy & security checks

#### 3. Analysis & AI Scoring (Day 4–8)
- Run Change Radar ingestion + rule-based and ML analysis
- Action extraction for meetings (if meeting transcripts provided)
- Generate explainable predictions (SHAP summaries + evidence pointers)

#### 4. Executive Brief & Decision Pack (Day 9–10)
- Top 3 prioritized risks with evidence and recommended actions
- One-page summary of leadership hours recovered estimate
- 8–12 slide executive-ready briefing + short recorded walkthrough (10 min)

#### 5. Handover & Next Steps (Day 10)
- 60 minute executive review session
- Delivery of raw output dataset and implementation recommendations
- Optional proposal for Implementation engagement

### ❌ Excluded (will be quoted if required)
- Production integrations with live Jira/Smartsheet APIs (beyond CSV/Excel ingest)
- Longitudinal modelling beyond the sample window provided
- Large-scale meeting STT ingestion (unless separately agreed)

---

## Success Criteria (Contractual)

At least **one** of the following must be met for QuickWin acceptance:

1. **≥ 3 actionable insights** (risks or dependency conflicts) with evidence **OR**
2. **Demonstrable reduction** in leadership reconciliation time of ≥ X hours/week (measured via baseline + post session) **OR**
3. **Delivery of an executive decision** that the Sponsor agrees was accelerated as a result of the evidence

**Remediation:** If none met, Consultant will provide up to 5 hours of remediation work (additional analysis or teammate workshop) at no extra cost.

---

## Client Responsibilities 
*Must deliver within 48 hours of signature*

- Provide required data extracts (see Data Access Checklist) and one named Sponsor/POC
- Provide secure SFTP/S3 upload or Supabase credentials as detailed in Data Access Checklist
- Availability for two 60-minute sessions (kickoff and executive review)
- Approve anonymisation/PII handling approach if datasets include personal data

---

## Timeline (Example)

| Day | Activity |
|-----|----------|
| **Day 0** | Sign + 50% payment + Kickoff |
| **Day 1–3** | Data ingest & mapping |
| **Day 4–8** | Analysis & model runs |
| **Day 9** | Prepare executive pack |
| **Day 10** | Executive review + delivery + final payment |

---

## Pricing & Terms

- **Fee:** £10,000 (50% upfront, 50% on delivery)
- **Invoice:** Net 7 days
- **Additional work:** Outside scope billed at £300/hr
- **Intellectual Property:** Client retains rights to outputs generated for their data. Consultant retains IP for tooling, algorithms, and core product
- **Confidentiality:** Standard NDA applies (available on request)
- **Termination:** Either party may terminate with 5 business days' notice; client pays for work completed to date

---

## Risks & Mitigation

1. **Data delay** — Project timeline contingent on timely data delivery. If data provided late, timeline shifts; Consultant will rebase schedule and notify Sponsor
2. **Data quality** — Consultant will run quality checks and flag issues; remediation may require additional time
3. **Security** — See attached Security One-Pager (controls, RLS, redaction)

---

## Signatures

By signing, both parties agree to the scope, deliverables and terms above.

**Client:** ______________________ **Date:** __________

**Austin Mander (Change Radar):** ______________________ **Date:** __________

---

## Appendix A — Data Access Checklist

### Required Data (CSV/Excel Format)

1. **Project list**
   - project_id, name, owner, status, planned_start, planned_end, budget

2. **Milestones**
   - milestone_id, project_id, name, planned_date, status

3. **Risks**
   - risk_id, project_id, description, likelihood, owner, status, last_updated

### Optional Data

4. **Resource allocation**
   - resource_id, project_id, role, allocation_percent

5. **Recent Steering meeting minutes**
   - PDF/MD or raw transcripts (if available)

6. **Meeting recordings**
   - Small sample (1–5) audio or transcript files (consent required)

### Upload Instructions
- Secure presigned S3 link will be provided post-signature
- Alternative: SFTP credentials if preferred
- All files must be uploaded within 48 hours of SOW signature

---

*Version 1.0 | December 2024*