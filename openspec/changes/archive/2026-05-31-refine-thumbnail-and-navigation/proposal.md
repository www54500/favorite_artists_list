## Why

The user wants to use high-quality yet storage-efficient thumbnails (specifically prioritizing 360x360 resolution) for the in-app carousel to maximize performance and visual clarity. Additionally, clicking a thumbnail should navigate to the Danbooru post page for a detailed view, rather than opening the local blob.

## What Changes

- **Image Fetching**: Update `src/services/danbooru.js` to parse `media_asset.variants` and implement a specific priority sequence: `360x360` > `180x180` > `720x720` > `sample` > `original`.
- **Navigation**: Update `src/components/ArtistRow.jsx` click handler to open the Danbooru post page (`https://danbooru.donmai.us/posts/{id}`) in a new tab.

## Capabilities

### New Capabilities
(None)

### Modified Capabilities
- `danbooru-integration`: Update requirements for fine-grained thumbnail selection and navigation logic.

## Impact

- `src/services/danbooru.js`: Logic change in URL selection using a new helper function.
- `src/components/ArtistRow.jsx`: Logic change in interaction handler.
