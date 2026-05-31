## 1. UI Components Implementation

- [x] 1.1 Add `isCollapsed` local state and toggle icon (chevron) to `ArtistRow.jsx`
- [x] 1.2 Update `ArtistRow.jsx` to render the gallery only when `!isCollapsed`
- [x] 1.3 Add "Expand All" and "Collapse All" buttons to `Header.jsx`
- [x] 1.4 Implement `BackToTop` button component with scroll visibility logic

## 2. Global State & Wiring

- [x] 2.1 Add `bulkToggleSignal` state to `App.jsx` to broadcast collapse/expand commands
- [x] 2.2 Wire `Header.jsx` buttons to update the global signal in `App.jsx`
- [x] 2.3 Update `ArtistRow.jsx` to listen for the global signal and update local state accordingly

## 3. Verification

- [x] 3.1 Verify individual row toggling works correctly
- [x] 3.2 Verify bulk "Expand All" and "Collapse All" affect all rows
- [x] 3.3 Verify "Back to Top" button appears on scroll and functions correctly
