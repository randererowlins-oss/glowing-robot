import { describe, it, expect } from "vitest";
import { formatTime, filterCollections, filterTracks } from "../src/utils/format";

describe("formatTime", () => {
  it("formats standard seconds correctly into m:ss", () => {
    expect(formatTime(0)).toBe("0:00");
    expect(formatTime(5)).toBe("0:05");
    expect(formatTime(65)).toBe("1:05");
    expect(formatTime(272)).toBe("4:32");
    expect(formatTime(336)).toBe("5:36");
  });

  it("handles invalid or empty inputs gracefully", () => {
    expect(formatTime(null)).toBe("0:00");
    expect(formatTime(undefined)).toBe("0:00");
    expect(formatTime(-10)).toBe("0:00");
    expect(formatTime(NaN)).toBe("0:00");
  });
});

describe("filterCollections", () => {
  const sampleCollections = [
    { id: 0, title: "Slow mornings", description: "No rush. Just a little rhythm.", mood: "Focus" },
    { id: 1, title: "Golden hour", description: "For the light that lingers.", mood: "Chill" },
    { id: 2, title: "A softer kind of indie", description: "Independent sounds. Open hearts.", mood: "Indie" },
  ];

  it("returns all when mood is 'For you' and query is empty", () => {
    const res = filterCollections(sampleCollections, "For you", "");
    expect(res).toHaveLength(3);
  });

  it("returns all when mood is 'All music' and query is empty", () => {
    const res = filterCollections(sampleCollections, "All music", "");
    expect(res).toHaveLength(3);
  });

  it("filters strictly by mood when a specific mood is given", () => {
    const res = filterCollections(sampleCollections, "Chill", "");
    expect(res).toHaveLength(1);
    expect(res[0].title).toBe("Golden hour");
  });

  it("filters case-insensitively by query across title and description", () => {
    const res = filterCollections(sampleCollections, "All music", "mornings");
    expect(res).toHaveLength(1);
    expect(res[0].id).toBe(0);

    const resDesc = filterCollections(sampleCollections, "All music", "lingers");
    expect(resDesc).toHaveLength(1);
    expect(resDesc[0].id).toBe(1);
  });
});

describe("filterTracks", () => {
  const sampleTracks = [
    { id: 0, title: "Weightless", artist: "Marconi Union", album: "Ambient reflections" },
    { id: 1, title: "Bloom", artist: "The Paper Kites", album: "Woodland" },
    { id: 2, title: "Holocene", artist: "Bon Iver", album: "Bon Iver" },
  ];

  it("returns empty array when query is empty", () => {
    expect(filterTracks(sampleTracks, "")).toEqual([]);
    expect(filterTracks(sampleTracks, "   ")).toEqual([]);
  });

  it("filters by song title, artist, or album", () => {
    expect(filterTracks(sampleTracks, "weight")).toHaveLength(1);
    expect(filterTracks(sampleTracks, "paper kites")).toHaveLength(1);
    expect(filterTracks(sampleTracks, "woodland")).toHaveLength(1);
    expect(filterTracks(sampleTracks, "nonexistent")).toHaveLength(0);
  });
});
