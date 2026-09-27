# Moss — music for being human

An earthy, responsive music-discovery frontend, built with React 19 and Vite. Olive, cream, warm grey and landscape photography meet minimalist UI typography and italic editorial headings.

## Quick start

Requires Node.js 20.19+ (Node 22 recommended) and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. The development server binds to `0.0.0.0` for remote previews.

```sh
npm test          # run unit and component tests with Vitest
npm run build     # production assets in dist/
npm run preview   # preview the production build
```

Deploy `dist/` on any static HTTPS host. No secrets, API keys or backend are needed for this demonstration. Navigation uses React state rather than route URLs.

## Implemented experience

- Responsive desktop sidebar and mobile bottom navigation.
- Home editorial feature and curated collection artwork with graceful image fallback placeholders.
- Discovery with mood filtering and case-insensitive search across collections and individual tracks (title, artist, album).
- Collection detail views with playable demo tracks.
- Audio play/pause, next/previous, shuffle, repeat, seeking and volume.
- Queue panel and browser audio-output information.
- Favorite tracks, saved collections, persistent user settings, and custom playlists persisted in localStorage.
- Custom playlist management: create, add tracks to playlists, remove tracks, and delete playlists.
- Library and liked-song views, including empty states.
- Preferences for compact artwork and repeat; informational guest profile.
- Clearly labeled non-purchasable Plus roadmap.
- Keyboard-focus styles, labeled controls, reduced-motion support and skip navigation.
- Automated Vitest test suite covering utilities, fixtures, storage, and components.

## Important: prototype, not a commercial streaming service

Moss is a polished frontend prototype. It does **not** include licensed music distribution, authentication, payments, offline listening, device casting, lossless streaming, cloud sync or recommendation infrastructure. The profile is a demo guest.

Track and artist labels are editorial examples. **Audio playback is SoundHelix sample music, not recordings by the displayed artists.** Demo durations in the editorial list are illustrative; the player displays the actual sample duration once media metadata loads. There is no affiliation with Spotify, Apple Music, the example artists or other streaming services.

All local library data lives in this browser only. Clearing site data removes it. Do not store sensitive information here.

## Source map

| Directory / File | Responsibility |
| --- | --- |
| `index.html` | Entry document, metadata, font loading |
| `src/main.jsx` | Application bootstrap and DOM mounting |
| `src/App.jsx` | Top-level state orchestration, keyboard shortcuts, playback handling |
| `src/data/catalog.js` | Editorial collections, track catalog, and initial playlist fixtures |
| `src/utils/` | Formatting utilities (`format.js`) and persistent storage adapters (`storage.js`) |
| `src/components/` | Modular UI components: `Sidebar`, `Header`, `Player`, `Cards`, `TrackList`, `QueuePanel`, `Modals`, `ImageWithFallback` |
| `src/views/` | Page views: `HomeView`, `DiscoverView`, `SearchView`, `LibraryView`, `LikedSongsView`, `CollectionView` |
| `src/style.css` | Design tokens, layout, components, responsive breakpoints |
| `tests/` | Automated test suite (Vitest + React Testing Library) |
| `docs/PRODUCTION.md` | Commercial launch requirements and technical roadmap |
| `docs/TESTING.md` | Verification, automated testing guide, and manual acceptance checklist |

## Design system

- Canvas: `#f6f5ef`; sidebar: `#eeeee5`; primary olive: `#4b5d36`.
- DM Sans for interface text; Manrope for the wordmark; Playfair Display italics for editorial emphasis.
- Thin borders, subdued earth tones, restrained radii, landscape-led artwork.
- Responsive breakpoints: 1450, 1150, 850 and 570 pixels.
- Hover controls remain visible on small screens. Motion respects system preferences.

## External resources and release review

- Fonts: Google Fonts (DM Sans, Manrope, Playfair Display). Review their included open-source font licenses when self-hosting.
- Images: remote Unsplash image URLs with local SVG/gradient fallback. Review individual image rights and attribution requirements before release; self-host approved assets for reliability and privacy.
- Audio: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-*.mp3`. Samples are supplied by SoundHelix; consult https://www.soundhelix.com/audio-examples for attribution and use terms before distribution. Replace with owned/licensed tracks for production.
- Icons: Lucide (`lucide-react`, ISC license).

External assets require internet access and may be blocked by network/privacy settings. The UI handles failed playback with a notification. No analytics or tracking SDK is included, though external font/image/audio hosts receive normal network requests.

## License

No project license has been selected. Establish product ownership, licensing, trademark clearance and third-party notices before commercial distribution.
