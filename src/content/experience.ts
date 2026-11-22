type Experience = {
  role: string;
  organization: string;
  description: readonly string[];
  period: string;
};

export const experience: readonly Experience[] = [
  {
    role: 'Senior Programmer - Technology Development',
    organization: 'Bayucaraka ITS - Institut Teknologi Sepuluh Nopember',
    period: 'Jan 2025 - Present',
    description: [
      'Developing a multifunctional Ground Control Station (GCS) for UAV monitoring, control, and mission management.',
      'Integrating AI-powered object detection and cloud technologies into the GCS.',
      'Conducting system tests and resolving technical issues to ensure reliable and efficient operation during real-world UAV missions.',
    ],
  },
  {
    role: 'Assistant Bureau Personalia',
    organization: 'BEM FTEIC 2026/2027 - Institut Teknologi Sepuluh Nopember',
    period: 'Jan 2026 - Present',
    description: [
      'Mentored BEM FTEIC ITS staff, monitored their progress, and supported performance evaluations.',
      'Helped plan and run three Development Sessions, two Mentoring Sessions, and the Internalization program.',
      'Supported staff from recruitment through offboarding by helping organize Open Recruitment, Welcome Party, and Farewell Party.',
    ],
  },
  {
    role: 'Laboratory Administrator',
    organization: 'Algorithms and Programming Laboratory - Institut Teknologi Sepuluh Nopember',
    period: 'May 2026 - Present',
    description: [
      'Supported laboratory sessions by helping students understand fundamental concepts of algorithms and programming, developing learning materials, and monitoring student progress.',
      'Ensured smooth laboratory activities and actively participated in departmental events, including laboratory introductions, lab expos, and workshops.',
    ],
  },
  {
    role: 'Expert Staff – NPC (National Programming Contest)',
    organization: 'Schematics ITS 2026',
    period: 'Jun 2026 - Present',
    description: [
      'Monitored staff progress and reviewed the competitive programming problems they developed.',
      'Oversaw event operations and supported event administration, including technical meetings for participants.',
    ],
  },
  {
    role: 'Staff - NPC (National Programming Contest)',
    organization: 'Schematics ITS 2025 - Institut Teknologi Sepuluh Nopember',
    period: 'Mar 2025 - Oct 2025',
    description: [
      'Designed and validated competitive programming problems for NPC’s Junior and Senior divisions.',
      'Answered participants’ clarification requests and reviewed code submissions for correctness.',
    ],
  },
  {
    role: 'Mentor',
    organization: 'Inclenation 2025 - Institut Teknologi Sepuluh Nopember',
    period: 'Jun 2025 - Aug 2025',
    description: [
      'Mentored, recorded attendance, and supervised students throughout the duration of the event.',
      'Presented faculty orientation materials to students.',
    ],
  },
  {
    role: 'Staff - Data Management',
    organization: 'Inilho ITS x Forda Jombang - Jombang, Indonesia',
    period: 'Dec 2024 - Jan 2025',
    description: [
      'Managed participant records and coordinated communication between participants and the organizing committee.',
      'Visited schools to promote the event and encourage students to participate.',
    ],
  },
];
