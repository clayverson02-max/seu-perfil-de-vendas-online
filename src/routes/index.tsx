import { createFileRoute } from "@tanstack/react-router";
import rawHtml from "../static/pagina.html?raw";
import carlosPhoto from "../../Captura de Tela 2026-11-02 às 12.05.23.png?url";
import lauraPhoto from "../../Captura de Tela 2026-11-02 às 12.04.37.png?url";
import andresPhoto from "../../Captura de Tela 2026-11-02 às 12.05.02.png?url";

const html = rawHtml
  .replaceAll("__FOTO_CARLOS__", carlosPhoto)
  .replaceAll("__FOTO_LAURA__", lauraPhoto)
  .replaceAll("__FOTO_ANDRES__", andresPhoto);

// Landing directa Destraba con fotografías importadas por Vite y relatos ilustrativos identificados.
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
