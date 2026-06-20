# GitHub Gist Cloud Sync Design

## Overview
Add a cloud sync feature to the `favorite_artists_list` application, allowing a single user to sync their locally stored artists data to GitHub Gist. This provides a free, version-controlled cloud backup without requiring complex backend infrastructure.

## Architecture & Data Flow
1. **Local Storage**: The app currently uses `localforage` (IndexedDB/localStorage) to store the favorite artists list.
2. **Cloud Storage**: GitHub Gist. A single secret Gist will act as the cloud database, containing one file: `artists.json`.
3. **Authentication**: Uses a GitHub Personal Access Token (PAT) with `gist` scope.

## Components & UI

### 1. Settings Section (Cloud Sync Configuration)
A new UI section (e.g., in a settings modal or a dedicated sync panel) containing:
- **GitHub Token Input**: Password/text field for the user to paste their GitHub PAT.
- **Gist ID Input**: Text field for the user to paste the unique ID of their manually created Gist.
- *Behavior*: These credentials will be saved in the browser's `localStorage` so the user only configures them once per device.

### 2. Sync Actions
- **Upload (Export to Cloud) Button**:
  - Reads the current artists data from `localforage`.
  - Serializes it to JSON.
  - Calls GitHub API (`PATCH https://api.github.com/gists/{gist_id}`) with the Token to update the `artists.json` file inside the Gist.
  - Shows success or error toast/message.
- **Download (Import from Cloud) Button**:
  - Calls GitHub API (`GET https://api.github.com/gists/{gist_id}`) to fetch the Gist content.
  - Warns the user: "This will overwrite your local data. Continue?"
  - If confirmed, parses the JSON and saves it to `localforage`, then updates the UI state.

## Error Handling
- **Missing Credentials**: If the user clicks Upload/Download without setting the Token or Gist ID, prompt them to fill in the settings first.
- **Invalid Token/ID**: Catch HTTP 401 (Unauthorized) or 404 (Not Found) from the GitHub API and display a user-friendly error message indicating that the credentials might be wrong.
- **Network Errors**: Standard catch blocks for offline or failed requests.

## Security & Privacy
- The PAT and Gist ID are stored locally in the browser (`localStorage`). They are never sent to any third-party server other than directly to `api.github.com`.
- By using a "Secret Gist", the data is not discoverable via public GitHub search.
