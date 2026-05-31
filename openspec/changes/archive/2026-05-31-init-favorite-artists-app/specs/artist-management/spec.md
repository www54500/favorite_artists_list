## ADDED Requirements

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
