# Requirements

### Requirement: Standalone installation
The system SHALL be installable as a Progressive Web App (PWA) on supported platforms.

#### Scenario: Installing the app
- **WHEN** the user opens the app in a PWA-compatible browser
- **THEN** the browser provides an option to install the app as a standalone desktop application

### Requirement: Offline availability
The system SHALL serve the application shell from a service worker to enable offline access.

#### Scenario: Accessing the app offline
- **WHEN** the user navigates to the app URL without an internet connection
- **THEN** the service worker serves the application shell and the user can interact with local data
