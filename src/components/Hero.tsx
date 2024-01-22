import { IconLink } from "@/components/Link.tsx";
import XLogoIcon from "@/components/XLogoIcon";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

export function Hero() {
  return (
    <div className="container flex flex-col md:flex-row-reverse gap-8 items-center justify-center md:justify-around py-8">
      {/* Column 1 */}
      <div>
        <img
          src="profile.png"
          alt="Fityandhiya Islam Nugroho"
          className="rounded-full w-32 h-32"
        />
      </div>
      {/* Column 2 */}
      <div>
        <h1 className="text-2xl mb-2 font-bold md:text-4xl text-center md:text-left">
          <span className="text-primary">Fityan</span>dhiya Islam
          <span className="text-primary">Nugroho</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-center md:text-left mb-4">
          Software Engineer
        </h2>
        <div className="flex gap-2 justify-center md:justify-start">
          <IconLink
            href="https://github.com/fityannugroho"
            variant="outline"
            target="_blank"
            label="GitHub"
          >
            <GitHubLogoIcon className="w-5 h-5" />
          </IconLink>
          <IconLink
            href="https://www.linkedin.com/in/fityannugroho"
            variant="outline"
            target="_blank"
            label="LinkedIn"
          >
            <LinkedInLogoIcon className="w-5 h-5" />
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
            <InstagramLogoIcon className="w-5 h-5" />
          </IconLink>
          <IconLink
            href="mailto:fityannugroho@gmail.com"
            variant="outline"
            label="Email"
          >
            <EnvelopeClosedIcon className="w-5 h-5" />
          </IconLink>
        </div>
      </div>
    </div>
  );
}
