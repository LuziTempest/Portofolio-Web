import { site } from './site';

export const activities = [
  {
    area: 'UAV research',
    title: 'Ground station development',
    description: `Build map-based tracking and mission controls with the ${site.researchTeam}.`,
  },
  {
    area: 'Flight testing',
    title: 'Mission software testing',
    description: 'Test ground station software during UAV missions and help prepare flight setups.',
  },
  {
    area: 'Robotics',
    title: 'UAV video streaming',
    description: 'Develop and test object detection models for live UAV footage and configure the Microsoft Azure deployment.',
  },
  {
    area: 'Teaching',
    title: 'Programming labs',
    description: 'Help ITS students practice programming and work through data structures in lab sessions.',
  },
  {
    area: 'Lab support',
    title: 'Learning materials and workshops',
    description: 'Prepare learning materials and help run lab sessions and workshops with the Algorithms and Programming Laboratory.',
  },
  {
    area: 'Competitive programming',
    title: 'Problem setting and review',
    description: 'Write, validate, and review problems for the junior and senior divisions of the National Programming Contest.',
  },
];

type ActivityPhoto = {
  src: string;
  caption: string;
  alt: string;
  portrait?: boolean;
};

const activityImages = '/images/activities';

export const activityPhotos: readonly ActivityPhoto[] = [
  {
    src: `${activityImages}/krti-2026-awards.webp`,
    caption: 'KRTI 2026 Final Awards',
    alt: 'Team members posing together at the KRTI 2026 awards ceremony',
  },
  {
    src: `${activityImages}/gerigi-ukm-expo-2026.webp`,
    caption: 'Gerigi × UKM Expo 2026 Exhibition',
    alt: 'Team members carrying aircraft models at the outdoor exhibition',
  },
  {
    src: `${activityImages}/programming-lab-session.webp`,
    caption: 'Supervising a Lab Session',
    alt: 'Students working on laptops during a lab session',
  },
  {
    src: `${activityImages}/krti-2026-field-duty.webp`,
    caption: 'On Duty at KRTI 2026',
    alt: 'An operator in safety gear using a laptop at the KRTI field site',
  },
  {
    src: `${activityImages}/krti-2026-on-site.webp`,
    caption: 'Field Duty at KRTI 2026',
    alt: 'An operator in a helmet and orange vest at the KRTI field site',
  },
  {
    src: `${activityImages}/bayucaraka-internship-final-projects.webp`,
    caption: 'Testing Bayucaraka Internship Final Projects',
    alt: 'Bayucaraka internship participants during a final project session',
  },
  {
    src: `${activityImages}/hmmg-itb-benchmarking.webp`,
    caption: 'Benchmarking with HMMG ITB',
    alt: 'Participants in yellow jackets posing at ITB',
    portrait: true,
  },
  {
    src: `${activityImages}/tmmin-company-visit.webp`,
    caption: 'Company Visit to TMMIN',
    alt: 'Visitors in blue jackets posing together at TMMIN',
    portrait: true,
  },
  {
    src: `${activityImages}/staff-development.webp`,
    caption: 'Staff Development Session',
    alt: 'Staff members gathered for a group photo in an auditorium',
  },
  {
    src: `${activityImages}/team-succession-briefing.webp`,
    caption: 'Team Succession Briefing',
    alt: 'Participants gathered outside a building after the briefing',
    portrait: true,
  },
  {
    src: `${activityImages}/laboratory-welcome-party.webp`,
    caption: 'Laboratory Welcome Party',
    alt: 'Lab members posing at the Algorithms and Programming Laboratory',
  },
  {
    src: `${activityImages}/laboratory-badminton.webp`,
    caption: 'Badminton with Lab Friends',
    alt: 'Friends from the lab gathered on an indoor badminton court',
    portrait: true,
  },
  {
    src: `${activityImages}/fun-run-5k.webp`,
    caption: '5K Fun Run',
    alt: 'A runner on a tree-lined path during the fun run',
    portrait: true,
  },
  {
    src: `${activityImages}/team-support.webp`,
    caption: 'Cheering on the Team',
    alt: 'Supporters holding flags in an indoor venue',
    portrait: true,
  },
  {
    src: `${activityImages}/team-support-night.webp`,
    caption: 'Cheering on the Team at Night',
    alt: 'Supporters posing beside flags after dark',
  },
];
