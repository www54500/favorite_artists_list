## 1. Services & Logic

- [x] 1.1 Implement `updateArtistImages(oldTag, newTag)` logic in `src/App.jsx` or a new service (Implemented in `App.jsx` using `deleteImagesForArtist`)
- [x] 1.2 Update `storage.js` to ensure `saveArtist` correctly handles updates (Verified and added `deleteImagesForArtist`)

## 2. UI Components

- [x] 2.1 Refactor `AddModal.jsx` to `ArtistModal.jsx` to support both Add and Edit modes
- [x] 2.2 Update `ArtistRow.jsx` to make the artist name a link to Danbooru
- [x] 2.3 Add an "Edit" button to `ArtistRow.jsx` with an edit icon
- [x] 2.4 Wire the "Edit" button to open `ArtistModal.jsx` with the artist's current data

## 3. Integration & Refinement

- [x] 3.1 Update `App.jsx` to handle the `onEdit` callback and perform the tag-update logic
- [x] 3.2 Ensure visual consistency of the new link and button

## 4. Verification

- [x] 4.1 Verify that clicking the artist name opens the correct Danbooru page
- [x] 4.2 Verify that editing Name/Trigger word updates the UI without re-fetching images
- [x] 4.3 Verify that changing the Tag clears old images and fetches new ones
