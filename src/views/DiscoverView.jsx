import React from "react";
import { Search } from "lucide-react";
import { Cards } from "../components/Cards";

export function DiscoverView({
  filteredCollections,
  mood,
  saved,
  onToggleSaveCollection,
  onOpenCollection,
  setMood,
}) {
  return (
    <section className="made-section">
      <div className="section-heading">
        <div>
          <h2>
            {mood === "All music"
              ? "All collections"
              : `${mood} collections`}
          </h2>
          <p>Handpicked sounds for wherever your head’s at.</p>
        </div>
      </div>

      {filteredCollections.length ? (
        <Cards
          list={filteredCollections}
          onOpen={onOpenCollection}
          saved={saved}
          onToggleSave={onToggleSaveCollection}
        />
      ) : (
        <div className="empty">
          <Search />
          <h3>No collections found in this mood.</h3>
          <p>Try switching to “All music” or another mood filter.</p>
          <button
            className="olive-btn"
            onClick={() => setMood("All music")}
          >
            Explore all music
          </button>
        </div>
      )}
    </section>
  );
}
