# Design - Refine Artist Profile Link

## Context
The current link to `/artists/show?name={tag}` often results in 404s.

## Goals / Non-Goals
**Goals:**
- Provide a reliable link to more of the artist's work on Danbooru.

## Decisions

### 1. Reliable Destination URL
- **Decision**: Change the link destination to `https://danbooru.donmai.us/posts?tags=${encodeURIComponent(artist.tag)}`.
- **Rationale**: This URL is guaranteed to show results if the app's image fetching (which uses the same tag) is working.

## Risks / Trade-offs
(None significant)
