## Why

As the list of artists grows, the page becomes very long due to the image carousels. Users need a way to quickly scan artist names and trigger words without being overwhelmed by images. Improved navigation (back-to-top) is also necessary for a better user experience in long lists.

## What Changes

- **Collapsible Galleries**: Each artist row will have a toggle to show/hide its image carousel.
- **Global Controls**: Two buttons at the top ("Collapse All" and "Expand All") to control all artist rows at once.
- **Back-to-Top Button**: A floating button at the bottom right that appears when scrolling down, allowing the user to jump back to the top.

## Capabilities

### New Capabilities
- `ui-navigation`: Provide global UI controls for layout state and page navigation (scroll-to-top).

### Modified Capabilities
- `artist-management`: Add requirement for individual artist row collapse/expand state.

## Impact

- `src/components/ArtistRow.jsx`: Individual collapse logic.
- `src/components/Header.jsx`: Placeholder for global buttons or new sub-header.
- `src/App.jsx`: Global state for collapse/expand and scroll-to-top button.
