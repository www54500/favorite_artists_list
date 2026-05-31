# Proposal - Deduplicate Import

## Why
When users import a JSON backup, the system currently creates new entries with random IDs even if the artist already exists in the list. This leads to a cluttered UI with duplicate artists. We need a way to identify existing artists and update them instead of duplicating them.

## What Changes
- **Import Logic**: During import, the system will use the `Danbooru Tag` as a unique key to check for existing artists.
- **Update vs. Create**: If an artist with the same tag exists, the system will update the existing metadata (Name, Trigger Word) and preserve the original ID. If it doesn't exist, a new entry is created.

## Capabilities

### New Capabilities
(None)

### Modified Capabilities
- `data-backup`: Add requirements for deduplication and conflict handling during import.

## Impact
- `src/services/backup.js`: Update `processImportData` logic.
