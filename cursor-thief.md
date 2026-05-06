# Cursor Thief

*A tiny creature scuttles in, steals selected text, runs off with it, and brings it back.*

## Concept

A browser extension (or any web context) where selecting text triggers a small character to animate in, "grab" the selection, run off-screen with it, and return it a few seconds later. Pure visual mischief. The user loses nothing — the text always comes back.

## User stories

1. **As a user browsing the web**, when I select any text on a page, I want a small creature to sneak in and run off with it, so that I get a moment of unexpected delight instead of just a highlight.
2. **As a user**, I want my selected text to be visibly disturbed (faded, struck through) while the creature has it, so that the theft feels real and not just an overlay animation.
3. **As a user**, I want the text to be returned within a few seconds, so that I never actually lose anything I might have wanted to copy.
4. **As a user**, I want only one theft to be in progress at a time, so that rapid selections don't pile up into chaos.
5. **As a user**, I want the creature to ignore selections inside text inputs and editable fields, so that the joke doesn't disrupt actual writing.
6. **As a user**, I want a way to disable the extension on a specific site, so that it stays out of my work tools.
7. **As a user**, I want the speech bubble carrying my text to truncate gracefully if the selection is long, so that the visual stays clean.

## Acceptance criteria

- A theft is triggered by `mouseup` with a non-collapsed selection inside a non-editable element.
- The creature animates in from off-screen within ~1s of the trigger.
- While in flight, the original selection is visibly altered (low opacity + strikethrough or equivalent).
- The creature carries the text in a speech bubble, then exits off-screen.
- The original selection is fully restored to its prior appearance within 5–6 seconds.
- A second selection during an active theft is ignored.
- Cmd/Ctrl+C still works against the original selection during the animation.

## Edge cases

- **Inputs and contenteditable**: skip entirely.
- **Selections spanning element boundaries**: animation still runs, visual fade may degrade gracefully.
- **Iframes and cross-origin frames**: skip.
- **Tiny selections (1–2 chars)**: works, looks goofy, that's fine.
- **Very long selections**: truncate the bubble text with an ellipsis, but restore the full original.
- **Page scroll mid-animation**: best effort; creature can drift, no need to be precise.

## Out of scope

- Stealing images, links, or non-text elements.
- Persisting any stolen text — the loop is always closed.
- Sound effects.
- Analytics or tracking of what was selected.
