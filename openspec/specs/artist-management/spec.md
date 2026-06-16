# Artist Management

## Purpose
Define requirements for managing the list of favorite artists, including creation, deletion, and metadata interactions.

## Requirements

### Requirement: Artist creation
The system SHALL allow users to create a new artist entry by providing a name, SD trigger word, and Danbooru tag.

#### Scenario: Successful artist creation
- **WHEN** the user submits the "Add Artist" form with valid data
- **THEN** a new artist entry is created in the local database and displayed in the list

### Requirement: Artist deletion
The system SHALL allow users to remove an artist from their list.

#### Scenario: Successful artist deletion
- **WHEN** the user clicks the delete button for a specific artist
- **THEN** the artist and all associated images are removed from the local database and the list

### Requirement: Copy SD trigger word
The system SHALL allow users to copy an artist's SD trigger word to their clipboard by interacting with it in the list.

#### Scenario: Copying trigger word
- **WHEN** the user clicks on the SD trigger word or its associated "Copy" button
- **THEN** the trigger word text is copied to the clipboard
- **AND** the system SHALL display temporary visual feedback (e.g., "Copied!")

### Requirement: Collapsible artist galleries
The system SHALL allow users to toggle the visibility of each artist's image gallery independently.

#### Scenario: Toggling gallery visibility
- **WHEN** the user clicks the expand/collapse toggle for an artist
- **THEN** the system SHALL show or hide the image gallery for that specific artist

### Requirement: Artist editing
The system SHALL allow users to modify the Name, SD Trigger Word, and Danbooru Tag of an existing artist entry.

#### Scenario: Successful metadata edit
- **WHEN** the user submits the "Edit Artist" form with updated Name or Trigger Word
- **THEN** the artist entry is updated in the local database and the list

#### Scenario: Tag update triggers re-fetch
- **WHEN** the user submits the "Edit Artist" form with a new Danbooru Tag
- **THEN** the system SHALL delete the existing images for the old tag
- **AND** the system SHALL fetch new images for the updated tag

### Requirement: Link to Danbooru artist profile
The system SHALL provide a direct link to the artist's posts on Danbooru.

#### Scenario: Clicking artist name
- **WHEN** the user clicks the artist name in the list
- **THEN** the system SHALL open the Danbooru posts page (`https://danbooru.donmai.us/posts?tags={tag}`) in a new tab

### Requirement: Automatic field population from tag
The system SHALL automatically populate the Artist Name and SD Trigger Word fields when a Danbooru Tag is entered in the artist modal.

#### Scenario: Auto-fill Name from Tag
- **WHEN** the user types `mona_lisa` into the Danbooru Tag field
- **AND** the Artist Name field is empty
- **THEN** the system SHALL set the Artist Name to `Mona Lisa`

#### Scenario: Auto-fill SD Trigger from Tag
- **WHEN** the user types `artist_(name)` into the Danbooru Tag field
- **AND** the SD Trigger Word field is empty
- **THEN** the system SHALL set the SD Trigger Word to `artist_\(name\)`

