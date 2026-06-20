## Context

The `favorite_artists_list` application currently saves all its data locally using `localforage`. This makes the application fast and capable of offline use, but it completely lacks a built-in sync mechanism, restricting the user's data to the device they created it on. We are adding a feature to sync this local data to a GitHub Gist to provide an easy, serverless, and version-controlled backup strategy.

## Goals / Non-Goals

**Goals:**
- Provide a UI for users to configure their GitHub PAT and Gist ID.
- Provide Upload and Download functions that sync the entire JSON state of the application to and from a single GitHub Gist file (`artists.json`).
- Handle basic API errors and edge cases.

**Non-Goals:**
- Setting up a full backend database (like Firebase or PostgreSQL).
- Automating the creation of the GitHub Personal Access Token (the user must still manually generate this).
- Real-time or automatic background syncing (syncing will be explicitly triggered by the user via UI buttons).
- Handling merge conflicts (downloads will simply overwrite local data).

## Decisions

- **GitHub Gists over Dedicated Backend**: We chose GitHub Gists because it acts as a completely free JSON store with built-in version history. It allows us to avoid deploying and managing any backend infrastructure for a single-user app.
- **Manual Sync over Auto Sync**: We decided on manual Upload/Download buttons rather than auto-syncing on every change. Auto-syncing would require complex debouncing, conflict resolution logic, and careful management of GitHub API rate limits.
- **Client-Side API Calls**: All communication with GitHub will occur directly from the browser (`fetch` API). The credentials will be stored in `localStorage` to ensure they do not leave the user's device, maintaining privacy and security.

## Risks / Trade-offs

- **Risk: Overwriting Data**: Since there is no merge logic, downloading from the cloud will blindly overwrite local data.
  - **Mitigation**: Add a confirmation dialog before proceeding with a Download action to ensure the user is aware of the destructive nature of the action.
- **Risk: API Rate Limits**: GitHub API has rate limits for authenticated requests.
  - **Mitigation**: Since syncing is manual and the user is the only one making requests via their personal token, hitting the limit (5,000 per hour) is practically impossible for this use case.
