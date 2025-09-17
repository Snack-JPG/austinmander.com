import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Austin Mander";
    const subtitle =
      searchParams.get("subtitle") || "Building at unfair speed with AI";
    const type = searchParams.get("type") || "default";
    const tags = searchParams.get("tags")?.split(",") || [];

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundImage:
              "linear-gradient(135deg, #0B0F14 0%, #1E293B 100%)",
            padding: "80px",
            position: "relative",
          }}
        >
          {/* Radar pattern background */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: `radial-gradient(circle at 80% 20%, #10B981 0%, transparent 50%),
                               radial-gradient(circle at 20% 80%, #10B981 0%, transparent 50%)`,
            }}
          />

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              maxWidth: "80%",
              zIndex: 1,
            }}
          >
            {/* Badge */}
            {type !== "default" && (
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  color: "#10B981",
                  fontSize: "24px",
                  fontWeight: 500,
                  marginBottom: "24px",
                  textTransform: "capitalize",
                }}
              >
                {type}
              </div>
            )}

            {/* Title */}
            <h1
              style={{
                fontSize: "72px",
                fontWeight: 700,
                color: "#F8FAFC",
                lineHeight: 1.1,
                marginBottom: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "32px",
                color: "#94A3B8",
                lineHeight: 1.4,
                marginBottom: tags.length > 0 ? "32px" : "0",
                maxWidth: "90%",
              }}
            >
              {subtitle}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {tags.slice(0, 4).map((tag) => (
                  <div
                    key={tag}
                    style={{
                      background: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                      borderRadius: "16px",
                      padding: "8px 16px",
                      color: "#10B981",
                      fontSize: "20px",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Brand mark */}
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              right: "80px",
              color: "#64748B",
              fontSize: "24px",
              fontWeight: 600,
            }}
          >
            austinmander.com
          </div>

          {/* Radar icon */}
          <div
            style={{
              position: "absolute",
              top: "80px",
              right: "80px",
              width: "120px",
              height: "120px",
              opacity: 0.3,
            }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              style={{
                color: "#10B981",
              }}
            >
              <circle
                cx="60"
                cy="60"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.5"
              />
              <circle
                cx="60"
                cy="60"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
              <circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.2"
              />
              <line
                x1="60"
                y1="5"
                x2="60"
                y2="115"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.2"
              />
              <line
                x1="5"
                y1="60"
                x2="115"
                y2="60"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.2"
              />
              <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.8" />
            </svg>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.log(`${e instanceof Error ? e.message : "Unknown error"}`);
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
