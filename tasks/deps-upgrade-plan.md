# Deps Upgrade Plan

## Goals
- Upgrade semua outdated deps ke latest
- Resolve 46 vuln (20 high, 22 moderate, 4 low)
- Handle breaking changes: `typescript` 5→6, `lucide-react` 0→1

## Target Deps

### Direct deps
- `astro`: 6.0.5 → 6.3.8
- `@astrojs/cloudflare`: 13.1.2 → 13.5.5
- `@payloadcms/richtext-lexical`: 3.79.1 → 3.85.0
- `next` + `@next/third-parties`: 16.1.7 → 16.2.6
- `react` / `react-dom`: 19.2.4 → 19.2.6
- `lucide-react`: 0.577.0 → 1.16.0 ⚠️ major
- `dayjs`: 1.11.20 → 1.11.21
- `tailwind-merge`: 3.5.0 → 3.6.0
- `tailwindcss` + `@tailwindcss/vite`: 4.2.1 → 4.3.0
- `@tailwindcss/typography`: ~0.5.19

### Dev deps
- `wrangler`: 4.74.0 → 4.95.0
- `@biomejs/biome`: 2.4.7 → 2.4.16
- `typescript`: 5.9.3 → 6.0.3 ⚠️ major
- `@types/react` + `@types/react-dom`: latest
- `@astrojs/check`: 0.9.8 → 0.9.9
- `@astrojs/ts-plugin`: 1.10.7 → 1.10.9

### Additional override untuk vuln yg belum ter-patch
- `h3`: ≥1.15.6
- `picomatch`: ≥2.3.4, ≥4.0.4
- `happy-dom`: ≥20.8.9
- `lodash`: ≥4.17.24
- `defu`: ≥6.1.5
- `vite`: ≥7.3.2
- `fast-uri`: ≥3.1.2
- `ws`: latest
- `uuid`: latest
- `postcss`: latest
- `yaml`: latest
- `smol-toml`: latest

## Workflow
1. `coder` — upgrade package.json via `ncu -u`, install, fix breaking changes
2. `reviewer` — review changes, run lint & build checks
3. User approves → PR ke main

## Acceptance Criteria
- [ ] All outdated deps upgraded to latest
- [ ] All 46 vuln resolved (audit shows 0)
- [ ] `astro check && astro build` passes
- [ ] No regressions in linting
