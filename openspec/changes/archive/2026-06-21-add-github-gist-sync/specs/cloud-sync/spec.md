## ADDED Requirements

### Requirement: Configure GitHub Gist Credentials
The system SHALL allow users to input and save their GitHub Personal Access Token and Gist ID, persisting them securely in local storage.

#### Scenario: User saves credentials
- **WHEN** user inputs a valid token and Gist ID and initiates a sync action
- **THEN** the system saves the credentials to `localStorage` for future use

### Requirement: Export Data to Cloud
The system SHALL allow users to export their local favorite artists list to a configured GitHub Gist, overwriting the `artists.json` file.

#### Scenario: Successful export
- **WHEN** user clicks the Upload to Cloud button with valid credentials
- **THEN** the system serializes the local IndexedDB data to JSON and patches the remote Gist, showing a success message

#### Scenario: Export with missing credentials
- **WHEN** user clicks the Upload to Cloud button without providing a token or Gist ID
- **THEN** the system prevents the upload and shows an error message requesting the missing information

### Requirement: Import Data from Cloud
The system SHALL allow users to fetch data from a configured GitHub Gist and overwrite their local database.

#### Scenario: Successful import
- **WHEN** user clicks the Download from Cloud button, confirms the overwrite warning, and has valid credentials
- **THEN** the system fetches the JSON from the Gist, processes the import data into local storage, and refreshes the UI

#### Scenario: User cancels import
- **WHEN** user clicks the Download from Cloud button but cancels the overwrite warning dialog
- **THEN** the system aborts the operation and local data remains unchanged
