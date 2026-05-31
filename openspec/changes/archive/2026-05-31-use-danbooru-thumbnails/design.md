## Context

Example images are currently fetched at full resolution. This is inefficient and causes visual issues in the UI carousel.

## Goals / Non-Goals

**Goals:**
- Fetch lower-resolution "large" or "preview" versions of images for the list view.
- Reduce bandwidth and storage usage.

**Non-Goals:**
- Storing multiple resolutions for the same image (to keep IndexedDB simple).

## Decisions

### 1. Image Resolution Priority
- **Decision**: Prioritize `large_file_url` from the Danbooru API. Fallback to `preview_file_url` if `large_file_url` is missing, and only use `file_url` as a last resort.
- **Rationale**: `large_file_url` provides a high-quality "web" resolution (usually around 1200px width) which looks sharp in the carousel and full-screen modal, while being significantly smaller than the original high-res files (which can be 50MB+ PNGs/TIFFs).

## Risks / Trade-offs

- **[Trade-off] Clicking for Detail**: If we store only the "large" version, clicking to open the image in a new tab will show that version instead of the raw original. For an "example gallery," this is an acceptable trade-off for performance.
