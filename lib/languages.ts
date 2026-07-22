/**
 * Configuración de idiomas disponibles para descargas
 */

export interface LanguageConfig {
  code: string;
  name: string;
  label: string;
  flag: string;
  nativeName: string;
}

export const LANGUAGES: Record<string, LanguageConfig> = {
  ES: {
    code: 'es',
    name: 'Español',
    label: 'Español',
    flag: '🇪🇸',
    nativeName: 'Español',
  },
  EN: {
    code: 'en',
    name: 'English',
    label: 'English',
    flag: '🇺🇸',
    nativeName: 'English',
  },
};

export const DEFAULT_DOWNLOAD_LANGUAGE = 'es';
export const DOWNLOAD_LANGUAGE_STORAGE_KEY = 'app_download_language';

/**
 * Obtener objeto de lenguaje por código
 */
export function getLanguageByCode(code: string): LanguageConfig | null {
  return Object.values(LANGUAGES).find((lang) => lang.code === code) || null;
}

/**
 * Validar si código de idioma es válido
 */
export function isValidLanguageCode(code: string): boolean {
  return Object.values(LANGUAGES).some((lang) => lang.code === code);
}

/**
 * Obtener todos los códigos de idioma disponibles
 */
export function getAvailableLanguageCodes(): string[] {
  return Object.values(LANGUAGES).map((lang) => lang.code);
}
