# Artist Management (Delta)

## Purpose
Add validation to prevent adding duplicate artist tags.

## Requirements

## MODIFIED Requirements

### Requirement: Artist creation
The system SHALL allow users to create a new artist entry by providing a name, SD trigger word, and Danbooru tag, while preventing duplicates.

#### Scenario: Successful artist creation
- **WHEN** the user submits the "Add Artist" form with a unique Danbooru tag
- **THEN** a new artist entry is created in the local database and displayed in the list

#### Scenario: Prevent duplicate artist addition
- **WHEN** the user submits the "Add Artist" form with a Danbooru tag that already exists in the list
- **THEN** the system SHALL show an alert mentioning the existing artist's name
- **AND** the system SHALL NOT create a new artist entry
