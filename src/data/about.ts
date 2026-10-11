/**
 * Education timeline for the About page.
 * status: "completed" | "current" | "intended" — intended study is always
 * labelled separately from completed qualifications and current enrolment.
 */

export type TimelineEntry = {
  period: string;
  title: string;
  place: string;
  status: "completed" | "current" | "intended";
  description: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "Before 2026",
    title: "Secondary schooling",
    place: "Saudi Arabia",
    status: "completed",
    description:
      "School years in Saudi Arabia, where the solar tracker and irrigation research began. School name and details to be added.",
  },
  {
    period: "2026",
    title: "Foundation Studies — Science stream",
    place: "Trinity College, Melbourne",
    status: "current",
    description: "A pathway year in Melbourne focused on science and mathematics.",
  },
  {
    period: "Planned",
    title: "Undergraduate study — engineering pathway",
    place: "The University of Melbourne",
    status: "intended",
    description: "Intended next step, subject to confirmed enrolment.",
  },
];

export const timelineStatusLabel = {
  completed: "Completed",
  current: "Current",
  intended: "Intended — not yet confirmed",
};

export const interests = {
  technical: ["Electrical engineering", "Artificial intelligence", "Programming", "Physics", "Robotics", "Renewable energy"],
  creative: ["Drawing", "Art interpretation", "Photography", "Design"],
  ideas: ["Philosophy", "Psychology", "History", "Human behaviour"],
  elsewhere: ["Football — FC Barcelona, and Messi in particular"],
};
