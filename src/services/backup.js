import { getArtists, saveArtist } from './storage';
import { fetchLatestImages } from './danbooru';

export async function generateExportData() {
  const artists = await getArtists();
  // Strip internal IDs and other non-portable data
  const exportable = artists.map(({ name, trigger, tag }) => ({ name, trigger, tag }));
  return JSON.stringify(exportable, null, 2);
}

export async function processImportData(jsonString) {
  const importedArtists = JSON.parse(jsonString);
  const currentArtists = await getArtists();

  for (const imported of importedArtists) {
    const existing = currentArtists.find(a => a.tag === imported.tag);
    
    let artistToSave;
    if (existing) {
      // Update existing metadata but keep the ID
      artistToSave = {
        ...existing,
        name: imported.name,
        trigger: imported.trigger
      };
    } else {
      // Create new artist
      artistToSave = {
        ...imported,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5)
      };
    }

    await saveArtist(artistToSave);
    // Trigger background fetch (handles lazy-fetching internally)
    fetchLatestImages(artistToSave.tag).catch(e => console.error('Import fetch failed', artistToSave.tag, e));
  }
}
