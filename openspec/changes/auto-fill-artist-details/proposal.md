## Why

Manually entering the Artist Name and SD Trigger Word after providing a Danbooru Tag is repetitive and error-prone. Since both fields can be derived directly from the tag string using common formatting rules, automating this process improves user efficiency and ensures data consistency.

## What Changes

- **Automatic Formatting**: In the `ArtistModal`, entering a Danbooru Tag will automatically populate the "Artist Name" and "SD Trigger Word" fields if they are currently empty.
- **Trigger Word Formatting**: Parentheses in the tag will be automatically escaped with backslashes (e.g., `(name)` becomes `\(name\)`).
- **Artist Name Formatting**: Underscores will be replaced with spaces, and every word will be capitalized (Title Case).

## Capabilities

### New Capabilities
(None)

### Modified Capabilities
- `artist-management`: Add requirements for automatic field population and formatting in the creation/edit modal.

## Impact

- `src/components/ArtistModal.jsx`: Logic update to handle tag change events and field auto-population.
