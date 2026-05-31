import { getImagesForArtist, saveImages } from './storage';

function getBestImageUrl(post) {
  const variants = post.media_asset?.variants || [];
  const variantPriority = ['360x360', '180x180', '720x720', 'sample', 'original'];

  for (const type of variantPriority) {
    const variant = variants.find(v => v.type === type);
    if (variant?.url) return variant.url;
  }

  // Legacy fallbacks
  return post.preview_file_url || post.large_file_url || post.file_url;
}

async function downloadImages(posts) {
  const results = [];
  for (const post of posts) {
    const imgUrl = getBestImageUrl(post);
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
