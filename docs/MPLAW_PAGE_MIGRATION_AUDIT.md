# Meridian Partners legacy-page migration audit

Reviewed against the WordPress REST snapshot on 25 August 2026. This document covers the 15 WordPress pages and five service entries that are not part of the editorial article category. The 25 genuine articles are already represented in the new article archive.

## Recommendation

Do not decommission WordPress until the priority-one pages below have equivalents on the new site and permanent redirects have been tested. The current new homepage still sends service, profile, about, booking, and notary visitors to `mplaw.nz`.

## Priority one — recreate before decommissioning

| Legacy content | Recommended new destination | Reason |
| --- | --- | --- |
| Services | `/services` | A durable service hub is needed for discovery, navigation, and search visibility. |
| Tax Disputes & IRD Negotiation | `/services/tax-disputes-ird-negotiation` | Core practice area and a prominent homepage link. |
| Student Loan Debt & IRD Negotiation | `/services/student-loan-debt` | Core Dave Ananth service and frequent article topic. |
| Acquisitions and Sales (Property & Business) | `/services/property-business-transactions` | Current homepage property link depends on WordPress. |
| Property, Subdivision & Development | `/services/property-development` | Distinct service intent; cross-link with the transaction page. |
| Asset Protection & Estate Planning Law | `/services/asset-protection-estate-planning` | Service content should not appear in the editorial archive. |
| Notary Public | `/services/notary-public` | High-intent service with direct enquiries; preserve relevant service limitations and contact details. |
| Contact | `/contact` | Must provide phone, email, address, maps, hours, and accessible enquiry options. |
| Book a Consultation | `/book-a-consultation` | Every prominent call to action currently depends on WordPress. Confirm the final scheduling or enquiry workflow before launch. |

## Priority two — recreate or consolidate

| Legacy content | Recommendation | Verification needed |
| --- | --- | --- |
| About | Create `/about` with firm story, approach, credentials, and team overview. | Confirm current copy, memberships, and regulatory descriptions. |
| Dave Ananth | Create `/people/dave-ananth`. | Verify title, admissions, experience statement, and current contact preferences. |
| Adelina Ong | Create `/people/adelina-ong`. | Verify title, notary status, practice areas, and biography. |
| Arvind Nair | Create `/people/arvind-nair`. | Verify title, practice areas, and biography. |
| Michelle Delegat | Create `/people/michelle-delegat`. | Verify current title and whether employment and family law both remain current. |
| Kevin Tiew | Recreate only if still part of the firm. | Confirm current employment, role, and consent to publish. |
| Liz Culpan | Recreate only if still part of the firm. | Confirm current employment, role, and consent to publish. |
| Simran Aujla | Recreate only if still part of the firm. | Confirm current employment, role, and consent to publish. |

## Replace, merge, or retire

| Legacy page | Action |
| --- | --- |
| Home | The modern homepage replaces it. Retain only as a permanent redirect to the new homepage. |
| Articles | The new searchable Articles & Media archive replaces it. Redirect to the new archive. |
| Test | Retire. Do not migrate or index. Return `410 Gone` if there is no legitimate inbound value, otherwise redirect to the homepage. |
| Five service entries stored as WordPress posts | Merge into the service architecture above. Do not mix them with news, analysis, or media. |

## Decommission checklist

1. Approve the service and people page scope, especially the status of Kevin Tiew, Liz Culpan, and Simran Aujla.
2. Confirm the consultation workflow and destination email/calendar owner.
3. Build and review the priority-one pages, then replace every remaining `mplaw.nz` link in the new site.
4. Export a final WordPress snapshot and media library for records.
5. Create a one-to-one `301` redirect map for every public legacy URL, including all 25 article slugs.
6. Test redirects, canonical URLs, page titles, descriptions, structured data, forms, telephone/email links, and mobile navigation.
7. Keep the old domain and redirects active after WordPress is removed; decommission the application, not the URLs.

## Proposed next build

The safest next phase is to create the service hub, six service pages, contact page, consultation page, about page, and four confirmed team profiles. The remaining three people pages should wait for a current-staff confirmation.
