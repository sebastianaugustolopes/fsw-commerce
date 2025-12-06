import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/lib/auth";

const { GET, POST } = toNextJsHandler(auth.handler);

// Add CORS headers
const addCorsHeaders = (response: Response) => {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  return response;
};

export async function GET(request: Request) {
  const response = await GET(request);
  return addCorsHeaders(response);
}

export async function POST(request: Request) {
  const response = await POST(request);
  return addCorsHeaders(response);
}

export async function OPTIONS() {
  return addCorsHeaders(new Response(null, { status: 200 }));
}
