import { getArtists, saveArtist } from './storage';
import { fetchLatestImages } from './danbooru';

export async function generateExportData() {
  const artists = await getArtists();
  // Strip internal IDs and other non-portable data
  const exportable = artists.map(({ name, trigger, tag }) => ({ name, trigger, tag }));
  return JSON.stringify(exportable, null, 2);
}

export async function processImportData(jsonString) {
  const artists = JSON.parse(jsonString);
  for (const artist of artists) {
    // Re-generate ID for portability/freshness or just use existing if available
    const portableArtist = {
      ...artist,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5)
    };
    await saveArtist(portableArtist);
    // Trigger background fetch
    fetchLatestImages(portableArtist.tag).catch(e => console.error('Import fetch failed', portableArtist.tag, e));
  }
}
