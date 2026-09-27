import React, { useState } from "react";
import { Leaf } from "lucide-react";

export function ImageWithFallback({ src, alt = "", className = "", fallbackColor = "#667755", ...props }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`${className} image-fallback`}
        style={{
          background: `linear-gradient(135deg, ${fallbackColor}dd, #30362c)`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f6f5ef",
        }}
        aria-label={alt}
        {...props}
      >
        <Leaf size={18} strokeWidth={1.5} opacity={0.8} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
