## Why

The application currently fetches full-resolution images from Danbooru as visual references. These files are often several megabytes each, leading to slow load times, high storage usage in IndexedDB, and visual artifacts when scaled down to thumbnails. Using Danbooru's dedicated thumbnail/preview images will improve performance and visual clarity for the gallery view.

## What Changes

- Update the Danbooru fetching logic to prioritize `preview_file_url` or `large_file_url` over the full-resolution `file_url`.
- (Optional) Continue to allow access to the full image when clicked, but store the thumbnail for the primary list view. For this simple app, we will switch to storing the "large" or "preview" version to balance quality and size.

## Capabilities

### New Capabilities
(None)

### Modified Capabilities
- `danbooru-integration`: Update image fetching requirement to specify thumbnail/preview resolution for example images.

## Impact

- Affects `src/services/danbooru.js`.
- Reduces storage impact in IndexedDB.
- Improves render performance in `src/components/ArtistRow.jsx`.
