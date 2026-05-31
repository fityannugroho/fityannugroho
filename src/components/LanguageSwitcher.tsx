import { LanguagesIcon } from "lucide-react";
import { navigate } from "astro:transitions/client";
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

export function LanguageSwitcher({ locale }: Props) {
  function handleChange(newLocale: string) {
    if (!supportedLocales.includes(newLocale as SupportedLocale)) return;

    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLocale);
    navigate(url.toString());
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
