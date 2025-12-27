import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0f 0%, #0f172a 50%, #0a0a0f 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radar circles background */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "10%",
            transform: "translateY(-50%)",
            width: "500px",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Concentric circles */}
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              border: "1px solid rgba(6, 182, 212, 0.15)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "1px solid rgba(6, 182, 212, 0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              border: "1px solid rgba(6, 182, 212, 0.25)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "1px solid rgba(6, 182, 212, 0.3)",
            }}
          />
          {/* Center glow */}
          <div
            style={{
              position: "absolute",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(6, 182, 212, 0) 70%)",
            }}
          />
          {/* Sweep line effect */}
          <div
            style={{
              position: "absolute",
              width: "200px",
              height: "4px",
              background: "linear-gradient(90deg, rgba(6, 182, 212, 0) 0%, rgba(6, 182, 212, 0.8) 100%)",
              transformOrigin: "left center",
              transform: "rotate(-30deg)",
            }}
          />
          {/* Cross lines */}
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "1px",
              background: "rgba(59, 130, 246, 0.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "1px",
              height: "400px",
              background: "rgba(59, 130, 246, 0.1)",
            }}
          />
        </div>

        {/* Detection labels */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            right: "25%",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#06b6d4",
              boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)",
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px" }}>
            Manual Data Entry
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: "45%",
            right: "15%",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#06b6d4",
              boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)",
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px" }}>
            Repetitive Reports
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            position: "absolute",
            left: "80px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            maxWidth: "55%",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#06b6d4",
              }}
            />
            <span
              style={{
                color: "#06b6d4",
                fontSize: "18px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              AI Automation Consultant
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>AI Automation for</span>
            <span
              style={{
                background: "linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Agencies & Consultancies
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              lineHeight: 1.5,
              marginBottom: "32px",
            }}
          >
            Stop wasting hours on repetitive work. Book a free AI audit.
          </p>

          {/* CTA hint */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 24px",
              background: "linear-gradient(90deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
              borderRadius: "12px",
              border: "1px solid rgba(6, 182, 212, 0.3)",
            }}
          >
            <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: 600 }}>
              Free 15-Minute AI Audit
            </span>
            <span style={{ color: "#06b6d4", fontSize: "24px" }}>→</span>
          </div>
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ color: "#ffffff", fontSize: "24px", fontWeight: 600 }}>
            Austin Mander
          </span>
          <span style={{ color: "#52525b", fontSize: "24px" }}>|</span>
          <span style={{ color: "#71717a", fontSize: "20px" }}>
            austinmander.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
