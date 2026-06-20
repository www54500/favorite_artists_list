export async function fetchGist(token, gistId) {
  const response = await fetch(`https://api.github.com/gists/${gistId}`, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Gist: ${response.statusText}`);
  }

  const data = await response.json();
  const fileContent = data.files['artists.json']?.content;

  if (!fileContent) {
    throw new Error('artists.json not found in the Gist.');
  }

  return JSON.parse(fileContent);
}

export async function updateGist(token, gistId, dataObj) {
  const content = JSON.stringify(dataObj, null, 2);

  const response = await fetch(`https://api.github.com/gists/${gistId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      files: {
        'artists.json': {
          content: content
        }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to update Gist: ${response.statusText}`);
  }

  return await response.json();
}
