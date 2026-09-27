export function formatTime(n) {
  if (n === null || n === undefined || isNaN(n) || n < 0) return "0:00";
  const mins = Math.floor(n / 60);
  const secs = Math.floor(n % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function filterCollections(collections, mood, query) {
  const q = (query || "").trim().toLowerCase();
  return collections.filter((c) => {
    const matchesMood =
      mood === "For you" || mood === "All music" || c.mood === mood;
    const matchesQuery =
      !q || `${c.title} ${c.description}`.toLowerCase().includes(q);
    return matchesMood && matchesQuery;
  });
}

export function filterTracks(tracks, query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  return tracks.filter((t) =>
    `${t.title} ${t.artist} ${t.album}`.toLowerCase().includes(q)
  );
}
