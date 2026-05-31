import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchLatestImages, refreshImages } from './danbooru';
import * as storage from './storage';

vi.mock('./storage');

global.fetch = vi.fn();

describe('Danbooru Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches images if none exist', async () => {
    storage.getImagesForArtist.mockResolvedValue([]);
    const mockPosts = [{ id: 101, file_url: 'http://example.com/1.jpg' }];
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockPosts });
    global.fetch.mockResolvedValue({ ok: true, blob: async () => new Blob(['data']) });

    const result = await fetchLatestImages('artguy');
    expect(result).toHaveLength(1);
    expect(global.fetch).toHaveBeenCalled();
  });

  it('skips fetch if images already exist', async () => {
    storage.getImagesForArtist.mockResolvedValue([{ id: 101, blob: {} }]);
    
    const result = await fetchLatestImages('artguy');
    expect(result).toHaveLength(1);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('deduplicates images by ID during refresh', async () => {
    storage.getImagesForArtist.mockResolvedValue([{ id: 101, blob: {} }]);
    const mockPosts = [
      { id: 101, file_url: 'http://example.com/1.jpg' }, // Duplicate
      { id: 102, file_url: 'http://example.com/2.jpg' }, // New
    ];
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockPosts });
    global.fetch.mockResolvedValue({ ok: true, blob: async () => new Blob(['new data']) });

    await refreshImages('artguy');
    
    // Should save new images
    expect(storage.saveImages).toHaveBeenCalledWith('artguy', expect.any(Array));
  });
});
