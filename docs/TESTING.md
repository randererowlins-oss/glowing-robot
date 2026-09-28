# Verification

## Automated test suite

Moss includes an automated test suite powered by Vitest and React Testing Library:

```sh
npm test
```

The automated suite validates:
- **`tests/format.test.js`**: `formatTime` timestamp formatting and boundary checks; `filterCollections` mood and search filtering; `filterTracks` query search across title, artist, and album.
- **`tests/queue.test.js`**: Pure playback-order logic — next/previous stepping and wrapping, shuffle never repeating the current track, backwards navigation staying deterministic under shuffle, the repeat-mode cycle (off → all → one), and what happens when a track ends in each mode.
- **`tests/storage.test.js`**: LocalStorage read/write for liked tracks, saved collections, legacy vs. modern playlist schema migration, the legacy boolean repeat flag migrating to a repeat mode, and recovery from unusable stored values.
- **`tests/catalog.test.js`**: Catalog data schema integrity for editorial collections, tracks, and default playlists.
- **`tests/App.test.jsx`**: Full component integration tests covering branding, navigation between pages, opening/closing the queue panel, settings modal interactions, and custom playlist creation.
- **`tests/player.test.jsx`**: Player transport controls, volume restore after mute, repeat cycling and persistence, progress reset on track change, and dialog focus behaviour (focus trap, focus restoration, draft reset).

## Lint

```sh
npm run lint
```

ESLint runs with the React Hooks rules enabled, which catch effect-dependency
and render-phase state mistakes. `.github/workflows/ci.yml` runs lint, tests
and build together as a pull-request gate.

## Build check

Run `npm ci && npm run build`. The production build compiles cleanly via Vite.

## Manual acceptance checklist

1. Load Home on desktop (1440px), tablet (800px) and mobile (390px). Check navigation, artwork and fixed player don't obscure content.
2. Select Chill, Focus, Indie and Adventure; confirm the collections match the selected mood. All music restores all collections.
3. Enter “morning” or song name “bloom” in search: Matching collections and songs appear. Enter nonsense: empty-state reset restores discovery.
4. Open a collection, press play and allow network access. Audio should start; the player should reflect the selected track. Verify pause/resume, seek, volume, mute (unmute should restore your previous level, not a default), next, previous and shuffle. Previous should step backwards even while shuffle is on, and "next" should never land on the track that is already playing.
5. Cycle the repeat button: **off → all → one → off**. With *off*, playback stops after the last track; with *all* it wraps to the first; with *one* it replays the current track. Settings offers the same three modes, and the choice survives a refresh.
6. Toggle a track heart, visit Liked songs, refresh and confirm persistence. Unlike it and confirm removal.
7. Save a collection with +, open Your library, refresh and confirm it remains. Remove it and check the empty state.
8. Create a playlist, confirm its appearance in navigation and library; check blank and duplicate names are rejected. Add songs to it using the + button on track rows; verify removing songs and deleting the custom playlist. Partially typing a name and closing the dialog should discard the draft.
9. Open queue, select a track and close queue. Check profile counts, preferences, About and Plus dialogs. Plus must not request money or payment details.
10. Block the audio host, attempt playback and check the error message. Local state should remain intact.
11. Navigate with keyboard and visible focus. Tab should stay inside an open dialog and return to the button that opened it on close. Check reduced-motion preferences, 200% zoom and a screen reader.

## Known prototype limitations

- Playback uses SoundHelix sample compositions rather than commercial recordings.
- localStorage is browser-specific; no multi-device sync or cloud database backend.
- Track durations and artist metadata are sample presentation data, not the SoundHelix recording metadata.
- Initial guest identity is fixed; full authentication is documented in `docs/PRODUCTION.md`.
