import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const originalUrl = searchParams.get('url');

  if (!originalUrl) {
    return NextResponse.json({ error: 'URL required' }, { status: 400 });
  }

  // Extract Book ID from Gutenberg URL if possible to use mirrors
  const bookIdMatch = originalUrl.match(/gutenberg\.org\/.*\/(\d+)/);
  const bookId = bookIdMatch ? bookIdMatch[1] : null;

  // List of candidate URLs to try
  let candidates = [originalUrl];

  if (bookId) {
    candidates = [
      `https://aleph.gutenberg.org/${bookId.slice(0, 1)}/${bookId}/${bookId}-h/${bookId}-h.htm`,
      originalUrl,
      `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`,
      `https://archive.org/download/pg${bookId}/pg${bookId}-images.html`,
    ];
  }

  console.log(`[Proxy] Starting connection race for Book ID: ${bookId || 'Unknown'}`);

  for (const url of candidates) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const text = await response.text();
        return new NextResponse(text, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    } catch (err) {
      console.warn(`[Proxy] Failed ${url}:`, err);
    }
  }

  return NextResponse.json(
    { error: 'Failed to fetch book content from all mirrors' },
    { status: 502 }
  );
}
