import { describe, it, expect } from "vitest";
import { collections, tracks, defaultPlaylists, moods } from "../src/data/catalog";

describe("catalog fixtures", () => {
  it("has valid collections with all required properties", () => {
    expect(collections.length).toBeGreaterThan(0);
    collections.forEach((c) => {
      expect(typeof c.id).toBe("number");
      expect(typeof c.title).toBe("string");
      expect(typeof c.description).toBe("string");
      expect(typeof c.mood).toBe("string");
      expect(Array.isArray(c.trackIds)).toBe(true);
      expect(c.image).toContain("https://images.unsplash.com/");
    });
  });

  it("has valid tracks with all required properties", () => {
    expect(tracks.length).toBeGreaterThan(0);
    tracks.forEach((t) => {
      expect(typeof t.id).toBe("number");
      expect(typeof t.title).toBe("string");
      expect(typeof t.artist).toBe("string");
      expect(typeof t.album).toBe("string");
      expect(typeof t.duration).toBe("string");
      expect(typeof t.audioIndex).toBe("number");
    });
  });

  it("has default playlists referencing valid tracks", () => {
    expect(defaultPlaylists.length).toBeGreaterThan(0);
    defaultPlaylists.forEach((p) => {
      expect(typeof p.id).toBe("string");
      expect(typeof p.name).toBe("string");
      p.trackIds.forEach((tId) => {
        expect(tracks.some((t) => t.id === tId)).toBe(true);
      });
    });
  });

  it("includes all standard mood tags", () => {
    expect(moods).toContain("For you");
    expect(moods).toContain("Chill");
    expect(moods).toContain("Focus");
    expect(moods).toContain("Indie");
    expect(moods).toContain("Adventure");
    expect(moods).toContain("All music");
  });
});
