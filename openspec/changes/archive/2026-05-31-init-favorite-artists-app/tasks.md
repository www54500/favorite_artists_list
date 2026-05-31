## 1. Project Setup

- [x] 1.1 Initialize Vite + React project with Tailwind CSS
- [x] 1.2 Configure Vitest for unit and integration testing
- [x] 1.3 Install and configure `localforage` for IndexedDB interactions
- [x] 1.4 Install and configure `vite-plugin-pwa` for standalone desktop support

## 2. Core Services

- [x] 2.1 Implement `storage.js` service for artist metadata and image blob management
- [x] 2.2 Implement `danbooru.js` service for fetching and downloading image blobs from Danbooru API
- [x] 2.3 Implement image caching logic in `danbooru.js`: skip fetch if local images exist
- [x] 2.4 Implement image deduplication logic: check existing image IDs before saving
- [x] 2.5 Implement image refresh and retention logic: fetch new, keep up to 20, prune old
- [x] 2.6 Implement `backup.js` service for textual JSON export and image-re-fetching import

## 3. UI Implementation

- [x] 3.1 Create `Header.jsx` with navigation and system actions (Add, Export, Import)
- [x] 3.2 Create `AddModal.jsx` for capturing new artist details
- [x] 3.3 Create `ArtistRow.jsx` with horizontal scrolling carousel for artist artwork, a "Refresh" button, and a "Delete" button
- [x] 3.4 Implement artist deletion logic: remove metadata and all associated images from storage
- [x] 3.5 Integrate services and components in `App.jsx`

## 4. Finalization & Testing

- [x] 4.1 Verify all scenarios from specifications via automated or manual testing
- [x] 4.2 Perform PWA build and verify "Install" functionality and offline behavior
- [x] 4.3 Verify data persistence after browser refresh and standalone app restart
