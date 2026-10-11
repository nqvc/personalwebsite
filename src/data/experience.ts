/**
 * Experience archive (/about/experience).
 *
 * Every field is editable. Set `confirmed: true` only once dates, titles and
 * details have been checked. Unconfirmed entries are shown with a
 * "details to confirm" label so nothing reads as a fabricated credential.
 */

export type ExperienceKind = "award" | "programme" | "participation" | "project" | "volunteering" | "leadership" | "sport";

export const experienceKinds: Record<ExperienceKind, string> = {
  award: "Awards",
  programme: "Programmes",
  participation: "Research & competitions",
  leadership: "Leadership",
  volunteering: "Teaching & volunteering",
  project: "Projects",
  sport: "Sport",
};

export type Experience = {
  title: string;
  organisation: string;
  role: string;
  kind: ExperienceKind;
  /** Free text: "2023", "2022–2024". Leave empty if unknown. */
  dates: string;
  description: string;
  evidence?: { label: string; href: string }[];
  confirmed: boolean;
};

export const experiences: Experience[] = [
  {
    title: "Mawhiba enrichment programme",
    organisation: "Mawhiba (King Abdulaziz & His Companions Foundation for Giftedness & Creativity)",
    role: "Participant",
    kind: "programme",
    dates: "",
    description: "Enrichment programme participation. Programme name, year and focus to be added.",
    confirmed: false,
  },
  {
    title: "Aramco Tomooh",
    organisation: "Saudi Aramco",
    role: "Participant",
    kind: "programme",
    dates: "",
    description: "Participation in the Tomooh programme. Dates and details to be added.",
    confirmed: false,
  },
  {
    title: "Research and science-fair participation",
    organisation: "To be added",
    role: "Student researcher",
    kind: "participation",
    dates: "",
    description:
      "Research projects including the sunflower-inspired solar tracker and smart irrigation for wheat. Which events, and any outcomes, to be added. Move to “Awards” only if an award was received.",
    confirmed: false,
  },
  {
    title: "Model United Nations",
    organisation: "To be added",
    role: "Delegate (role to be confirmed)",
    kind: "leadership",
    dates: "",
    description: "Conferences attended, committees and responsibilities to be added.",
    confirmed: false,
  },
  {
    title: "Tutoring and educational support",
    organisation: "To be added",
    role: "Tutor",
    kind: "volunteering",
    dates: "",
    description: "Subjects, students supported and setting to be added.",
    confirmed: false,
  },
  {
    title: "Community volunteering",
    organisation: "To be added",
    role: "Volunteer",
    kind: "volunteering",
    dates: "",
    description: "Organisations and activities to be added.",
    confirmed: false,
  },
  {
    title: "Martial arts",
    organisation: "To be added",
    role: "Athlete",
    kind: "sport",
    dates: "",
    description: "Discipline, level and any achievements to be added.",
    confirmed: false,
  },
  {
    title: "Football",
    organisation: "To be added",
    role: "Player",
    kind: "sport",
    dates: "",
    description: "Teams and any achievements to be added.",
    confirmed: false,
  },
];
