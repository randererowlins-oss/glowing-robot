import React from "react";
import { Play, Check, Plus, ArrowRight, ArrowUpRight, Leaf, Search } from "lucide-react";
import { img } from "../data/catalog";
import { Cards } from "../components/Cards";
import { TrackList } from "../components/TrackList";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function HomeView({
  filteredCollections,
  mood,
  saved,
  onToggleSaveCollection,
  onOpenCollection,
  onPlayTrack,
  current,
  playing,
  liked,
  onToggleLikeTrack,
  onAddToPlaylist,
  onOpenQueue,
  navigate,
  setMood,
  notify,
}) {
  const isMossEditSaved = saved.includes(0);

  return (
    <>
      {mood === "For you" && (
        <section className="hero">
          <ImageWithFallback
            src={img("photo-1448375240586-882707db888b", 1600)}
            alt="Sunlight falling through a quiet green forest"
          />
          <div className="hero-gradient" />
          <div className="hero-content">
            <div className="hero-tag">
              <span /> THE MOSS EDIT
            </div>
            <h2>
              Take a breath.
              <br />
              <em>Press play.</em>
            </h2>
            <p>
              Earthy textures, gentle rhythms, and a little room
              <br className="desktop" /> to just be. This is your soft landing.
            </p>
            <div className="hero-actions">
              <button className="cream-btn" onClick={() => onPlayTrack(0)}>
                <Play size={16} fill="currentColor" />
                Listen now
              </button>
              <button
                className={`hero-save ${isMossEditSaved ? "is-saved" : ""}`}
                onClick={() => {
                  onToggleSaveCollection(0);
                  notify(
                    isMossEditSaved
                      ? "Removed from your library"
                      : "The Moss Edit saved to your library"
                  );
                }}
                aria-label="Save The Moss Edit"
              >
                {isMossEditSaved ? <Check size={20} /> : <Plus size={20} />}
              </button>
              <span>32 songs · 2 hr 14 min</span>
            </div>
          </div>
          <div className="hero-corner">
            <span>
              CURATED WITH CARE.
              <br />
              LISTENED TO WITH FEELING.
            </span>
            <span className="hero-stamp">m.</span>
          </div>
          <span className="hero-pagination">
            <i />
            <i />
            <i />
          </span>
        </section>
      )}

      <section className="made-section">
        <div className="section-heading">
          <div>
            <h2>
              {mood === "For you"
                ? "Made for your kind of day"
                : `${mood === "All music" ? "Discover every" : mood} kind of day`}
            </h2>
            <p>Handpicked sounds for wherever your head’s at.</p>
          </div>
          <button
            onClick={() => {
              navigate("Discover");
              setMood("All music");
            }}
          >
            Explore all <ArrowRight size={16} />
          </button>
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
            <h3>No sounds found just yet.</h3>
            <p>Try “morning”, “indie”, or a different mood.</p>
            <button
              className="olive-btn"
              onClick={() => setMood("All music")}
            >
              Explore all music
            </button>
          </div>
        )}
      </section>

      <div className="lower-grid">
        <section>
          <div className="section-heading">
            <div>
              <h2>Back in your rotation</h2>
              <p>Some things just feel like home.</p>
            </div>
            <button onClick={onOpenQueue}>
              View queue <ArrowRight size={16} />
            </button>
          </div>
          <TrackList
            indices={[0, 1, 2]}
            current={current}
            playing={playing}
            liked={liked}
            onPlay={onPlayTrack}
            onToggleLike={onToggleLikeTrack}
            onAddToPlaylist={onAddToPlaylist}
          />
        </section>

        <section className="discovery-note">
          <div className="eyebrow">GO A LITTLE DEEPER</div>
          <h2>
            Less algorithm.
            <br />
            <em>More serendipity.</em>
          </h2>
          <p>
            Find something you didn’t know
            <br />
            you were looking for.
          </p>
          <button
            onClick={() => {
              navigate("Discover");
              setMood("All music");
            }}
          >
            Take the scenic route <ArrowUpRight size={18} />
          </button>
          <Leaf className="large-leaf" size={120} strokeWidth={0.65} />
        </section>
      </div>
    </>
  );
}
