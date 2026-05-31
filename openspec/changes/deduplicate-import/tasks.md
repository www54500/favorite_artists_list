## 1. Core Services

- [x] 1.1 Update `processImportData` in `src/services/backup.js` to implement the deduplication logic using the `tag` field
- [x] 1.2 Update unit tests in `src/services/backup.test.js` to verify deduplication and metadata updates

## 2. Verification

- [x] 2.1 Manually verify that importing the same file twice does not create duplicate rows
- [x] 2.2 Verify that importing a file with updated names/triggers for existing tags correctly updates the UI
