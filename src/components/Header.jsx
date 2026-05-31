import React from 'react';

export function Header({ onAddClick, onExport, onImport }) {
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onImport(ev.target.result);
    reader.readAsText(file);
  };

  return (
    <header className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Favorite Artists</h1>
      <div className="flex gap-4">
        <button 
          onClick={onAddClick} 
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors text-sm font-medium"
        >
          Add Artist
        </button>
        <button 
          onClick={onExport} 
          className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded transition-colors text-sm font-medium"
        >
          Export
        </button>
        <label className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded transition-colors cursor-pointer text-sm font-medium">
          Import
          <input type="file" className="hidden" accept=".json" onChange={handleImport} />
        </label>
      </div>
    </header>
  );
}
