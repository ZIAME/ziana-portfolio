import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const fontData = await readFile(join(process.cwd(), "fonts/nohemi/Nohemi-ExtraBold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F2F2F0",
          borderRadius: 14,
        }}
      >
        <span style={{ fontFamily: "Nohemi", fontSize: 42, color: "#171717" }}>Z</span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Nohemi", data: fontData, style: "normal", weight: 800 }],
    },
  );
}
