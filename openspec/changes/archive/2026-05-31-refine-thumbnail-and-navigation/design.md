## Context

The app needs a robust way to select the best thumbnail resolution from Danbooru's modern API which includes a `media_asset.variants` field.

## Goals / Non-Goals

**Goals:**
- Target `360x360` as the primary thumbnail size for the list view.
- Provide a robust fallback sequence for different image ages/types.
- Link the gallery images directly to their respective Danbooru post pages.

## Decisions

### 1. Variant Priority Sequence
- **Decision**: The selection logic will check for variants in this order:
  1. `media_asset.variants` where `type === '360x360'`
  2. `media_asset.variants` where `type === '180x180'`
  3. `media_asset.variants` where `type === '720x720'`
  4. `media_asset.variants` where `type === 'sample'`
  5. `media_asset.variants` where `type === 'original'`
  6. Legacy `preview_file_url`
  7. Legacy `large_file_url`
  8. Legacy `file_url`

### 2. Implementation Approach
- **Decision**: Create a helper function `getBestImageUrl(post)` in `danbooru.js` that encapsulates this priority logic.
- **Rationale**: Keeps the core downloading logic clean and makes the priority logic easily testable.

### 3. Gallery Interaction
- **Decision**: Change `ArtistRow.jsx` click handler.
- **Rationale**: Instead of `window.open(img.url)`, we will use `window.open(`https://danbooru.donmai.us/posts/${img.id}`, '_blank')`. We already store the Danbooru post ID as `img.id` in our IndexedDB.

## Risks / Trade-offs

- **[Risk] Missing Variants**: Older posts might not have the `media_asset` field.
- **[Mitigation] Legacy Fallbacks**: The sequence includes the old URL fields as fallbacks.
