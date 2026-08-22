# TODO

## Active

- Complete the selectable game and review cards used by the delete views.
- Implement deleting games and reviews.
- Introduce shared application state so games and reviews refresh after create and delete operations without reloading the page.
- Prevent duplicate form submissions while repository requests are in progress.

## Error handling and accessibility

- Add consistent handling for repository and HTTP errors, including deliberately testing failure scenarios in the UI.
- Announce dynamically updated game search results appropriately to screen readers, for example with an `aria-live` region.
- Review the low-priority edge case documented by the `filter-games` tests.

## Security and architecture

- Discuss and document the responsibilities of the frontend and backend regarding XSS, CSRF, CORS, cookies, sessions, and input validation.
- Continue migrating older Svelte prop syntax to the Svelte 5 runes API where useful, particularly for components rendered by the router.

## Later

- Add the remaining CRUD operations when required.
- Add pagination improvements for larger collections where needed.
- Hold a project review and knowledge quiz when the application is considered complete.
