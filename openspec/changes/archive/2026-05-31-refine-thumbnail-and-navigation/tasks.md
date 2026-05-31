## 1. Core Services

- [x] 1.1 Implement `getBestImageUrl(post)` helper in `src/services/danbooru.js` with the specified priority sequence
- [x] 1.2 Update `downloadImages` to use `getBestImageUrl(post)`
- [x] 1.3 Update unit tests in `src/services/danbooru.test.js` to verify the new priority sequence

## 2. UI Components

- [x] 2.1 Update `ArtistRow.jsx` to link gallery images to `https://danbooru.donmai.us/posts/{id}`
- [x] 2.2 Ensure clicking an image correctly identifies the post ID

## 3. Verification

- [x] 3.1 Verify that `360x360` images are fetched when available via `media_asset.variants`
- [x] 3.2 Verify correct fallback behavior for images without variants
- [x] 3.3 Verify clicking an image opens the Danbooru post page correctly
