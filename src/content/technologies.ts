type Technology = {
  name: string;
  logo: string;
  invertLogo?: boolean;
};

export const technologies: readonly Technology[] = [
  { name: 'C', logo: '/images/technologies/c.svg' },
  { name: 'C++', logo: '/images/technologies/cplusplus.svg' },
  { name: 'Python', logo: '/images/technologies/python.svg' },
  { name: 'YOLO', logo: '/images/technologies/yolo.png' },
  { name: 'OpenCV', logo: '/images/technologies/opencv.svg' },
  { name: 'Next.js', logo: '/images/technologies/nextjs.svg' },
  { name: 'Flask', logo: '/images/technologies/flask.svg', invertLogo: true },
  { name: 'FastAPI', logo: '/images/technologies/fastapi.svg' },
  { name: 'PostgreSQL', logo: '/images/technologies/postgresql.svg' },
  { name: 'SQL', logo: '/images/technologies/sql.svg' },
];
