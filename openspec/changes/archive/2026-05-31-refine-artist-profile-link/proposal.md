# Proposal - Refine Artist Profile Link

## Why
The previously specified link to the Danbooru artist profile (`/artists/show?name={tag}`) is unreliable because many artists on Danbooru do not have a formal "artist" wiki entry, leading to 404 errors. However, since the app successfully fetches images using the tag, linking to the post search results (`/posts?tags={tag}`) is guaranteed to work and provide relevant context.

## What Changes
- **Artist Row**: Update the clickable artist name link to point to the Danbooru posts page instead of the artist profile page.

## Capabilities

### New Capabilities
(None)

### Modified Capabilities
- `artist-management`: Update the "Link to Danbooru artist profile" requirement with a more reliable URL.

## Impact
- `src/components/ArtistRow.jsx`: URL update in the artist name link.
