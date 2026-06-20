## Why

The application currently stores data locally using `localforage`, which means user data is isolated to a single device. To enable multi-device sync and provide a backup mechanism without introducing a complex backend, we need a lightweight cloud synchronization solution. Utilizing GitHub Gists provides a free, version-controlled cloud storage mechanism for a single user's text-based data.

## What Changes

- Introduce a new GitHub Gist service to communicate with the GitHub API.
- Add a Cloud Sync Modal to the UI to configure credentials (GitHub Personal Access Token and Gist ID) and execute sync actions.
- Implement an Upload action that serializes the local artist data and patches the remote Gist.
- Implement a Download action that fetches the remote Gist data and overwrites the local storage.

## Capabilities

### New Capabilities
- `cloud-sync`: The ability to configure GitHub credentials and manually upload/download the application's data payload to/from a GitHub Gist.

### Modified Capabilities

## Impact

- **UI**: A new Cloud Sync Modal component and a button in the Header to access it.
- **Services**: A new `githubGist.js` service wrapping the `fetch` API for GitHub Gists.
- **Storage**: The `localStorage` will now store user credentials (`github_token` and `github_gist_id`). Local indexedDB data will be overwritten upon successful download from the cloud.
