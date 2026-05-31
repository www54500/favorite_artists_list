# UI Navigation

## Purpose
Define requirements for global user interface controls and page navigation helpers.

## Requirements

## ADDED Requirements

### Requirement: Bulk gallery controls
The system SHALL provide global controls to expand or collapse all artist galleries simultaneously.

#### Scenario: Expanding all galleries
- **WHEN** the user clicks the "Expand All" button
- **THEN** all artist galleries in the list SHALL become visible

#### Scenario: Collapsing all galleries
- **WHEN** the user clicks the "Collapse All" button
- **THEN** all artist galleries in the list SHALL be hidden

### Requirement: Back to top navigation
The system SHALL provide a convenient way to return to the top of the artist list.

#### Scenario: Using back-to-top button
- **WHEN** the user has scrolled down the page
- **AND** the user clicks the "Back to Top" button
- **THEN** the system SHALL scroll the viewport back to the top of the page
