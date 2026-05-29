import { LanguagesIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  defaultLocale,
  localeLabels,
  supportedLocales,
  type SupportedLocale,
} from "@/lib/i18n";

type Props = {
  /**
   * Initial locale value. If omitted, it will be fetched from `/api/locale` on mount.
   */
  locale: SupportedLocale | undefined;
};

export function LanguageSwitcher({ locale: initialLocale }: Props) {
  const [locale, setLocale] = useState<SupportedLocale>(
    initialLocale || defaultLocale,
  );

  useEffect(() => {
    if (!initialLocale) {
      fetch("/api/locale")
        .then((res) => res.json() as Promise<{ locale: string }>)
        .then((data) => {
          if (supportedLocales.includes(data.locale as SupportedLocale)) {
            setLocale(data.locale as SupportedLocale);
          }
        })
        .catch(() => console.warn("Failed to fetch locale"));
    }
  }, [initialLocale]);

  async function handleChange(newLocale: string) {
    if (!supportedLocales.includes(newLocale as SupportedLocale)) return;

    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: newLocale }),
    });

    window.location.reload();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <LanguagesIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={handleChange}
        >
          {supportedLocales.map((loc) => (
            <DropdownMenuRadioItem key={loc} value={loc}>
              {localeLabels[loc].label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
