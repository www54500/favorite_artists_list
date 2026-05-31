import React, { useEffect, useState } from 'react';
import { getImagesForArtist } from '../services/storage';

export function ArtistRow({ artist, onRefresh, onDelete }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadImages = async () => {
    const imgs = await getImagesForArtist(artist.tag);
    const urls = imgs.map(i => ({
      id: i.id,
      url: URL.createObjectURL(i.blob)
    }));
    setImages(urls);
  };

  useEffect(() => {
    loadImages();
    // Cleanup URLs to avoid memory leaks
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.url));
    };
  }, [artist.tag]);

  const handleRefresh = async () => {
    setLoading(true);
    await onRefresh(artist.tag);
    await loadImages();
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
      <div className="p-5 flex justify-between items-start bg-slate-50 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{artist.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Trigger:</span>
            <code className="bg-slate-200 px-2 py-0.5 rounded text-sm text-slate-700 font-mono">
              {artist.trigger}
            </code>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh Images"
          >
            <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.001 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>
          <button 
            onClick={() => onDelete(artist.id, artist.tag)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Artist"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4">
        {images.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {images.map((img) => (
              <div 
                key={img.id} 
                className="flex-none w-48 h-64 bg-slate-100 rounded-lg overflow-hidden snap-start cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => window.open(img.url, '_blank')}
              >
                <img 
                  src={img.url} 
                  alt={`${artist.name} artwork`} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
            {loading ? 'Fetching images...' : 'No images found. Click refresh to fetch.'}
          </div>
        )}
      </div>
    </div>
  );
}
