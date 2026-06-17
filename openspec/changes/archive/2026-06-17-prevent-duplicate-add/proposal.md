# Proposal - Prevent Duplicate Add

## Why
When adding a new artist, users might accidentally enter a Danbooru tag that is already in the list. Currently, the system might silently overwrite or duplicate the entry (depending on internal logic). Showing an explicit alert with the artist's name when a duplicate is detected prevents accidental data loss/duplication and informs the user that the artist is already tracked.

## What Changes
- **Add Artist Logic**: Before saving a new artist, the system will check if the Danbooru tag already exists in the local database.
- **User Notification**: If a duplicate is found, the system will show an alert (e.g., `window.alert`) mentioning the existing artist's name and stop the creation process.

## Capabilities

### New Capabilities
(None)

### Modified Capabilities
- `artist-management`: Add requirement for duplicate detection and notification during manual artist creation.

## Impact
- `src/components/ArtistModal.jsx`: Logic update in `handleSubmit`.
- `src/App.jsx`: Logic update in `handleAddArtist`.
