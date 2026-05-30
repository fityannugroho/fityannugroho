import type { AstroCookies } from "astro";

export const supportedLocales = ["en", "id"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "en";

export const localeLabels: Record<
  SupportedLocale,
  { label: string; shortLabel: string }
> = {
  en: { label: "English", shortLabel: "EN" },
  id: { label: "Bahasa Indonesia", shortLabel: "ID" },
};

export function isSupportedLocale(
  locale: string | null,
): locale is SupportedLocale {
  return (
    locale !== null && supportedLocales.includes(locale as SupportedLocale)
  );
}

export function readLocale(url: URL, cookies: AstroCookies): SupportedLocale {
  const queryLocale = url.searchParams.get("lang");
  if (isSupportedLocale(queryLocale)) {
    cookies.set("locale", queryLocale, {
      path: "/",
      maxAge: 365 * 86400,
      sameSite: "lax",
      secure: import.meta.env.PROD,
    });
    return queryLocale;
  }

  const rawLocale = cookies.get("locale")?.value ?? null;
  return isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
}
