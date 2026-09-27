# Verification

## Automated test suite

Moss includes an automated test suite powered by Vitest and React Testing Library:

```sh
npm test
```

The automated suite validates:
- **`tests/format.test.js`**: `formatTime` timestamp formatting and boundary checks; `filterCollections` mood and search filtering; `filterTracks` query search across title, artist, and album.
- **`tests/storage.test.js`**: LocalStorage read/write for liked tracks, saved collections, legacy vs. modern playlist schema migration, and user preference persistence (compact view, repeat mode, volume).
- **`tests/catalog.test.js`**: Catalog data schema integrity for editorial collections, tracks, and default playlists.
- **`tests/App.test.jsx`**: Full component integration tests covering branding, navigation between pages, opening/closing the queue panel, settings modal interactions, and custom playlist creation.

## Build check

Run `npm ci && npm run build`. The production build compiles cleanly via Vite.

## Manual acceptance checklist

1. Load Home on desktop (1440px), tablet (800px) and mobile (390px). Check navigation, artwork and fixed player don't obscure content.
2. Select Chill, Focus, Indie and Adventure; confirm the collections match the selected mood. All music restores all collections.
3. Enter “morning” or song name “bloom” in search: Matching collections and songs appear. Enter nonsense: empty-state reset restores discovery.
4. Open a collection, press play and allow network access. Audio should start; the player should reflect the selected track. Verify pause/resume, seek, volume, mute, next, previous, repeat and shuffle.
5. Toggle a track heart, visit Liked songs, refresh and confirm persistence. Unlike it and confirm removal.
6. Save a collection with +, open Your library, refresh and confirm it remains. Remove it and check the empty state.
7. Create a playlist, confirm its appearance in navigation and library; check blank and duplicate names are rejected. Add songs to it using the + button on track rows; verify removing songs and deleting the custom playlist.
8. Open queue, select a track and close queue. Check profile counts, preferences, About and Plus dialogs. Plus must not request money or payment details.
9. Block the audio host, attempt playback and check the error message. Local state should remain intact.
10. Navigate with keyboard and visible focus. Check reduced-motion preferences, 200% zoom and a screen reader.

## Known prototype limitations

- Playback uses SoundHelix sample compositions rather than commercial recordings.
- localStorage is browser-specific; no multi-device sync or cloud database backend.
- Track durations and artist metadata are sample presentation data, not the SoundHelix recording metadata.
- Initial guest identity is fixed; full authentication is documented in `docs/PRODUCTION.md`.
