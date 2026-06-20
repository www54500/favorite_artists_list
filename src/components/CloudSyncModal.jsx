import React, { useState, useEffect } from 'react';

export function CloudSyncModal({ onClose, onUpload, onDownload }) {
  const [token, setToken] = useState(localStorage.getItem('github_token') || '');
  const [gistId, setGistId] = useState(localStorage.getItem('github_gist_id') || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('github_token', token);
    localStorage.setItem('github_gist_id', gistId);
  }, [token, gistId]);

  const handleUpload = async () => {
    if (!token || !gistId) {
      setMessage('Please provide both token and gist ID.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await onUpload(token, gistId);
      setMessage('Upload successful!');
    } catch (e) {
      setMessage('Upload failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!token || !gistId) {
      setMessage('Please provide both token and gist ID.');
      return;
    }
    if (!window.confirm('This will overwrite all local data. Continue?')) {
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await onDownload(token, gistId);
      setMessage('Download successful! Please close and refresh if needed.');
      setTimeout(() => onClose(), 1500);
    } catch (e) {
      setMessage('Download failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Cloud Sync (GitHub Gist)</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">GitHub Personal Access Token</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border rounded-lg"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Gist ID</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-lg"
              value={gistId}
              onChange={(e) => setGistId(e.target.value)}
              placeholder="e.g. 1a2b3c4d..."
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t">
            <button 
              onClick={handleUpload}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
              {loading ? 'Processing...' : 'Upload to Cloud'}
            </button>
            <button 
              onClick={handleDownload}
              disabled={loading}
              className="flex-1 bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900 disabled:opacity-50 font-medium"
            >
              {loading ? 'Processing...' : 'Download from Cloud'}
            </button>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full mt-2 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
