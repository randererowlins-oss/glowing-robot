# Commercial readiness roadmap

The current deliverable is a client-side proof of product direction. A commercial music service needs the work below before accepting customers. This document is a launch plan, not a claim that these systems exist.

## 1. Rights and catalog — launch blocker

Negotiate territory-specific sound recording and publishing rights, mechanical/performance royalties, reporting and takedown processes. Secure artwork and metadata rights, resolve brand/trademark clearance, and replace all placeholder titles and sample audio with a catalog whose displayed metadata matches the recording. Define catalog availability and territorial restrictions server-side.

## 2. Backend architecture

Recommended separation:
- Authentication/account service with verified email, secure sessions, account recovery and deletion.
- Catalog service and relational database for artists, releases, recordings and availability.
- Library service for favorites, ordered playlists, pagination and cloud synchronization.
- Search index with autocomplete, typo tolerance and editorial ranking.
- Playback authorization service issuing short-lived signed media URLs only after checking entitlement and territory.
- Licensed media ingestion, transcoding, HLS/DASH packaging, object storage and CDN.
- Playback-event ingestion and auditable royalty reporting, with fraud prevention.

Example API boundary: `/api/search`, `/api/me/library`, `/api/playlists`, `/api/playback/:trackId`, `/api/subscriptions`. Browser clients should use same-origin URLs, never hardcoded localhost services. Authorization must be enforced by the backend rather than UI state.

Refactor the current single-file UI into feature modules (catalog, library, player, profile); move sample catalog data into fixtures and introduce typed API adapters. Consider React Router for persistent URLs, TanStack Query for server state and TypeScript for contracts.

## 3. Player and reliability

Implement licensed adaptive streams, gapless playback where supported, robust buffering/retry states, valid queue ordering, media-session integration, session restoration and explicit audio quality controls. Determine DRM and offline-download requirements with rights holders. Surface correct duration, availability and error reasons. Add CDN monitoring and real-device browser tests; verify codecs on Safari/iOS and Android.

## 4. Billing and business operations

Use a PCI-compliant hosted payment provider. Verify signed webhooks, handle idempotent entitlement changes, refunds, cancellation, taxes and regional consumer rules. Never store payment card details. Implement support tooling, accessibility feedback, moderation/takedown workflows and customer-facing service-status reporting. Do not charge for any roadmap-only feature.

## 5. Privacy and security

Create a data map, retention schedule, privacy policy, terms and cookie/consent policy appropriate to operating regions. Support export/deletion and applicable child-safety requirements. Validate inputs on the server, use rate limits, secure cookies, CSRF protection, security headers, secret management and least-privilege service identities. Self-host vetted assets; define a restrictive CSP. Audit dependencies, upload handling and authorization with independent security review.

## 6. Accessibility and quality gates

Target WCAG 2.2 AA. Audit muted typography and image-overlay contrast, zoom/reflow, visible focus, screen-reader announcements, touch targets, modal focus trapping and keyboard controls. Replace nested track-row action patterns with separate semantic controls before release. Provide fallback art and offline/network error states. Internationalize text, date/time and payment formatting.

Automate unit tests for filtering, queue navigation, repeat, storage migration and API errors. Add browser tests for playback, navigation, favorites, playlists, mobile layouts, authentication and purchases. Use axe scans, real assistive-technology testing, load testing and dependency scanning.

## 7. Delivery and observability

Add CI build/test/lint gates, preview deployments, staged releases and rollback capability. Define availability and playback-start SLOs, error tracking, privacy-preserving performance metrics, incident response and backup/restore exercises. Test migrations and disaster recovery. Obtain a final rights, security, accessibility and legal sign-off before opening paid subscriptions.
