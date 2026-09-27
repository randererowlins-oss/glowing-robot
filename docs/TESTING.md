# Verification

## Build check

Run `npm ci && npm run build`. The production build was verified during implementation. There is no automated browser/unit test suite yet; the following are manual acceptance checks, not claims of automated coverage.

## Manual acceptance checklist

1. Load Home on desktop (1440px), tablet (800px) and mobile (390px). Check navigation, artwork and fixed player don't obscure content.
2. Select Chill, Focus, Indie and Adventure; confirm the collections match the selected mood. All music restores all collections.
3. Enter “morning” in search: Slow mornings appears. Enter nonsense: empty-state reset restores discovery.
4. Open a collection, press play and allow network access. Audio should start; the player should reflect the selected track. Verify pause/resume, seek, volume, mute, next, previous, repeat and shuffle.
5. Toggle a track heart, visit Liked songs, refresh and confirm persistence. Unlike it and confirm removal.
6. Save a collection with +, open Your library, refresh and confirm it remains. Remove it and check the empty state.
7. Create a playlist, confirm its appearance in navigation and library; check blank and duplicate names are rejected. Open it and verify the sample track list.
8. Open queue, select a track and close queue. Check profile counts, preferences, About and Plus dialogs. Plus must not request money or payment details.
9. Block the audio host, attempt playback and check the error message. Local state should remain intact.
10. Navigate with keyboard and visible focus. Check reduced-motion preferences, 200% zoom and a screen reader. Complete the production accessibility audit before release.

## Known demo limitations

- External network resources can fail and artwork does not yet have local fallbacks.
- localStorage is browser-specific; no multi-device sync or database migrations.
- Track durations and artist metadata are sample presentation data, not the SoundHelix recording metadata.
- Playlist track editing/reordering is not implemented; created playlists open demo tracks.
- Initial guest identity is fixed. Settings other than library data are session-only.
- Search covers collection titles/descriptions, not a remote artist/album catalog.
- The mobile discovery grid intentionally shows four featured collections.
