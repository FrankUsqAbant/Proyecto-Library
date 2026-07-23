jest.mock('isomorphic-dompurify', () => ({
  __esModule: true,
  default: {
    sanitize: (html: string, options?: { ALLOWED_TAGS?: string[] }) => {
      if (!html) return '';
      if (options && options.ALLOWED_TAGS && options.ALLOWED_TAGS.length === 0) {
        return html.replace(/<[^>]*>?/gm, '');
      }
      return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/on\w+="[^"]*"/gi, '')
        .replace(/on\w+='[^']*'/gi, '')
        .replace(/javascript:[^"']*/gi, '');
    },
  },
}));

import { sanitizeBookContent, sanitizeText } from '../lib/security/sanitize';

describe('Security & XSS Sanitization Suite', () => {
  it('should remove malicious script tags from HTML content', () => {
    const maliciousHtml =
      '<div><h1>Don Quijote</h1><script>alert("XSS Attack!");</script><p>Capítulo 1</p></div>';
    const cleanHtml = sanitizeBookContent(maliciousHtml);
    expect(cleanHtml).not.toContain('<script>');
    expect(cleanHtml).not.toContain('alert');
    expect(cleanHtml).toContain('Don Quijote');
    expect(cleanHtml).toContain('Capítulo 1');
  });

  it('should strip inline event handlers like onerror and onload', () => {
    const maliciousHtml =
      '<img src="invalid.jpg" onerror="alert(1)" /><a href="#" onclick="doBadThing()">Click</a>';
    const cleanHtml = sanitizeBookContent(maliciousHtml);
    expect(cleanHtml).not.toContain('onerror');
    expect(cleanHtml).not.toContain('onclick');
    expect(cleanHtml).not.toContain('alert');
  });

  it('should strip dangerous iframes and javascript: URLs', () => {
    const maliciousHtml =
      '<iframe src="http://evil.com"></iframe><a href="javascript:stealCookies()">Link</a>';
    const cleanHtml = sanitizeBookContent(maliciousHtml);
    expect(cleanHtml).not.toContain('<iframe');
    expect(cleanHtml).not.toContain('javascript:stealCookies');
  });

  it('should preserve safe formatting tags like p, em, strong, h1, h2', () => {
    const safeHtml =
      '<article><h1>Título</h1><p>Texto <strong>negrita</strong> y <em>cursiva</em>.</p></article>';
    const cleanHtml = sanitizeBookContent(safeHtml);
    expect(cleanHtml).toContain('<h1>Título</h1>');
    expect(cleanHtml).toContain('<strong>negrita</strong>');
    expect(cleanHtml).toContain('<em>cursiva</em>');
  });

  it('should sanitize plain text correctly with sanitizeText', () => {
    const dirtyText = '<script>alert("text")</script>Hello World';
    const cleanText = sanitizeText(dirtyText);
    expect(cleanText).not.toContain('<script>');
    expect(cleanText).toContain('Hello World');
  });
});
