# Data Backup

## Purpose
Define requirements for exporting and importing artist data to ensure portability and data safety.

## Requirements

### Requirement: Data export
The system SHALL allow users to export their artist metadata (names, trigger words, tags) to a JSON file.

#### Scenario: Exporting data to JSON
- **WHEN** the user clicks the "Export" button
- **THEN** the system generates and downloads a JSON file containing all artist metadata (excluding image blobs)

### Requirement: Data import
The system SHALL allow users to import artist metadata from a previously exported JSON file.

#### Scenario: Importing data from JSON
- **WHEN** the user selects a valid JSON backup file for import
- **THEN** the system restores the artist metadata and initiates a background fetch for the associated images
