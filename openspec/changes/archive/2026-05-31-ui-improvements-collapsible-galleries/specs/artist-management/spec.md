# Artist Management (Delta)

## Purpose
Update artist management requirements to include gallery visibility controls.

## Requirements

## MODIFIED Requirements

### Requirement: Artist deletion
The system SHALL allow users to remove an artist from their list.

#### Scenario: Successful artist deletion
- **WHEN** the user clicks the delete button for a specific artist
- **THEN** the artist and all associated images are removed from the local database and the list

## ADDED Requirements

### Requirement: Collapsible artist galleries
The system SHALL allow users to toggle the visibility of each artist's image gallery independently.

#### Scenario: Toggling gallery visibility
- **WHEN** the user clicks the expand/collapse toggle for an artist
- **THEN** the system SHALL show or hide the image gallery for that specific artist
