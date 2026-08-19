import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks and remove malicious scripts/styles.
 * Strictly strips script tags, iframe, object, embed, inline event handlers, and dangerous URIs.
 */
export function sanitizeBookContent(dirtyHtml: string): string {
  if (!dirtyHtml) return '';

  try {
    if (typeof DOMPurify?.sanitize === 'function') {
      return DOMPurify.sanitize(dirtyHtml, {
        ALLOWED_TAGS: [
          'p',
          'br',
          'b',
          'i',
          'em',
          'strong',
          'a',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'ul',
          'ol',
          'li',
          'blockquote',
          'span',
          'div',
          'img',
          'table',
          'tr',
          'td',
          'th',
          'tbody',
          'thead',
          'hr',
        ],
        ALLOWED_ATTR: ['href', 'title', 'alt', 'src', 'class', 'id', 'target', 'rel'],
        ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
        ADD_ATTR: ['target'],
        FORCE_BODY: true,
      });
    }
  } catch {
    // Node environment fallback
  }

  return dirtyHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:[^"']*/gi, '');
}

/**
 * Sanitize plain text or user notes.
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  try {
    if (typeof DOMPurify?.sanitize === 'function') {
      return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
    }
  } catch {
    // Node environment fallback
  }
  return text.replace(/<[^>]*>?/gm, '');
}
