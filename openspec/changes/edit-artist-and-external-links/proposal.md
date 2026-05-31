# Proposal - Edit Artist and External Links

## Why
Users need to be able to correct mistakes in artist metadata (Name, Trigger Word, Tag) without deleting and re-adding the entire entry. Additionally, providing a direct link to the Danbooru artist page improves the utility of the app as a reference tool.

## What Changes
- **Artist Row**: Make the artist name a clickable link to their Danbooru artist page.
- **Edit Functionality**: Add an "Edit" button to each artist row.
- **Edit Modal**: Implement a modal to update artist details.
- **Automated Re-fetch**: If the Danbooru tag is changed, the system must purge old images and download new ones for the updated tag.

## Capabilities

### New Capabilities
(None)

### Modified Capabilities
- `artist-management`: Add requirements for editing artist details and linking to external profiles.
- `danbooru-integration`: Ensure image purging/re-fetching works correctly upon tag update.

## Impact
- `src/components/ArtistRow.jsx`: UI changes for link and edit button.
- `src/components/AddModal.jsx`: Potentially rename/refactor to `ArtistModal.jsx` to support both Add and Edit modes.
- `src/App.jsx`: State management for editing.
- `src/services/storage.js`: Add update logic if not already present.
