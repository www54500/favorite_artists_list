## 1. Core Services

- [x] 1.1 Update `downloadImages` in `src/services/danbooru.js` to prioritize `preview_file_url`
- [x] 1.2 Update unit tests in `src/services/danbooru.test.js` for the new prioritization

## 2. UI Components

- [x] 2.1 Update `ArtistRow.jsx` to link gallery images to `https://danbooru.donmai.us/posts/{id}`
- [x] 2.2 Remove memory cleanup for `URL.createObjectURL` if it's no longer used (Verified: still used for local display)
- [x] 2.3 Ensure clicking an image correctly identifies the post ID

## 3. Verification

- [x] 3.1 Verify thumbnails are fetched as smaller previews
- [x] 3.2 Verify clicking an image opens the Danbooru post page correctly
