import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { App } from "../src/App";

function currentTitle() {
  return within(screen.getByText(/Demo audio/).closest(".now-playing")).getByText(
    /Weightless|Bloom|Holocene|A Walk/
  ).textContent;
}

describe("player controls", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("steps forwards and backwards through the queue", () => {
    render(<App />);
    expect(currentTitle()).toBe("Weightless");

    fireEvent.click(screen.getByLabelText("Next track"));
    expect(currentTitle()).toBe("Bloom");

    fireEvent.click(screen.getByLabelText("Previous track"));
    expect(currentTitle()).toBe("Weightless");
  });

  it("wraps from the last track back to the first", () => {
    render(<App />);
    for (let i = 0; i < 3; i += 1) {
      fireEvent.click(screen.getByLabelText("Next track"));
    }
    expect(currentTitle()).toBe("A Walk");

    fireEvent.click(screen.getByLabelText("Next track"));
    expect(currentTitle()).toBe("Weightless");
  });

  it("keeps previous moving backwards while shuffle is on", () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText("Toggle shuffle"));

    // Previous must be the sequential predecessor, never a random jump.
    for (const [title, artist, predecessor] of [
      ["Holocene", "Bon Iver", "Bloom"],
      ["Bloom", "The Paper Kites", "Weightless"],
      ["Weightless", "Marconi Union", "A Walk"],
    ]) {
      fireEvent.click(screen.getByLabelText(`Play ${title} by ${artist}`));
      fireEvent.click(screen.getByLabelText("Previous track"));
      expect(currentTitle()).toBe(predecessor);
    }
  });

  it("never advances onto the same track when shuffling", () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText("Toggle shuffle"));

    for (let i = 0; i < 25; i += 1) {
      const before = currentTitle();
      fireEvent.click(screen.getByLabelText("Next track"));
      expect(currentTitle()).not.toBe(before);
    }
  });

  it("restores the previous volume when unmuting", () => {
    render(<App />);
    const volume = screen.getByLabelText("Volume");

    fireEvent.change(volume, { target: { value: "0.3" } });
    fireEvent.click(screen.getByLabelText("Mute"));
    expect(volume).toHaveValue("0");

    fireEvent.click(screen.getByLabelText("Unmute"));
    expect(volume).toHaveValue("0.3");
  });

  it("remembers a volume set after unmuting", () => {
    render(<App />);
    const volume = screen.getByLabelText("Volume");

    fireEvent.click(screen.getByLabelText("Mute"));
    fireEvent.click(screen.getByLabelText("Unmute"));
    fireEvent.change(volume, { target: { value: "0.42" } });
    fireEvent.click(screen.getByLabelText("Mute"));
    fireEvent.click(screen.getByLabelText("Unmute"));

    expect(volume).toHaveValue("0.42");
  });

  it("cycles the repeat button through off, all and one", () => {
    render(<App />);

    const off = screen.getByLabelText("Repeat off");
    expect(off).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(off);
    const all = screen.getByLabelText("Repeat all tracks");
    expect(all).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(all);
    const one = screen.getByLabelText("Repeat current track");
    expect(one).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(one);
    expect(screen.getByLabelText("Repeat off")).toBeInTheDocument();
  });

  it("resets the progress bar when a different track is chosen", () => {
    render(<App />);
    const seek = screen.getByLabelText("Seek playback");

    // No media metadata exists in jsdom, so the slider maxes out at 1.
    fireEvent.change(seek, { target: { value: "0.5" } });
    expect(seek).toHaveValue("0.5");

    fireEvent.click(screen.getByLabelText("Play Bloom by The Paper Kites"));
    expect(seek).toHaveValue("0");
  });

  it("persists the repeat mode across a remount", () => {
    const first = render(<App />);
    fireEvent.click(screen.getByLabelText("Repeat off"));
    expect(localStorage.getItem("moss-repeat")).toBe('"all"');
    first.unmount();

    render(<App />);
    expect(screen.getByLabelText("Repeat all tracks")).toBeInTheDocument();
  });
});

describe("dialog accessibility", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("restores focus to the control that opened the dialog", () => {
    render(<App />);
    const trigger = screen.getByLabelText("Open profile");
    trigger.focus();
    fireEvent.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });

  it("keeps Tab inside the dialog", () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText("Open profile"));
    const dialog = screen.getByRole("dialog");

    // Walking the whole tab cycle should never escape the dialog.
    for (let i = 0; i < 12; i += 1) {
      fireEvent.keyDown(document, { key: "Tab" });
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
  });

  it("moves focus backwards without escaping the dialog", () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText("Open profile"));
    const dialog = screen.getByRole("dialog");

    for (let i = 0; i < 12; i += 1) {
      fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
  });

  it("focuses the playlist name field when opening the create dialog", () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText("Create playlist"));
    expect(screen.getByPlaceholderText("A soundtrack for…")).toHaveFocus();
  });

  it("clears an abandoned playlist draft when the dialog reopens", () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText("Create playlist"));
    fireEvent.change(screen.getByPlaceholderText("A soundtrack for…"), {
      target: { value: "Half typed" },
    });

    fireEvent.click(screen.getByLabelText("Close dialog"));
    fireEvent.click(screen.getByLabelText("Create playlist"));

    expect(screen.getByPlaceholderText("A soundtrack for…")).toHaveValue("");
  });

  it("offers all three repeat modes in settings", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Settings & preferences/i }));

    const dialog = screen.getByRole("dialog");
    const group = within(dialog).getByRole("radiogroup", { name: "Repeat mode" });

    expect(within(group).getAllByRole("radio")).toHaveLength(3);

    fireEvent.click(within(group).getByRole("radio", { name: "All" }));
    expect(localStorage.getItem("moss-repeat")).toBe('"all"');
  });
});
