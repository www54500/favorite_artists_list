## 1. UI Components Implementation

- [ ] 1.1 Add `isCollapsed` local state and toggle icon (chevron) to `ArtistRow.jsx`
- [ ] 1.2 Update `ArtistRow.jsx` to render the gallery only when `!isCollapsed`
- [ ] 1.3 Add "Expand All" and "Collapse All" buttons to `Header.jsx`
- [ ] 1.4 Implement `BackToTop` button component with scroll visibility logic

## 2. Global State & Wiring

- [ ] 2.1 Add `bulkToggleSignal` state to `App.jsx` to broadcast collapse/expand commands
- [ ] 2.2 Wire `Header.jsx` buttons to update the global signal in `App.jsx`
- [ ] 2.3 Update `ArtistRow.jsx` to listen for the global signal and update local state accordingly

## 3. Verification

- [ ] 3.1 Verify individual row toggling works correctly
- [ ] 3.2 Verify bulk "Expand All" and "Collapse All" affect all rows
- [ ] 3.3 Verify "Back to Top" button appears on scroll and functions correctly
