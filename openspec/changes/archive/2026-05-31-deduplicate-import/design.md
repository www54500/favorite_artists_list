# Design - Deduplicate Import

## Context
The import process lacks an idempotency check, leading to duplicates.

## Goals / Non-Goals
**Goals:**
- Prevent duplicate artist entries during JSON import.
- Update existing metadata if the artist already exists.

## Decisions

### 1. Unique Key Identification
- **Decision**: Use the `Danbooru Tag` as the unique identifier for comparison.
- **Rationale**: While internal IDs are unique to a session, the Danbooru Tag is the source-of-truth identifier for the artist across devices and backups.

### 2. Implementation Flow
- **Workflow** in `processImportData`:
  1. Fetch all current artists from `storage.js`.
  2. For each artist in the import JSON:
     a. Check if an artist with the same `tag` exists in the local list.
     b. If exists: Update the local artist's `name` and `trigger` with the imported values. Keep the local `id`.
     c. If NOT exists: Generate a new `id` and add to the list.
  3. Call `saveArtist` (which handles upserts) for each.

## Risks / Trade-offs
(None significant)
