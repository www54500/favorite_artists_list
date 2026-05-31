## MODIFIED Requirements

### Requirement: Optimized image resolution
The system SHALL fetch and store example images from Danbooru using the best available resolution based on a predefined priority to balance visual quality and performance.

#### Scenario: Downloading images with variants
- **WHEN** the system downloads an image from Danbooru
- **THEN** it SHALL prioritize available URLs in the following order:
  1. `360x360` variant
  2. `180x180` variant
  3. `720x720` variant
  4. `sample` variant
  5. `original` variant
  6. `preview_file_url` legacy field
  7. `large_file_url` legacy field
  8. `file_url` legacy field

### Requirement: Navigation to Danbooru post
The system SHALL allow users to navigate to the original Danbooru post page for any image in the gallery.

#### Scenario: Clicking a gallery image
- **WHEN** the user clicks a thumbnail in the artist carousel
- **THEN** the system SHALL open the corresponding Danbooru post page (`https://danbooru.donmai.us/posts/{id}`) in a new browser tab
