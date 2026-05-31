import localforage from 'localforage';

const artistsStore = localforage.createInstance({ name: 'artists' });
const imagesStore = localforage.createInstance({ name: 'images' });

export async function clearStorage() {
  await artistsStore.clear();
  await imagesStore.clear();
}

export async function saveArtist(artist) {
  const artists = await getArtists();
  const existingIdx = artists.findIndex(a => a.id === artist.id);
  if (existingIdx !== -1) {
    artists[existingIdx] = artist;
  } else {
    artists.push(artist);
  }
  await artistsStore.setItem('all', artists);
}

export async function getArtists() {
  const data = await artistsStore.getItem('all');
  return data || [];
}

export async function saveImage(artistTag, imageId, blob) {
  let images = await imagesStore.getItem(artistTag) || [];
  images.unshift({ id: imageId, blob }); // Prepend
  if (images.length > 20) {
    images = images.slice(0, 20);
  }
  await imagesStore.setItem(artistTag, images);
}

export async function saveImages(artistTag, newImages) {
  let images = await imagesStore.getItem(artistTag) || [];
  const existingIds = new Set(images.map(img => img.id));
  
  const uniqueNew = newImages.filter(img => !existingIds.has(img.id));
  images = [...uniqueNew, ...images]; // Prepend new ones
  
  if (images.length > 20) {
    images = images.slice(0, 20);
  }
  await imagesStore.setItem(artistTag, images);
}

export async function getImagesForArtist(artistTag) {
  return (await imagesStore.getItem(artistTag)) || [];
}

export async function deleteImagesForArtist(artistTag) {
  await imagesStore.removeItem(artistTag);
}

export async function deleteArtist(artistId, artistTag) {
  const artists = await getArtists();
  const updated = artists.filter(a => a.id !== artistId);
  await artistsStore.setItem('all', updated);
  await deleteImagesForArtist(artistTag);
}
