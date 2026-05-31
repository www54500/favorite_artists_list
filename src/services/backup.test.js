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

  it('processes import data and fetches images', async () => {
    const importData = JSON.stringify([
      { name: 'Bob', trigger: 'bob_style', tag: 'bob' }
    ]);
    danbooru.fetchLatestImages.mockResolvedValue([]); // Return empty array instead of undefined
    
    await processImportData(importData);
    
    expect(storage.saveArtist).toHaveBeenCalled();
    expect(danbooru.fetchLatestImages).toHaveBeenCalledWith('bob');
  });
});
