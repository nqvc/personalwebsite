---
title: Why I'm Building This Website
subtitle: A place to keep the work, and the thinking behind it.
summary: Not a portfolio in the polished sense — more a notebook that happens to be public. What this site is for, how it's organised, and how it's built.
category: personal-notes
tags: [meta, web, writing]
date: 2026-10-04
featured: true
toc: true
relatedProjects: [python-tools-and-web]
---

Most of what I learn disappears. A project gets finished, or abandoned, and the reasoning behind it goes with it. This website is an attempt to keep some of that.

## What this is for

It isn't meant to be a list of achievements. It's meant to hold:

- **Projects**, with the process and the limitations, not just the result.
- **Writing**, when an idea needs more than a paragraph.
- **Notes**, for things that are half-formed — which is most things.
- **Photographs and drawings**, because not everything worth noticing is technical.

## How it's organised

Every project page says what stage it is at: an idea, a proposal, a working prototype, or something finished. I'd rather a page say *"to be added"* than claim something that isn't true.

The notes have their own labels — *seed*, *growing* and *evergreen* — borrowed from the idea of a "digital garden": publish early, revise in place.

## How it's built

The site is built with Next.js and TypeScript. Each post is a Markdown file with a short header of metadata:

```yaml
title: Why I'm Building This Website
category: personal-notes
date: 2026-10-04
draft: false
```

Pages are generated ahead of time from those files, so there's no database to look after. Adding a post means adding a file.

### Things I deliberately left out

No pop-ups, no newsletter box, no tracking scripts, no animations that get in the way of reading.

## What happens next

> [!PLACEHOLDER]
> Add your own closing thoughts here — what you hope this site becomes.
