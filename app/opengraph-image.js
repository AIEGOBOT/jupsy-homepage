import { ImageResponse } from "next/og";

export const alt = "JUPSY AI Studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          color: "#ffffff",
          fontSize: 112,
          fontWeight: 800,
          letterSpacing: "-0.06em",
          whiteSpace: "nowrap",
          fontFamily: "sans-serif",
        }}
      >
        JUPSY AI Studio
      </div>
    ),
    size,
  );
}
