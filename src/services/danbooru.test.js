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

  it('prioritizes preview_file_url over others', async () => {
    storage.getImagesForArtist.mockResolvedValue([]);
    const mockPosts = [
      { 
        id: 201, 
        file_url: 'full.jpg', 
        large_file_url: 'large.jpg', 
        preview_file_url: 'preview.jpg' 
      }
    ];
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockPosts });
    global.fetch.mockResolvedValue({ ok: true, blob: async () => new Blob(['data']) });

    await fetchLatestImages('artguy');
    
    // First call was to the API
    expect(global.fetch.mock.calls[0][0]).toContain('danbooru.donmai.us');
    // Second call should be to preview.jpg (highest priority now)
    expect(global.fetch.mock.calls[1][0]).toBe('preview.jpg');
  });

  it('falls back to large_file_url if preview is missing', async () => {
    storage.getImagesForArtist.mockResolvedValue([]);
    const mockPosts = [
      { 
        id: 202, 
        file_url: 'full.jpg', 
        large_file_url: 'large.jpg' 
      }
    ];
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockPosts });
    global.fetch.mockResolvedValue({ ok: true, blob: async () => new Blob(['data']) });

    await fetchLatestImages('artguy');
    
    expect(global.fetch.mock.calls[1][0]).toBe('large.jpg');
  });
});
