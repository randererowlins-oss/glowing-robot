import React from "react";
import { Library, Music2, ArrowRight, Trash2 } from "lucide-react";
import { Cards } from "../components/Cards";

export function LibraryView({
  savedCollections,
  onOpenCollection,
  onToggleSaveCollection,
  saved,
  playlists = [],
  onOpenPlaylist,
  onDeletePlaylist,
  navigate,
}) {
  return (
    <>
      <section>
        <h2 style={{ fontSize: 18, marginBottom: 14 }}>Saved collections</h2>
        {savedCollections.length ? (
          <Cards
            list={savedCollections}
            onOpen={onOpenCollection}
            saved={saved}
            onToggleSave={onToggleSaveCollection}
          />
        ) : (
          <div className="empty">
            <Library size={32} />
            <h3>Make yourself at home.</h3>
            <p>Save a collection with the + button to find it here.</p>
            <button
              className="olive-btn"
              onClick={() => navigate("Discover")}
            >
              Find your sound
            </button>
          </div>
        )}
      </section>

      {playlists.length > 0 && (
        <section style={{ marginTop: 36 }}>
          <h2 style={{ fontSize: 18, marginBottom: 14 }}>Your playlists</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {playlists.map((p) => {
              const trackCount = Array.isArray(p.trackIds) ? p.trackIds.length : 0;
              return (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "#eeeee5",
                    borderRadius: 6,
                    padding: "6px 14px 6px 6px",
                  }}
                >
                  <button
                    className="playlist-tile"
                    style={{ flex: 1, margin: 0, background: "transparent", border: 0 }}
                    onClick={() => onOpenPlaylist(p)}
                  >
                    <Music2 />
                    <span style={{ flex: 1, textAlign: "left" }}>{p.name}</span>
                    <small style={{ color: "#88897e", marginRight: 8 }}>
                      {trackCount} {trackCount === 1 ? "track" : "tracks"}
                    </small>
                    <ArrowRight size={18} />
                  </button>
                  {p.isCustom && onDeletePlaylist && (
                    <button
                      aria-label={`Delete ${p.name}`}
                      title="Delete playlist"
                      style={{ padding: 6, color: "#a1a591" }}
                      onClick={() => onDeletePlaylist(p.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
