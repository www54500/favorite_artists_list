import { describe, it, expect, beforeEach, vi } from 'vitest';

const { mockStores } = vi.hoisted(() => ({
  mockStores: {}
}));

vi.mock('localforage', () => ({
  default: {
    createInstance: vi.fn(({ name }) => {
      mockStores[name] = {};
      return {
        clear: vi.fn(async () => { mockStores[name] = {}; }),
        getItem: vi.fn(async (key) => mockStores[name][key]),
        setItem: vi.fn(async (key, val) => { mockStores[name][key] = val; }),
        removeItem: vi.fn(async (key) => { delete mockStores[name][key]; }),
      };
    }),
  },
}));

import { saveArtist, getArtists, saveImage, saveImages, getImagesForArtist, deleteArtist, clearStorage } from './storage';

describe('Storage Service', () => {
  beforeEach(async () => {
    await clearStorage();
  });

  it('saves and retrieves an artist', async () => {
    const artist = { id: '1', name: 'ArtGuy', trigger: 'artguy_style', tag: 'artguy' };
    await saveArtist(artist);
    const artists = await getArtists();
    expect(artists).toHaveLength(1);
    expect(artists[0].name).toBe('ArtGuy');
  });

  it('saves and retrieves an image blob', async () => {
    const blob = new Blob(['fake image data'], { type: 'image/png' });
    await saveImage('artguy', 'img1', blob);
    const images = await getImagesForArtist('artguy');
    expect(images).toHaveLength(1);
    expect(images[0].id).toBe('img1');
    expect(images[0].blob.size).toBeGreaterThan(0);
  });

  it('deletes an artist and their images', async () => {
    const artist = { id: '1', name: 'ArtGuy', tag: 'artguy' };
    await saveArtist(artist);
    await saveImage('artguy', 'img1', new Blob(['data']));
    
    await deleteArtist('1', 'artguy');
    
    const artists = await getArtists();
    const images = await getImagesForArtist('artguy');
    
    expect(artists).toHaveLength(0);
    expect(images).toHaveLength(0);
  });

  it('prunes images if they exceed 20', async () => {
    const images = Array.from({ length: 25 }).map((_, i) => ({ id: i, blob: new Blob(['x']) }));
    await saveImages('artguy', images);
    const saved = await getImagesForArtist('artguy');
    expect(saved).toHaveLength(20);
    // Should keep the first 20 in the input array (which are the newest if we prepended correctly)
    expect(saved[0].id).toBe(0); 
  });
});
