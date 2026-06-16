## 1. Logic Implementation

- [x] 1.1 Implement string formatting utilities for Name and Trigger Word in `ArtistModal.jsx`
- [x] 1.2 Add state tracking for "auto-filled" values to avoid overwriting manual user input

## 2. UI Updates

- [x] 2.1 Update the Danbooru Tag input `onChange` handler to trigger auto-population
- [x] 2.2 Verify formatting: `_` to spaces, Title Case for names, escaped parentheses for triggers

## 3. Verification

- [x] 3.1 Manually verify that typing a tag like `mona_lisa` fills `Mona Lisa` into the name field
- [x] 3.2 Manually verify that typing a tag like `artist_(name)` fills `artist_\(name\)` into the trigger field
- [x] 3.3 Verify that manual changes by the user are not accidentally reverted by auto-fill
