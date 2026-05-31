## Why

The goal is to create a personal, offline-first desktop application (PWA) to track favorite artists, their Stable Diffusion trigger words, and visual references. Currently, there is no simple tool that automatically fetches visual references from Danbooru and stores them locally for offline use without a complex backend.

## What Changes

- **Core Application**: Initialize a React + Vite PWA.
- **Local Storage**: Implement IndexedDB storage for artist metadata and binary image blobs.
- **External Integration**: Integrate Danbooru API to fetch the 8 latest images for an artist tag. Skip fetching if images already exist locally.
- **Image Retention & Refresh**: Allow manual refresh to pull 8 new images. Dedup images by ID to avoid duplicates. Retain existing images up to a maximum of 20 per artist.
- **Offline Capabilities**: Ensure images are downloaded and stored locally. Show all local images in the carousel.
- **Data Portability**: Implement JSON-based export/import for textual data with automatic re-fetching of images upon import.
- **UI**: Create a list-based view with horizontal carousels for artist artwork.

## Capabilities

### New Capabilities

- `artist-management`: Manage a list of favorite artists including their names and SD trigger words.
- `danbooru-integration`: Fetch and store visual reference images from Danbooru for a specific tag.
- `data-backup`: Export and import textual data to ensure portability between devices.
- `pwa-support`: Enable standalone desktop installation and offline availability.

### Modified Capabilities

(None - Initial project setup)

## Impact

- **Technologies**: React, Vite, Tailwind CSS, localforage, vite-plugin-pwa.
- **Storage**: Browser IndexedDB.
- **External APIs**: Danbooru (https://danbooru.donmai.us).
