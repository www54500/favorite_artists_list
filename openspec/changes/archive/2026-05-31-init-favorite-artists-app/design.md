## Context

This project is a greenfield PWA. It must run entirely in the browser without a backend. The primary challenge is managing image data (binary blobs) and ensuring they remain accessible offline.

## Goals / Non-Goals

**Goals:**
- Provide a smooth, installable desktop experience using PWA standards.
- Store artist data and image blobs persistently in IndexedDB.
- Automatically fetch visual context from Danbooru.
- Keep data portability simple via JSON export/import.

**Non-Goals:**
- Cloud synchronization.
- Sophisticated image editing or tagging features.
- Support for other image boards besides Danbooru (for now).

## Decisions

### 1. Framework: React with Vite
- **Rationale**: Vite provides excellent developer experience and built-in PWA plugin support. React is ideal for managing the state of the artist list and carousels.

### 2. Storage: localforage (IndexedDB)
- **Rationale**: `localforage` provides a simple, Promise-based API for IndexedDB. It handles binary blobs (images) efficiently, which is critical for this app.
- **Alternative Considered**: LocalStorage (too small, no blob support), Dexie.js (excellent but `localforage` is simpler for this scope).

### 3. PWA Plugin: vite-plugin-pwa
- **Rationale**: It automates service worker generation and manifest creation, making the "Add to Home Screen / Desktop" experience trivial to implement.

### 4. Data Export Strategy: Text-Only JSON
- **Rationale**: Exporting 100+ high-res images in a single backup would create massive, unwieldy files. Exporting only tags and metadata keeps files small. Re-fetching images on import is a fast, automated background process.

### 5. Image Lifecycle Management (Caching & Refresh)
- **Lazy Fetching**: Upon artist creation, images are only fetched if the local store for that artist tag is empty.
- **Manual Refresh**: A "Refresh" button on each artist row allows users to pull 8 new images from Danbooru.
- **Deduplication**: When fetching images, the app compares the Danbooru image ID against existing local images for that artist. Only unique images are downloaded and saved.
- **Retention Strategy**: When refreshing, new unique images are prepended to the local store. If the total images for an artist exceed 20, the oldest images are pruned to maintain a 20-image limit.
- **Display**: The UI carousel renders all locally stored images for an artist, not just the latest 8.
- **Cleanup**: When an artist is deleted, the app must explicitly remove both the artist metadata and all associated image blobs from IndexedDB to prevent orphaned data and save space.

## Risks / Trade-offs

- **[Risk] Browser Storage Clearing** → **Mitigation**: PWAs are generally more persistent, but users will be prompted to use the Export feature regularly.
- **[Risk] Danbooru API Rate Limits** → **Mitigation**: The app only fetches 8 images per artist at creation/import time, minimizing traffic.
- **[Risk] Storage Quota** → **Mitigation**: IndexedDB has generous quotas (usually gigabytes), sufficient for hundreds of artist image sets.
