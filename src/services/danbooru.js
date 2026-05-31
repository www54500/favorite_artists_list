import { getImagesForArtist, saveImages } from './storage';

async function downloadImages(posts) {
  const results = [];
  for (const post of posts) {
    // Prioritize large_file_url, then preview_file_url, then fallback to file_url
    const imgUrl = post.large_file_url || post.preview_file_url || post.file_url;
    if (!imgUrl) continue;

    try {
      const imgRes = await fetch(imgUrl);
      if (imgRes.ok) {
        const blob = await imgRes.blob();
        results.push({ id: post.id, blob });
      }
    } catch (e) {
      console.error('Failed to download image', post.id, e);
    }
  }
  return results;
}

export async function fetchLatestImages(tag) {
  const existing = await getImagesForArtist(tag);
  if (existing.length > 0) return existing;

  const url = `https://danbooru.donmai.us/posts.json?tags=${encodeURIComponent(tag)}&limit=8`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch from Danbooru');
  
  const posts = await response.json();
  const results = await downloadImages(posts);

  if (results.length > 0) {
    await saveImages(tag, results);
  }
  return results;
}

export async function refreshImages(tag) {
  const url = `https://danbooru.donmai.us/posts.json?tags=${encodeURIComponent(tag)}&limit=8`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch from Danbooru');
  
  const posts = await response.json();
  const results = await downloadImages(posts);

  if (results.length > 0) {
    await saveImages(tag, results);
  }
}
