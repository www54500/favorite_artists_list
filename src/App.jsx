import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AddModal } from './components/AddModal';
import { ArtistRow } from './components/ArtistRow';
import { getArtists, deleteArtist, saveArtist } from './services/storage';
import { refreshImages, fetchLatestImages } from './services/danbooru';
import { generateExportData, processImportData } from './services/backup';

function App() {
  const [artists, setArtists] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadArtists = async () => {
    const list = await getArtists();
    setArtists(list);
  };

  useEffect(() => {
    loadArtists();
  }, []);

  const handleAddArtist = async (data) => {
    const artist = {
      ...data,
      id: Date.now().toString()
    };
    // Save metadata first
    await saveArtist(artist);
    // Trigger image fetch (handles saving blobs internally)
    await fetchLatestImages(artist.tag);
    await loadArtists();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header 
        onAddClick={() => setShowAddModal(true)}
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
      />

      <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
        {artists.length > 0 ? (
          artists.map(artist => (
            <ArtistRow 
              key={artist.id} 
              artist={artist} 
              onRefresh={refreshImages}
              onDelete={async (id, tag) => {
                if (confirm(`Delete ${artist.name}?`)) {
                  await deleteArtist(id, tag);
                  await loadArtists();
                }
              }}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-400">No artists added yet</h2>
            <p className="text-slate-400 mt-2">Click "Add Artist" to get started</p>
          </div>
        )}
      </main>

      {showAddModal && (
        <AddModal 
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddArtist}
        />
      )}
    </div>
  );
}

export default App;
