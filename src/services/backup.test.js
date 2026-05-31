import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateExportData, processImportData } from './backup';
import * as storage from './storage';
import * as danbooru from './danbooru';

vi.mock('./storage');
vi.mock('./danbooru');

describe('Backup Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('generates export data as JSON string', async () => {
    const mockArtists = [
      { id: '1', name: 'Bob', trigger: 'bob_style', tag: 'bob' }
    ];
    storage.getArtists.mockResolvedValue(mockArtists);
    
    const result = await generateExportData();
    const parsed = JSON.parse(result);
    
    expect(parsed).toHaveLength(1);
    expect(parsed[0].name).toBe('Bob');
    expect(parsed[0].id).toBeUndefined(); // Should strip IDs for portability
  });

  it('processes import data for new artist', async () => {
    const importData = JSON.stringify([
      { name: 'Bob', trigger: 'bob_style', tag: 'bob' }
    ]);
    storage.getArtists.mockResolvedValue([]);
    danbooru.fetchLatestImages.mockResolvedValue([]);
    
    await processImportData(importData);
    
    expect(storage.saveArtist).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Bob',
      tag: 'bob'
    }));
    expect(danbooru.fetchLatestImages).toHaveBeenCalledWith('bob');
  });

  it('updates existing artist during import without duplicating', async () => {
    const importData = JSON.stringify([
      { name: 'Bob Updated', trigger: 'new_trigger', tag: 'bob' }
    ]);
    const existing = { id: 'original-id', name: 'Bob', trigger: 'old', tag: 'bob' };
    storage.getArtists.mockResolvedValue([existing]);
    danbooru.fetchLatestImages.mockResolvedValue([]);
    
    await processImportData(importData);
    
    // Should call saveArtist with original ID but updated metadata
    expect(storage.saveArtist).toHaveBeenCalledWith({
      id: 'original-id',
      name: 'Bob Updated',
      trigger: 'new_trigger',
      tag: 'bob'
    });
    expect(danbooru.fetchLatestImages).toHaveBeenCalledWith('bob');
  });
});
