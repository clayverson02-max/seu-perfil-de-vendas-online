import { createFileRoute } from "@tanstack/react-router";
import html from "../static/pagina.html?raw";

// Página B (Destraba): HTML estático servido tal cual, con pixel, UTMify y Clarity.
export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () =>
        new Response(html, {
          headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=60" },
        }),
    },
  },
});
