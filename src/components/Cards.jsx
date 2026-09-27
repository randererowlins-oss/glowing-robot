import React from "react";
import { ArrowUpRight, Play, Check, Plus } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

export function Cards({ list, onOpen, saved = [], onToggleSave }) {
  return (
    <div className="cards">
      {list.map((c) => {
        const isSaved = saved.includes(c.id);
        return (
          <article className="music-card" key={c.id}>
            <button
              className="cover"
              onClick={() => onOpen(c)}
              aria-label={`Open ${c.title}`}
            >
              <ImageWithFallback
                src={c.image}
                alt={`${c.title} landscape`}
                fallbackColor={c.color}
              />
              <div className="cover-shade" />
              <span className="cover-brand">
                moss<span>®</span>
              </span>
              <div className="cover-title">{c.title}</div>
              <span className="cover-bottom">
                {c.tag}
                <ArrowUpRight size={15} />
              </span>
              <span className="cover-play">
                <Play size={23} fill="currentColor" />
              </span>
            </button>
            <div className="card-label">
              <button onClick={() => onOpen(c)}>{c.title}</button>
              <button
                className="save-small"
                aria-label={
                  isSaved
                    ? "Remove from library"
                    : "Save to library"
                }
                onClick={() => onToggleSave(c.id)}
              >
                {isSaved ? <Check size={17} /> : <Plus size={17} />}
              </button>
            </div>
            <p>{c.description}</p>
          </article>
        );
      })}
    </div>
  );
}
