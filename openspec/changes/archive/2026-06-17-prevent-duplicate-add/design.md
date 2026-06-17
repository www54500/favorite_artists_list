# Design - Prevent Duplicate Add

## Context
Manual artist creation lacks validation for existing tags, leading to potential duplicates or unexpected overwrites.

## Goals / Non-Goals
**Goals:**
- Detect existing Danbooru tags during the "Add Artist" flow.
- Inform the user via an alert with the artist's name.
- Prevent submission if a duplicate is found.

## Decisions

### 1. Validation Point
- **Decision**: Perform the check in `App.jsx` within the `handleAddArtist` function (or pass the existing list to `ArtistModal`).
- **Rationale**: `App.jsx` already manages the `artists` state, making it the most efficient place to perform the check before calling `saveArtist`.

### 2. Alert Content
- **Decision**: The alert should state: `Artist with tag "{tag}" already exists as "{name}".`
- **Rationale**: Providing the existing name helps the user identify the conflict immediately.

## Risks / Trade-offs
(None significant)
