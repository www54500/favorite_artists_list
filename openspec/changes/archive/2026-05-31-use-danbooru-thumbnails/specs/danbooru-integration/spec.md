## ADDED Requirements

### Requirement: Optimized image resolution
The system SHALL fetch and store example images from Danbooru using optimized web-resolutions to balance visual quality and performance.

#### Scenario: Downloading optimized images
- **WHEN** the system downloads an image from Danbooru
- **THEN** it SHALL prioritize the `large_file_url` or `preview_file_url` provided by the API
- **AND** it SHALL only fallback to the original `file_url` if lower resolutions are unavailable
