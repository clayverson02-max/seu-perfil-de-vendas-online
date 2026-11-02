import { createFileRoute } from "@tanstack/react-router";
import rawHtml from "../static/pagina.html?raw";


const html = rawHtml
  .replaceAll("__FOTO_CARLOS__", "/img/historia-carlos.png")
  .replaceAll("__FOTO_LAURA__", "/img/historia-laura.png")
  .replaceAll("__FOTO_ANDRES__", "/img/historia-andres.png")
  .replaceAll("__DOLOR_LUMBAR__", "/img/dolor-lumbar.png")
  .replaceAll("__DOLOR_ESPALDA__", "/img/dolor-espalda.png")
  .replaceAll("__QUIROPRAXIA__", "/img/atencion-presencial.png");

// Landing directa Destraba con fotografías servidas desde public/img y relatos ilustrativos identificados.
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
