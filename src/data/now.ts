/**
 * The /now page and the homepage "Currently" block.
 * Update the text and `lastUpdated` whenever things change — no redesign needed.
 * Items marked `placeholder: true` are shown with a "to be updated" label.
 */

export const now = {
  lastUpdated: "2026-10-11",
  // Homepage notebook entry. Keep it short.
  currently: [
    { label: "Learning", value: "Electrical engineering fundamentals and programming." },
    { label: "Exploring", value: "AI and its applications in engineering." },
    { label: "Based in", value: "Melbourne, Australia." },
    { label: "Working on", value: "Personal projects and this website." },
  ],
  sections: [
    {
      title: "What I'm learning",
      items: [
        { text: "Electrical engineering fundamentals and programming, alongside Foundation Studies (Science stream)." },
        { text: "Specific topics or courses to be added.", placeholder: true },
      ],
    },
    {
      title: "What I'm building",
      items: [
        { text: "This website — the place where projects, writing and notes will live." },
        { text: "Next project to be confirmed.", placeholder: true },
      ],
    },
    {
      title: "What I'm reading or exploring",
      items: [{ text: "Books, papers or topics to be added.", placeholder: true }],
    },
    {
      title: "Outside study",
      items: [{ text: "Drawing, photography, football — details to be added.", placeholder: true }],
    },
    {
      title: "What I want to try next",
      items: [{ text: "To be added.", placeholder: true }],
    },
  ],
};
