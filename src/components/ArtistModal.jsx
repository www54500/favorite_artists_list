import React, { useState } from 'react';

export function ArtistModal({ onClose, onSubmit, initialData }) {
  const [name, setName] = useState(initialData?.name || '');
  const [trigger, setTrigger] = useState(initialData?.trigger || '');
  const [tag, setTag] = useState(initialData?.tag || '');
  const [loading, setLoading] = useState(false);

  const isEdit = !!initialData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ name, trigger, tag });
      onClose();
    } catch (err) {
      alert(`Failed to ${isEdit ? 'update' : 'add'} artist: ` + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          {isEdit ? 'Edit Artist' : 'Add New Artist'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Artist Name</label>
            <input 
              required 
              placeholder="e.g. WLOP" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">SD Trigger Word</label>
            <input 
              required 
              placeholder="e.g. wlop style" 
              value={trigger} 
              onChange={e => setTrigger(e.target.value)} 
              className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Danbooru Tag</label>
            <input 
              required 
              placeholder="e.g. wlop" 
              value={tag} 
              onChange={e => setTag(e.target.value)} 
              className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-5 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading} 
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all font-medium flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.14 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : isEdit ? 'Update Artist' : 'Save Artist'}
          </button>
        </div>
      </form>
    </div>
  );
}
