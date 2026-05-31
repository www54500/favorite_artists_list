# Artist Management (Delta)

## Purpose
Update the artist profile link requirement to use a more reliable destination.

## Requirements

## MODIFIED Requirements

### Requirement: Link to Danbooru artist profile
The system SHALL provide a direct link to the artist's posts on Danbooru.

#### Scenario: Clicking artist name
- **WHEN** the user clicks the artist name in the list
- **THEN** the system SHALL open the Danbooru posts page (`https://danbooru.donmai.us/posts?tags={tag}`) in a new tab
