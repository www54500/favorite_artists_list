# Requirements

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
