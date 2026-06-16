## Purpose
Define requirements for managing the list of favorite artists, including creation, deletion, and metadata interactions.

## Requirements

## ADDED Requirements

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
