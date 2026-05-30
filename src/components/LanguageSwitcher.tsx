import { LanguagesIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  localeLabels,
  type SupportedLocale,
  supportedLocales,
} from "@/lib/i18n";

type Props = {
  locale: SupportedLocale;
};

export function LanguageSwitcher({ locale: initialLocale }: Props) {
  const [locale, setLocale] = useState<SupportedLocale>(initialLocale);
  const [isLoading, setIsLoading] = useState(false);

  async function handleChange(newLocale: string) {
    if (!supportedLocales.includes(newLocale as SupportedLocale)) return;

    setLocale(newLocale as SupportedLocale);
    setIsLoading(true);

    try {
      const res = await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: newLocale }),
      });

      if (!res.ok) {
        throw new Error(`Failed to set locale: ${res.status}`);
      }

      window.location.assign(window.location.href);
    } catch (error) {
      console.warn(error);
      alert("Failed to switch language. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoading}>
        <Button variant="ghost" size="icon">
          <LanguagesIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={locale} onValueChange={handleChange}>
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
