import React from "react";
import { Check } from "lucide-react";

export function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast" role="status">
      <Check size={17} />
      {message}
    </div>
  );
}
