# Design - Edit Artist and External Links

## Context
The application allows listing artists but lacks a way to update existing entries or quickly navigate to their source profiles.

## Goals / Non-Goals
**Goals:**
- Enable editing of artist Name, Trigger Word, and Tag.
- Automatic image refreshment when the Tag changes.
- Direct linking to Danbooru artist pages.

**Non-Goals:**
- Manually selecting which images to delete during an edit.

## Decisions

### 1. Unified Artist Modal
- **Decision**: Refactor `AddModal.jsx` into a more generic `ArtistModal.jsx`.
- **Rationale**: The fields (Name, Trigger, Tag) are identical for adding and editing. Reducing duplication improves maintainability.

### 2. Tag Update Logic
- **Decision**: In `App.jsx`, the update handler will check if `oldTag !== newTag`.
- **Rationale**: If the tag changes, the current image set is no longer valid for the artist entry.
- **Workflow**:
  1. Save updated metadata.
  2. If tag changed: Purge images for `oldTag`, then trigger `fetchLatestImages(newTag)`.

### 3. Artist Page Link
- **Decision**: The artist name in the header will be wrapped in an `<a>` tag.
- **URL**: `https://danbooru.donmai.us/artists/show?name=${encodeURIComponent(artist.tag)}`

## Risks / Trade-offs
- **[Risk] Data Loss**: If a user accidentally changes a tag, their previous local images are lost.
- **[Mitigation]**: We can add a confirmation prompt if the tag is modified, or simply rely on the fact that images are re-fetched immediately. Given the app's simplicity, re-fetching is acceptable.
