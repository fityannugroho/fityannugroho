export type Project = {
  name: string;
  description?: string;
  links: {
    site?: string;
    download?: string;
    code?: string;
  };
};

const projects: readonly Project[] = [
  {
    name: "idn-area",
    description:
      "API that provides information about provinces, regencies, districts, villages, and islands in Indonesia 🇮🇩",
    links: {
      site: "https://idn-area.up.railway.app",
      code: "https://github.com/fityannugroho/idn-area",
    },
  },
  {
    name: "idn-area-map",
    description:
      "Interactive map to explore provinces, regencies, districts, village, and islands in Indonesia 🇮🇩",
    links: {
      site: "https://idn-area-map.vercel.app",
      code: "https://github.com/fityannugroho/idn-area-map",
    },
  },
  {
    name: "Wisely",
    description: "Obfuscating text or phrases with random uncommon characters.",
    links: {
      site: "https://wisely.vercel.app",
      code: "https://github.com/fityannugroho/wisely",
    },
  },
  {
    name: "img-dl",
    description: "Download image(s), by command or programmatically.",
    links: {
      site: "https://npmjs.org/package/img-dl",
      code: "https://github.com/fityannugroho/img-dl",
    },
  },
  {
    name: "idn-area-data",
    links: {
      site: "https://npmjs.org/package/idn-area-data",
      code: "https://github.com/fityannugroho/idn-area-data",
    },
  },
  {
    name: "FastVoting",
    description: "Progressive web app to create and manage voting events.",
    links: {
      site: "https://fastvoting.online",
      code: "https://github.com/fityannugroho/fastvoting",
    },
  },
  {
    name: "Fresto",
    description:
      "Progressive web app that provide restaurant list, built without any framework.",
    links: {
      site: "https://fresto.netlify.app",
      code: "https://github.com/fityannugroho/restaurant-apps",
    },
  },
  {
    name: "Lister",
    description:
      "Android app to take note of to-do lists, and share them with other users.",
    links: {
      download:
        "https://github.com/fityannugroho/lister/releases/download/v1.0.0/app-release.apk",
      code: "https://github.com/fityannugroho/lister",
    },
  },
  {
    name: "Nest.js + fastify template",
    links: {
      code: "https://github.com/fityannugroho/nestjs-fastify-boilerplate",
    },
  },
  {
    name: "Open Music API",
    links: {
      code: "https://github.com/fityannugroho/openmusic-api",
    },
  },
] as const;

export default projects;
