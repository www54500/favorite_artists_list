# GitHub Gist Cloud Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a cloud sync feature using GitHub Gists to backup and restore the user's favorite artists list.

**Architecture:** Create a `githubGist` service using the standard `fetch` API. Add a `CloudSyncModal` UI component to manage credentials (Token and Gist ID) stored in `localStorage`, and to trigger upload/download actions which wrap existing local export/import logic.

**Tech Stack:** React, Tailwind CSS, Vite

## Global Constraints

- Must save and load credentials securely from `localStorage`
- Must use `generateExportData` and `processImportData` from `src/services/backup.js` for data consistency
- Must gracefully handle API errors (401, 404, network errors)

---

### Task 1: Create GitHub Gist Service

**Files:**
- Create: `src/services/githubGist.js`

**Interfaces:**
- Consumes: None
- Produces: 
  - `export const updateGist = async (token, gistId, jsonString) => {}`
  - `export const fetchGist = async (token, gistId) => {}`

- [ ] **Step 1: Write the service functions**

```javascript
// src/services/githubGist.js
const GITHUB_API_URL = 'https://api.github.com/gists';

export const updateGist = async (token, gistId, jsonString) => {
  const response = await fetch(`${GITHUB_API_URL}/${gistId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      files: {
        'artists.json': {
          content: jsonString
        }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
};

export const fetchGist = async (token, gistId) => {
  const response = await fetch(`${GITHUB_API_URL}/${gistId}`, {
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const file = data.files['artists.json'];
  if (!file) {
    throw new Error('artists.json not found in this Gist.');
  }

  return file.content;
};
```

- [ ] **Step 2: Commit**

```bash
git add src/services/githubGist.js
git commit -m "feat: add github gist service"
```

### Task 2: Create Cloud Sync Modal Component

**Files:**
- Create: `src/components/CloudSyncModal.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/Header.jsx`

**Interfaces:**
- Consumes: 
  - `updateGist`, `fetchGist` from `src/services/githubGist.js`
  - `generateExportData`, `processImportData` from `src/services/backup.js`
- Produces: `export const CloudSyncModal = ({ onClose, onDataImported }) => {}`

- [ ] **Step 1: Create the CloudSyncModal component**

```javascript
// src/components/CloudSyncModal.jsx
import React, { useState, useEffect } from 'react';
import { updateGist, fetchGist } from '../services/githubGist';
import { generateExportData, processImportData } from '../services/backup';

export const CloudSyncModal = ({ onClose, onDataImported }) => {
  const [token, setToken] = useState('');
  const [gistId, setGistId] = useState('');
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('github_token') || '');
    setGistId(localStorage.getItem('github_gist_id') || '');
  }, []);

  const saveCredentials = () => {
    localStorage.setItem('github_token', token);
    localStorage.setItem('github_gist_id', gistId);
  };

  const handleUpload = async () => {
    if (!token || !gistId) return setStatus('Token and Gist ID are required.');
    setIsProcessing(true);
    setStatus('Uploading...');
    saveCredentials();
    try {
      const dataString = await generateExportData();
      await updateGist(token, gistId, dataString);
      setStatus('Upload successful!');
    } catch (err) {
      setStatus(`Upload failed: ${err.message}`);
    }
    setIsProcessing(false);
  };

  const handleDownload = async () => {
    if (!token || !gistId) return setStatus('Token and Gist ID are required.');
    if (!confirm('This will overwrite your local data. Continue?')) return;
    setIsProcessing(true);
    setStatus('Downloading...');
    saveCredentials();
    try {
      const jsonString = await fetchGist(token, gistId);
      await processImportData(jsonString);
      setStatus('Download successful!');
      if (onDataImported) onDataImported();
    } catch (err) {
      setStatus(`Download failed: ${err.message}`);
    }
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Cloud Sync (GitHub Gist)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">GitHub Personal Access Token</label>
              <input type="password" value={token} onChange={e => setToken(e.target.value)} className="w-full border rounded p-2" placeholder="ghp_..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gist ID</label>
              <input type="text" value={gistId} onChange={e => setGistId(e.target.value)} className="w-full border rounded p-2" placeholder="e.g. 8c5b9e2fa..." />
            </div>
            
            <div className="flex gap-4 pt-4 border-t">
              <button onClick={handleUpload} disabled={isProcessing} className="flex-1 bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:opacity-50">Upload to Cloud</button>
              <button onClick={handleDownload} disabled={isProcessing} className="flex-1 bg-green-600 text-white rounded p-2 hover:bg-green-700 disabled:opacity-50">Download from Cloud</button>
            </div>
            {status && <p className="text-sm mt-2 text-center text-slate-600">{status}</p>}
          </div>
        </div>
        <div className="bg-slate-50 px-6 py-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:text-slate-800">Close</button>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Update Header to include Cloud Sync button**

Modify `src/components/Header.jsx` to add a new "Cloud Sync" button (or integrate it cleanly). Since we don't have the current Header content, assuming standard React props addition:

```javascript
// Look for where buttons are rendered in Header.jsx and add:
// <button onClick={onCloudSyncClick} className="...">Cloud Sync</button>
// Add onCloudSyncClick to Header props.
```
*(Engineer: inspect `src/components/Header.jsx` and add the prop and button appropriately)*

- [ ] **Step 3: Update App.jsx to render the modal**

Modify `src/App.jsx` to add state for the modal and render it:

```javascript
// Add to imports
import { CloudSyncModal } from './components/CloudSyncModal';

// Add to state in App component
const [showCloudSync, setShowCloudSync] = useState(false);

// Update Header usage
<Header 
  onAddClick={openAddModal}
  onExport={...}
  onImport={...}
  onExpandAll={...}
  onCollapseAll={...}
  onCloudSyncClick={() => setShowCloudSync(true)} // <-- Add this
/>

// Add modal render near bottom
{showCloudSync && (
  <CloudSyncModal 
    onClose={() => setShowCloudSync(false)}
    onDataImported={loadArtists}
  />
)}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/CloudSyncModal.jsx src/components/Header.jsx src/App.jsx
git commit -m "feat: add cloud sync UI and integrate with app"
```
