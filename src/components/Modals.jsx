import React, { useState } from "react";
import { X, Leaf, Plus, ArrowRight, Check } from "lucide-react";
import { tracks } from "../data/catalog";

export function Modals({
  modal,
  onClose,
  onCreatePlaylist,
  playlists = [],
  addToPlaylistTrackId,
  onAddTrackToPlaylist,
  compact,
  setCompact,
  repeat,
  setRepeat,
  likedCount = 0,
  savedCount = 0,
  onVisitLibrary,
  notify,
}) {
  const [newPlaylistName, setNewPlaylistName] = useState("");

  if (!modal) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X size={21} />
        </button>
        <Leaf size={29} className="modal-leaf" />
        <span className="eyebrow">A LITTLE MORE MOSS</span>
        <h2 id="modal-title">
          {modal === "playlist" ? (
            <>
              Make it <em>your own.</em>
            </>
          ) : modal === "addToPlaylist" ? (
            <>
              Add to <em>playlist.</em>
            </>
          ) : modal === "plus" ? (
            <>
              More music.
              <br />
              <em>Less in the way.</em>
            </>
          ) : modal === "settings" ? (
            <>
              In your <em>element.</em>
            </>
          ) : modal === "profile" ? (
            <>
              Welcome home, <em>Jamie.</em>
            </>
          ) : (
            <>
              A more natural
              <br />
              <em>way to listen.</em>
            </>
          )}
        </h2>

        {modal === "playlist" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const trimmed = newPlaylistName.trim();
              if (trimmed) {
                const exists = playlists.some(
                  (p) => p.name.toLowerCase() === trimmed.toLowerCase()
                );
                if (exists) {
                  notify("A playlist with that name already exists.");
                  return;
                }
                onCreatePlaylist(trimmed);
                setNewPlaylistName("");
                onClose();
              }
            }}
          >
            <label>
              Playlist name
              <input
                autoFocus
                required
                maxLength={60}
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="A soundtrack for…"
              />
            </label>
            <p>Your playlist will be saved in this browser.</p>
            <button className="olive-btn" type="submit">
              <Plus size={17} />
              Create playlist
            </button>
          </form>
        )}

        {modal === "addToPlaylist" && (
          <div className="add-to-playlist-dialog">
            <p>
              Select a playlist for{" "}
              <b>
                {tracks[addToPlaylistTrackId]
                  ? tracks[addToPlaylistTrackId].title
                  : "this track"}
              </b>:
            </p>
            <div className="playlist-picker-list" style={{ display: "flex", flexDirection: "column", gap: 8, margin: "14px 0" }}>
              {playlists.map((p) => {
                const alreadyIn = p.trackIds && p.trackIds.includes(addToPlaylistTrackId);
                return (
                  <button
                    key={p.id}
                    className="playlist-picker-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: 6,
                      border: "1px solid #e1e2d7",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      onAddTrackToPlaylist(p.id, addToPlaylistTrackId);
                      onClose();
                    }}
                  >
                    <span>{p.name}</span>
                    {alreadyIn ? (
                      <span style={{ fontSize: 12, color: "#667d48", display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <Check size={14} /> Added
                      </span>
                    ) : (
                      <Plus size={16} color="#88897e" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {modal === "plus" && (
          <>
            <p>
              An intentional listening experience. Ad-free listening,
              offline favorites, and high-quality sound are on our roadmap.
            </p>
            <div className="plan">
              <span>Moss Plus</span>
              <b>Coming soon</b>
            </div>
            <p className="preview-note">
              This is a product preview. No paid subscription or billing is
              available.
            </p>
            <button
              className="olive-btn"
              onClick={() => {
                onClose();
                notify("You’re exploring the free Moss preview. Enjoy the music.");
              }}
            >
              Keep exploring <ArrowRight size={17} />
            </button>
          </>
        )}

        {modal === "settings" && (
          <>
            <p>A few small changes to make yourself comfortable.</p>
            <label className="setting-row">
              Compact artwork
              <button
                className={compact ? "toggle on" : "toggle"}
                role="switch"
                aria-checked={compact}
                onClick={() => setCompact(!compact)}
              >
                <i />
              </button>
            </label>
            <label className="setting-row">
              Repeat current track
              <button
                className={repeat ? "toggle on" : "toggle"}
                role="switch"
                aria-checked={repeat}
                onClick={() => setRepeat(!repeat)}
              >
                <i />
              </button>
            </label>
            <p className="preview-note">
              Your library and playlists are stored locally. Audio requires an
              internet connection.
            </p>
          </>
        )}

        {modal === "profile" && (
          <>
            <p>
              You’re listening as a demo guest. Your favorites and playlists stay
              with this browser—no account needed.
            </p>
            <div className="profile-stats">
              <span>
                <b>{likedCount}</b>Liked songs
              </span>
              <span>
                <b>{savedCount}</b>Collections
              </span>
              <span>
                <b>{playlists.length}</b>Playlists
              </span>
            </div>
            <button
              className="olive-btn"
              onClick={() => {
                onClose();
                onVisitLibrary();
              }}
            >
              Visit your library <ArrowRight size={17} />
            </button>
          </>
        )}

        {modal === "about" && (
          <>
            <p>
              Moss is an independently designed music discovery prototype. A
              quieter space for finding sounds that feel like you.
            </p>
            <p>
              Photography via Unsplash. Playback uses SoundHelix sample
              compositions, not recordings by the artists shown. No
              affiliation with those artists or existing streaming services.
            </p>
            <p className="preview-note">
              Commercial launch requires licensed music, accounts, payments, and
              a production streaming backend. See the project README for the
              full roadmap.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
