import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export function Header({
  query,
  setQuery,
  navigate,
  openModal,
}) {
  return (
    <header>
      <div className="history">
        <button aria-label="Go home" onClick={() => navigate("Home")}>
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Discover music"
          onClick={() => navigate("Discover")}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <label className="search-box">
        <Search size={17} />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            navigate("Search");
          }}
          placeholder="What sounds good today?"
          aria-label="Search music"
        />
        <span>⌘ K</span>
      </label>
      <div className="header-right">
        <span className="quality">
          <span /> SOUND, IN ITS ELEMENT.
        </span>
        <button
          className="avatar"
          onClick={() => openModal("profile")}
          aria-label="Open profile"
        >
          J
        </button>
      </div>
    </header>
  );
}
