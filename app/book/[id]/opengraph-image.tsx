import { ImageResponse } from "next/og";
import { fetchBookById, ESSENTIAL_BOOKS } from "@/lib/api";

export const dynamic = "force-static";
export const alt = "Leer es Pensar | Biblioteca Digital Zen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return ESSENTIAL_BOOKS.map((book) => ({
    id: encodeURIComponent(book.id),
  }));
}

export default async function Image({ params }: { params: { id: string } }) {
  const { id } = await params;
  const book = await fetchBookById(id);
  const author = book?.authors[0]?.name || "Autor desconocido";

  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(to bottom right, #fdfcf7, #f5f5f4)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "serif",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            background: "#18181b",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "50px" }}>📖</span>
        </div>
      </div>

      <h1
        style={{
          fontSize: "72px",
          fontWeight: "bold",
          color: "#1c1917",
          textAlign: "center",
          marginBottom: "20px",
          lineHeight: 1.1,
        }}
      >
        {book?.title}
      </h1>

      <p
        style={{
          fontSize: "36px",
          color: "#7c3aed",
          fontStyle: "italic",
          marginBottom: "40px",
        }}
      >
        por {author}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#7c3aed",
          color: "white",
          padding: "12px 32px",
          borderRadius: "50px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Leer ahora en leerespensar.com
      </div>
    </div>,
    { ...size },
  );
}
