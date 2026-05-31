## Why

Users currently have to manually highlight and copy the SD trigger word for an artist. Providing a one-click "copy to clipboard" feature improves the workflow for AI generation, which is the primary use case for this app.

## What Changes

- Add a "Copy" button or click interaction to the SD trigger word in the `ArtistRow` component.
- Visual feedback (e.g., a "Copied!" tooltip or icon change) when the trigger word is successfully copied.

## Capabilities

### New Capabilities
- `clipboard-interaction`: Provide utility functions for copying text to the user's clipboard.

### Modified Capabilities
- `artist-management`: Add requirement for copying the SD trigger word to clipboard.

## Impact

- Affects `src/components/ArtistRow.jsx`.
- Minimal impact on existing data models.
