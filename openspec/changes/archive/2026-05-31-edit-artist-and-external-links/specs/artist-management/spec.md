# Artist Management (Delta)

## Purpose
Update artist management requirements to include editing and external links.

## Requirements

## ADDED Requirements

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
The system SHALL provide a direct link to the artist's profile on Danbooru.

#### Scenario: Clicking artist name
- **WHEN** the user clicks the artist name in the list
- **THEN** the system SHALL open the Danbooru artist page (`https://danbooru.donmai.us/artists/show?name={tag}`) in a new tab
