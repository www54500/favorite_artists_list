import React from 'react';

export function Header({ onAddClick, onExport, onImport, onExpandAll, onCollapseAll }) {
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onImport(ev.target.result);
    reader.readAsText(file);
  };

  return (
    <div className="sticky top-0 z-40 bg-slate-800 text-white shadow-lg">
      <header className="p-4 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-bold tracking-tight">Favorite Artists</h1>
        <div className="flex gap-3">
          <button 
            onClick={onAddClick} 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-sm font-semibold shadow-sm"
          >
            Add Artist
          </button>
          <div className="h-8 w-px bg-slate-700 mx-1 self-center" />
          <button 
            onClick={onExport} 
            className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            Export
          </button>
          <label className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm font-medium">
            Import
            <input type="file" className="hidden" accept=".json" onChange={handleImport} />
          </label>
        </div>
      </header>
      
      <div className="bg-slate-900/50 border-t border-slate-700/50 p-2 overflow-x-auto">
        <div className="flex gap-2 max-w-7xl mx-auto px-2">
          <button 
            onClick={onExpandAll}
            className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded hover:bg-white/10 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"></path>
            </svg>
            Expand All
          </button>
          <button 
            onClick={onCollapseAll}
            className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded hover:bg-white/10 transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M5 19l7-7 7 7"></path>
            </svg>
            Collapse All
          </button>
        </div>
      </div>
    </div>
  );
}
