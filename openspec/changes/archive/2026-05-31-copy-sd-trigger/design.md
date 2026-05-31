## Context

The application lists artists with their specific SD model trigger words. These trigger words are frequently needed in external tools.

## Goals / Non-Goals

**Goals:**
- Enable copying the trigger word with a single click.
- Provide clear visual feedback to the user.

**Non-Goals:**
- Support for complex clipboard operations beyond plain text.

## Decisions

### 1. Clipboard API
- **Decision**: Use `navigator.clipboard.writeText`.
- **Rationale**: Modern, secure, and native to the browser. No external dependencies needed.

### 2. UI Feedback
- **Decision**: Show a temporary "Copied!" badge or icon change near the trigger word.
- **Rationale**: Direct feedback at the interaction point is less intrusive than a global toast for this specific action.

## Risks / Trade-offs

- **[Risk] Browser Permissions** → **Mitigation**: The Clipboard API requires user interaction (click), which we have. Secure contexts (HTTPS/Localhost) are also required, which PWAs satisfy.
