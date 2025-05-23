import { IconLink } from "@/components/Link.tsx";
import XLogoIcon from "@/components/icons/XIcon";
import { MailIcon } from "lucide-react";
import GithubIcon from "./icons/GithubIcon";
import InstagramIcon from "./icons/InstagramIcon";
import LinkedinIcon from "./icons/LinkedinIcon";

export function Hero() {
  return (
    <section className="container lg:max-w-[64rem] flex flex-col md:flex-row-reverse gap-8 items-center md:justify-around py-24 md:py-32 lg:py-48">
      {/* Column 1 */}
      <div className="basis-1/2 md:basis-1/4 flex justify-center items-center">
        <img
          src="/profile.webp"
          alt="Fityandhiya Islam Nugroho"
          className="rounded-full w-40 h-40 lg:w-48 lg:h-48"
          loading="eager"
        />
      </div>
      {/* Column 2 */}
      <div className="basis-1/2 md:basis-3/4 ">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left">
          <span className="text-primary">Fityan</span>dhiya Islam{" "}
          <span className="text-primary">Nugroho</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-center md:text-left mt-4">
          Software Engineer
        </h2>
        <div className="flex gap-2 justify-center md:justify-start mt-6">
          <IconLink
            href="https://github.com/fityannugroho"
            variant="outline"
            target="_blank"
            label="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </IconLink>
          <IconLink
            href="https://www.linkedin.com/in/fityannugroho"
            variant="outline"
            target="_blank"
            label="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5" />
          </IconLink>
          <IconLink
            href="https://twitter.com/fityannugroho"
            variant="outline"
            target="_blank"
            label="Twitter"
          >
            <XLogoIcon className="w-4 h-4" />
          </IconLink>
          <IconLink
            href="https://www.instagram.com/fityannugroho"
            variant="outline"
            target="_blank"
            label="Instagram"
          >
            <InstagramIcon className="w-5 h-5" />
          </IconLink>
          <IconLink
            href="mailto:fityannugroho@gmail.com"
            variant="outline"
            label="Email"
          >
            <MailIcon className="w-5 h-5" />
          </IconLink>
        </div>
      </div>
    </section>
  );
}
