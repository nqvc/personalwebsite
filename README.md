# Hasan Busalih — personal website

An engineer's notebook, an independent magazine and a personal archive in one site. It holds projects, writing, a digital garden of notes, a visual archive, an About page, a Now page and a contact page.

Built with **Next.js (App Router) + TypeScript**. Content lives in plain **Markdown files** and small **TypeScript data files**. Styles are hand-written CSS with design tokens (`src/app/globals.css`). Every page is generated ahead of time, so the site needs no database, CMS or backend.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000, drafts visible
npm run build      # production build, drafts hidden
npm start
npm run typecheck
```

Set `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.com`) in production. Canonical URLs, the sitemap, RSS and Open Graph previews all use it. The site deploys to Vercel as-is, or to any host that runs `next start`.

## Where things live

| What | Where |
| --- | --- |
| Name, profile links (GitHub, LinkedIn, email), navigation, categories | `src/data/site.ts` |
| Articles | `content/writing/*.md` |
| Projects (case studies) | `content/projects/*.md` |
| Notes (digital garden) | `content/notes/*.md` |
| Now page and the homepage "Currently" block | `src/data/now.ts` |
| Experience archive | `src/data/experience.ts` |
| Education timeline and interests (About) | `src/data/about.ts` |
| Gallery | `src/data/gallery.ts` + images in `public/images/gallery/` |
| Images for posts and projects | `public/images/...` |

## Adding content

### A new article

1. Copy `content/writing/_template.md` to `content/writing/my-post-title.md`. The file name becomes the URL (`/writing/my-post-title`).
2. Fill in the front matter: `title`, `summary`, `category`, `date`, `tags`, and optionally `image`/`imageAlt`, `featured`, `toc`, `related`, `relatedProjects`.
3. Write the body in Markdown. You can use headings, lists, quotes, tables, code blocks with a language (```` ```python ````) for syntax highlighting, and footnotes (`[^1]`). An image with a title becomes a captioned figure: `![alt](/images/x.jpg "Caption")`.
4. Keep `draft: true` while writing. Drafts show in `npm run dev` and stay out of production builds, the sitemap and RSS. Set it to `false` to publish.

Reading time, the table of contents, related posts, previous/next links, search, the archive, RSS and the share image are all generated for you.

Categories: `engineering-technology`, `personal-notes`, `art-interpretation`, `places-experiences`, `ideas-perspectives`, `outside-the-classroom`.

### A new project

Copy one of the files in `content/projects/`. Useful fields:

- `status`: `idea | proposed | research | prototype | ongoing | complete | paused`. Choose honestly.
- `category`: `engineering | software | research | creative`
- `year`, `order` (position in lists), `featured` (whether it appears on About)
- `image` / `imageAlt`. Leave `image` empty to use the built-in line illustration named by `visual` (`tracker`, `irrigation`, `code`, `carbon`, `sketch`). Every illustration is labelled as an illustration.
- `specs`: label/value/note rows. A value starting with "To be added" is shown as a placeholder.
- `tools`, `gallery` (`src`, `alt`, `caption`, `ratio`), `references` (`label`, `href`), `links`, `relatedPosts`

The homepage "Selected work" shows the projects whose slugs are listed in `FEATURED_PROJECTS` in `src/app/page.tsx`.

### Callouts: marking the status of a statement

Inside any Markdown body:

```markdown
> [!RESULT]
> What was measured, how, and against what baseline.
```

The available markers are `PROPOSED`, `PROTOTYPE`, `RESULT`, `FUTURE`, `PLACEHOLDER` and `NOTE`. Use them to keep ideas, prototypes, measured results and future plans clearly apart.

### A note

Copy `content/notes/_template.md`. Set `status` to `seed`, `growing` or `evergreen`, add `tags`, and link related posts or projects if you want. A note only needs a few sentences.

### Photos

Put the file in `public/images/gallery/`, then add an entry to `src/data/gallery.ts` with `src`, the original `width` and `height` (this keeps the proportions), a real `alt` description, a `caption`, an optional `date`, and a `collection`. Remove the placeholder entries as real photos replace them.

## Information still needed from Hasan

The site invents nothing. Wherever information is missing it shows a dotted-underlined or "Placeholder" label. Still to supply:

- Email address and LinkedIn URL (`src/data/site.ts`)
- Project years, components, setup, measurements and references, especially the experimental context for the solar tracker's reported "up to 40%" improvement
- The Python tools themselves, and whether their code can be published
- Dates, organisations and roles for each experience entry. Set `confirmed: true` once each one is checked.
- Personal text in the sample articles (marked with `[!PLACEHOLDER]` callouts) and the dates of those articles
- Photographs, drawings and a portrait
- Now page items (`src/data/now.ts`)

## Features

- Light and dark themes. The choice is stored in `localStorage`, and the system preference is used until one is made. No flash on load.
- Site-wide search (button, <kbd>Ctrl/⌘ K</kbd> or <kbd>/</kbd>) across writing, projects and notes, from a static `/search.json` index
- Filters you can link to: `/writing?category=…&q=…`, `/projects?category=…`, `/notes?status=…`, `/gallery?collection=…`
- Grid and list views for projects
- Accessible lightbox with keyboard arrows, Esc, a visible close button and swipe
- Reading-progress bar, table of contents, copy-link/share and footnotes on articles
- SEO: per-page titles, descriptions and canonicals, Open Graph and Twitter cards, generated OG images, JSON-LD, `sitemap.xml`, `robots.txt` and `feed.xml`
- Accessibility: semantic landmarks, a skip link, visible focus styles, keyboard-operable menus and dialogs, and support for reduced motion. All content stays visible without JavaScript.
