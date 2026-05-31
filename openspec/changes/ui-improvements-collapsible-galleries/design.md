## Context

The user interface needs to be more adaptable to long lists of artists. The primary goals are compactness and ease of navigation.

## Goals / Non-Goals

**Goals:**
- Allow users to hide/show image galleries for individual artists.
- Provide bulk expand/collapse actions.
- Provide a quick way to return to the top of the page.

**Non-Goals:**
- Persisting the expanded/collapsed state between sessions (for now).

## Decisions

### 1. Collapsible Row Logic
- **Decision**: Each `ArtistRow` will manage its own `isCollapsed` state. 
- **Rationale**: Local state is simpler and allows users to toggle rows independently.
- **UI**: A chevron or +/- icon next to the artist name will serve as the toggle.

### 2. Global Bulk Actions
- **Decision**: `App.jsx` will maintain a `globalToggleCounter` state. When "Expand All" or "Collapse All" is clicked, this counter increments and is passed down to all `ArtistRow` components along with the desired state (true/false).
- **Rationale**: This allows `App.jsx` to signal a reset to all rows without forcing them to be fully controlled components (which would make individual toggling more complex to manage at the root).

### 3. Back to Top Button
- **Decision**: A fixed floating button at the bottom-right of the viewport.
- **Rationale**: Standard pattern for long lists.
- **Behavior**: Hidden by default. Shown when `window.scrollY > 300`.

## Risks / Trade-offs

- **[Trade-off] State Management**: Bulk actions that affect local child state can be tricky. Using a "trigger" pattern (timestamp or counter) ensures the child updates only when the user explicitly clicks the global button.
