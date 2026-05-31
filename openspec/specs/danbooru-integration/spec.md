# Requirements

### Requirement: Conditional image fetching
The system SHALL only fetch images from Danbooru if no images exist in the local database for the given artist tag.

#### Scenario: Skip fetch if images exist
- **WHEN** an artist is added or imported
- **AND** images already exist in the local database for that tag
- **THEN** the system SHALL NOT initiate a new fetch request

### Requirement: Manual image refresh
The system SHALL provide a "Refresh" function for each artist to pull the latest images from Danbooru.

#### Scenario: Manual refresh triggered
- **WHEN** the user clicks the "Refresh" button for an artist
- **THEN** the system fetches the 8 latest images from Danbooru
- **AND** prepends them to the local database for that artist

### Requirement: Image deduplication
The system SHALL ensure that no duplicate images are saved for a single artist based on the Danbooru image ID.

#### Scenario: Refresh with overlapping images
- **WHEN** the system fetches images from Danbooru
- **AND** some images already exist in the local database (matching IDs)
- **THEN** the system SHALL NOT save the duplicate images
- **AND** only unique new images SHALL be added to the local database

### Requirement: Image retention and pruning
The system SHALL retain existing images when refreshing, up to a maximum limit of 20 images per artist.

#### Scenario: Pruning oldest images
- **WHEN** a refresh results in more than 20 images for an artist
- **THEN** the system SHALL remove the oldest images until exactly 20 remain

### Requirement: Display all local images
The system SHALL display all locally stored images for an artist in the carousel.

#### Scenario: Displaying more than 8 images
- **WHEN** an artist has 15 images stored locally
- **THEN** the system SHALL render all 15 images in the artist's carousel

### Requirement: Optimized image resolution
The system SHALL fetch and store example images from Danbooru using optimized web-resolutions to balance visual quality and performance.

#### Scenario: Downloading optimized images
- **WHEN** the system downloads an image from Danbooru
- **THEN** it SHALL prioritize the `large_file_url` or `preview_file_url` provided by the API
- **AND** it SHALL only fallback to the original `file_url` if lower resolutions are unavailable
