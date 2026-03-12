import { NextRequest, NextResponse } from "next/server";

const MEDUSA_URL =
  process.env.NEXT_PUBLIC_MEDUSA_URL || "https://cah-assignment.onrender.com";

/**
 * Server-side proxy to Medusa backend.
 * Avoids CORS issues by making requests server-to-server.
 * Frontend calls /api/medusa/... which proxies to MEDUSA_URL/...
 */
async function proxy(req: NextRequest, path: string) {
  const url = `${MEDUSA_URL}/${path}`;

  // Forward relevant headers
  const headers: Record<string, string> = {};
  const contentType = req.headers.get("content-type");
  if (contentType) headers["content-type"] = contentType;

  const apiKey = req.headers.get("x-publishable-api-key");
  if (apiKey) headers["x-publishable-api-key"] = apiKey;

  const auth = req.headers.get("authorization");
  if (auth) headers["authorization"] = auth;

  let body: string | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.text();
  }

  try {
    const res = await fetch(url, {
      method: req.method,
      headers,
      body,
    });

    const data = await res.text();

    return new NextResponse(data, {
      status: res.status,
      headers: { "content-type": res.headers.get("content-type") || "application/json" },
    });
  } catch (err) {
    console.error("Medusa proxy error:", err);
    return NextResponse.json(
      { message: "Cannot reach the backend server. It may be starting up — please wait a moment and try again." },
      { status: 502 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxy(req, path.join("/"));
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxy(req, path.join("/"));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxy(req, path.join("/"));
}
