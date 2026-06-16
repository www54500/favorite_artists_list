## Context

The `ArtistModal` is used to add and edit artists. Currently, the user must type or paste values into all three fields (Name, Trigger, Tag) manually.

## Goals / Non-Goals

**Goals:**
- Implement a helper function to format strings from the Danbooru tag.
- Trigger auto-filling logic when the Tag field changes.
- Ensure auto-fill does not overwrite data already entered by the user.

**Non-Goals:**
- Connecting to an external database to fetch "real" artist names (we derivation-only approach).

## Decisions

### 1. Formatting Logic
- **Artist Name**: 
  - `tag.replace(/_/g, ' ')`
  - Capitalize first letter of each word using `.replace(/\b\w/g, char => char.toUpperCase())`.
- **SD Trigger**:
  - `tag.replace(/\(/g, '\\(').replace(/\)/g, '\\)')` to escape parentheses for SD.

### 2. UI Trigger
- Use an `onChange` handler on the Tag input.
- To prevent annoying behavior, we only auto-fill if the Name and Trigger fields are empty OR if they currently match the previous auto-filled value derived from the old tag.

## Risks / Trade-offs

- **[Risk] Incorrect Capitalization** → Some tags might contain abbreviations or unique casing that simple title casing misses (e.g. `wlop` -> `Wlop` vs `WLOP`). **Mitigation**: The fields remain manually editable.
