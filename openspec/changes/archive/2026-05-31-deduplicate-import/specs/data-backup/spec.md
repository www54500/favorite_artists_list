# Data Backup (Delta)

## Purpose
Ensure that data importing is idempotent and handles duplicate artist tags correctly.

## Requirements

## MODIFIED Requirements

### Requirement: Data import
The system SHALL allow users to import artist metadata from a previously exported JSON file while preventing duplicate entries.

#### Scenario: Importing new artist
- **WHEN** the user imports a JSON file with an artist tag that does not exist locally
- **THEN** a new artist entry is created
- **AND** images are fetched for that tag

#### Scenario: Importing existing artist (deduplication)
- **WHEN** the user imports a JSON file with an artist tag that already exists locally
- **THEN** the existing metadata (Name, Trigger Word) is updated with the imported values
- **AND** no duplicate artist row is created
- **AND** the system SHALL NOT re-fetch images if they already exist (relying on the lazy-fetching requirement in `danbooru-integration`)
