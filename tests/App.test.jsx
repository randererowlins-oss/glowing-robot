import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { App } from "../src/App";

describe("Moss App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the Moss brand logo and navigation items", () => {
    render(<App />);
    expect(screen.getByLabelText("Moss home")).toBeInTheDocument();
    const sidebar = screen.getByRole("complementary");
    expect(within(sidebar).getByRole("button", { name: "Home" })).toBeInTheDocument();
    expect(within(sidebar).getByRole("button", { name: "Discover" })).toBeInTheDocument();
    expect(within(sidebar).getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("allows switching between navigation pages", () => {
    render(<App />);
    const sidebar = screen.getByRole("complementary");

    // Click Discover
    fireEvent.click(within(sidebar).getByRole("button", { name: "Discover" }));
    expect(screen.getByText("A world to")).toBeInTheDocument();

    // Click Liked songs
    fireEvent.click(within(sidebar).getByRole("button", { name: /Liked songs/ }));
    expect(screen.getByText("Close to your")).toBeInTheDocument();

    // Click Your library
    fireEvent.click(within(sidebar).getByRole("button", { name: "Your library" }));
    expect(screen.getByText("Your little")).toBeInTheDocument();
  });

  it("opens and closes the queue panel", () => {
    render(<App />);

    const openQueueBtn = screen.getByLabelText("Open queue");
    fireEvent.click(openQueueBtn);

    expect(screen.getByText("Your queue")).toBeInTheDocument();

    const closeQueueBtn = screen.getByLabelText("Close queue");
    fireEvent.click(closeQueueBtn);

    expect(screen.queryByText("Your queue")).not.toBeInTheDocument();
  });

  it("opens settings modal and toggles preferences", () => {
    render(<App />);

    const settingsBtn = screen.getByRole("button", { name: /Settings & preferences/i });
    fireEvent.click(settingsBtn);

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(/A few small changes to make yourself comfortable/i)).toBeInTheDocument();

    const toggles = within(dialog).getAllByRole("switch");
    expect(toggles.length).toBeGreaterThan(0);
    fireEvent.click(toggles[0]);

    const closeDialog = within(dialog).getByLabelText("Close dialog");
    fireEvent.click(closeDialog);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens playlist creation modal and creates a custom playlist", () => {
    render(<App />);

    const createBtn = screen.getByLabelText("Create playlist");
    fireEvent.click(createBtn);

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(/Make it/i)).toBeInTheDocument();

    const input = within(dialog).getByPlaceholderText("A soundtrack for…");
    fireEvent.change(input, { target: { value: "Mountain Stargazing" } });

    const submitBtn = within(dialog).getByRole("button", { name: /Create playlist/i });
    fireEvent.click(submitBtn);

    // Should navigate to library and show the new playlist in both sidebar and library view
    expect(screen.getAllByText("Mountain Stargazing").length).toBeGreaterThanOrEqual(1);
  });

  it("toggles likes on a track from the player", () => {
    render(<App />);

    const likeBtn = screen.getByLabelText(/Like current song/i);
    fireEvent.click(likeBtn);

    expect(screen.getByLabelText(/Unlike current song/i)).toBeInTheDocument();
  });
});
