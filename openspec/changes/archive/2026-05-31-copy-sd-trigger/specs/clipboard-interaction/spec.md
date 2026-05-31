## ADDED Requirements

### Requirement: Copy to clipboard utility
The system SHALL provide a reliable way to copy plain text to the user's system clipboard.

#### Scenario: Successful copy
- **WHEN** a text string is passed to the clipboard utility
- **THEN** the system SHALL attempt to write the text to the clipboard using the Clipboard API
