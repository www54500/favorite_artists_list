import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ArtistModal } from './components/ArtistModal';
import { ArtistRow } from './components/ArtistRow';
import { BackToTop } from './components/BackToTop';
import { getArtists, deleteArtist, saveArtist, deleteImagesForArtist } from './services/storage';
import { refreshImages, fetchLatestImages } from './services/danbooru';
import { generateExportData, processImportData } from './services/backup';
import { CloudSyncModal } from './components/CloudSyncModal';
import { fetchGist, updateGist } from './services/githubGist';

function App() {
  const [artists, setArtists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);
  const [bulkToggleSignal, setBulkToggleSignal] = useState(null);
  const [showCloudSyncModal, setShowCloudSyncModal] = useState(false);

  const handleCloudUpload = async (token, gistId) => {
    const data = await generateExportData();
    const parsedData = JSON.parse(data);
    await updateGist(token, gistId, parsedData);
  };

  const handleCloudDownload = async (token, gistId) => {
    const dataObj = await fetchGist(token, gistId);
    await processImportData(JSON.stringify(dataObj));
    await loadArtists();
  };

  const loadArtists = async () => {
    const list = await getArtists();
    setArtists(list);
  };

  useEffect(() => {
    loadArtists();
  }, []);

  const handleAddArtist = async (data) => {
    const existing = artists.find(a => a.tag === data.tag);
    if (existing) {
      alert(`Artist with tag "${data.tag}" already exists as "${existing.name}".`);
      return;
    }

    const artist = {
      ...data,
      id: Date.now().toString()
    };
    await saveArtist(artist);
    await fetchLatestImages(artist.tag);
    await loadArtists();
  };

  const handleUpdateArtist = async (data) => {
    const oldTag = editingArtist.tag;
    const newTag = data.tag;
    
    const updatedArtist = {
      ...editingArtist,
      ...data
    };

    await saveArtist(updatedArtist);

    if (oldTag !== newTag) {
      await deleteImagesForArtist(oldTag);
      await fetchLatestImages(newTag);
    }

    await loadArtists();
  };

  const handleBulkToggle = (collapsed) => {
    setBulkToggleSignal({ collapsed, timestamp: Date.now() });
  };

  const openAddModal = () => {
    setEditingArtist(null);
    setShowModal(true);
  };

  const openEditModal = (artist) => {
    setEditingArtist(artist);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <Header 
        onAddClick={openAddModal}
        onExport={async () => {
          const data = await generateExportData();
          const blob = new Blob([data], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'artists-backup.json';
          a.click();
        }}
        onImport={async (json) => {
          await processImportData(json);
          await loadArtists();
        }}
        onCloudSync={() => setShowCloudSyncModal(true)}
        onExpandAll={() => handleBulkToggle(false)}
        onCollapseAll={() => handleBulkToggle(true)}
      />

      <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
        {artists.length > 0 ? (
          artists.map(artist => (
            <ArtistRow 
              key={artist.id} 
              artist={artist} 
              onRefresh={refreshImages}
              onEdit={openEditModal}
              onDelete={async (id, tag) => {
                if (confirm(`Delete ${artist.name}?`)) {
                  await deleteArtist(id, tag);
                  await loadArtists();
                }
              }}
              bulkToggleSignal={bulkToggleSignal}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-400">No artists added yet</h2>
            <p className="text-slate-400 mt-2">Click "Add Artist" to get started</p>
          </div>
        )}
      </main>

      <BackToTop />

      {showModal && (
        <ArtistModal 
          onClose={() => setShowModal(false)}
          onSubmit={editingArtist ? handleUpdateArtist : handleAddArtist}
          initialData={editingArtist}
        />
      )}

      {showCloudSyncModal && (
        <CloudSyncModal
          onClose={() => setShowCloudSyncModal(false)}
          onUpload={handleCloudUpload}
          onDownload={handleCloudDownload}
        />
      )}
    </div>
  );
}

export default App;
