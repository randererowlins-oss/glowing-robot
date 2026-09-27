import React from "react";
import { Search } from "lucide-react";
import { Cards } from "../components/Cards";
import { TrackList } from "../components/TrackList";
import { filterTracks } from "../utils/format";
import { tracks } from "../data/catalog";

export function SearchView({
  query,
  setQuery,
  filteredCollections,
  saved,
  onToggleSaveCollection,
  onOpenCollection,
  current,
  playing,
  liked,
  onPlayTrack,
  onToggleLikeTrack,
  onAddToPlaylist,
  setMood,
}) {
  const matchingTracks = query ? filterTracks(tracks, query) : [];
  const matchingTrackIndices = matchingTracks.map((t) => t.id);
  const hasResults = filteredCollections.length > 0 || matchingTrackIndices.length > 0;

  return (
    <div className="search-view">
      <section className="made-section">
        <div className="section-heading">
          <div>
            <h2>
              {query ? `Results for “${query}”` : "A good place to start"}
            </h2>
            <p>
              {query
                ? `Showing collections and songs matching “${query}”`
                : "Search across collections, artists, songs, and albums."}
            </p>
          </div>
        </div>

        {matchingTrackIndices.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 16, marginBottom: 12, color: "#4b5d36" }}>Songs</h3>
            <TrackList
              indices={matchingTrackIndices}
              current={current}
              playing={playing}
              liked={liked}
              onPlay={onPlayTrack}
              onToggleLike={onToggleLikeTrack}
              onAddToPlaylist={onAddToPlaylist}
            />
          </div>
        )}

        {filteredCollections.length > 0 && (
          <div>
            {matchingTrackIndices.length > 0 && (
              <h3 style={{ fontSize: 16, marginBottom: 12, color: "#4b5d36" }}>Collections</h3>
            )}
            <Cards
              list={filteredCollections}
              onOpen={onOpenCollection}
              saved={saved}
              onToggleSave={onToggleSaveCollection}
            />
          </div>
        )}

        {query && !hasResults && (
          <div className="empty">
            <Search />
            <h3>No sounds found just yet.</h3>
            <p>Try searching for “morning”, “indie”, “bloom”, or “chill”.</p>
            <button
              className="olive-btn"
              onClick={() => {
                setQuery("");
                setMood("All music");
              }}
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
