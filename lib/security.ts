import DOMPurify from "isomorphic-dompurify";

export const READER_SANITY_CONFIG = {
  ALLOWED_TAGS: [
    "p",
    "br",
    "b",
    "i",
    "em",
    "strong",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "center",
    "div",
    "span",
    "blockquote",
    "hr",
    "small",
    "ul",
    "ol",
    "li",
  ],
  ALLOWED_ATTR: ["style", "class", "id", "title"],
  ALLOWED_STYLE: ["text-align", "font-weight", "font-style", "text-decoration"],
};

export function sanitizeBookContent(content: string): string {
  return DOMPurify.sanitize(content, READER_SANITY_CONFIG);
}
