const firstName = 'Zulkarnaen';
const lastName = 'Ramdhani';

export const site = {
  name: `${firstName} ${lastName}`,
  firstName,
  lastName,
  researchTeam: 'Bayucaraka UAV Research Team',
  mascot: { src: '/images/decorations/rimuru.webp', width: 420, height: 309 },
  portrait: '/images/zulkarnaen-portrait.webp',
  profilePhoto: '/images/profile-gacor.webp',
  location: 'Surabaya, Indonesia',
  education: 'Informatics Engineering · ITS',
  introduction: 'I build full-stack web applications and integrate computer vision into UAV ground control systems.',
  about: 'I’m an Informatics Engineering student at Institut Teknologi Sepuluh Nopember (ITS). At Bayucaraka, I work on UAV ground control software. At ITS, I help students build a foundation in programming and data structures.',
  linkedinUrl: 'https://id.linkedin.com/in/zulkarnaenramdhani',
};

export const navigation = [
  { label: 'Work', href: '/#work' },
  { label: 'Profile', href: '/#profile' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Activities', href: '/#activities' },
];

export const specialties = [
  { label: 'Full-stack', tools: 'Next.js · Python' },
  { label: 'Computer vision', tools: 'YOLO · OpenCV' },
  { label: 'Cloud', tools: 'Azure · Docker' },
];
