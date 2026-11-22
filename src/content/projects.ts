type Artwork = {
  src: string;
  width: number;
  height: number;
};

export type ProjectImage = Artwork & {
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  language: 'en' | 'id';
  technologies: readonly string[];
  cover: ProjectImage;
  gallery: readonly ProjectImage[];
  logo?: Artwork & { alt?: string; tone?: 'dark' };
  aircraft?: readonly Artwork[];
};

const gcsImages = '/images/projects/ground-control-station';
const streamingImages = '/images/projects/uav-video-streaming';
const cevioImages = '/images/projects/cevio';

export const featuredProject = {
  slug: 'ground-control-station',
  title: 'Software Ground Control Station (GCS)',
  shortTitle: 'Ground Control Station',
  category: 'UAV software',
  description: 'A web-based application built with Next.js and Flask that lets operators track a UAV’s position and heading on a map, control the aircraft, and manage flight missions. I contributed to development, tested the software during field operations, and helped resolve technical issues.',
  language: 'en',
  technologies: ['Next.js', 'Flask', 'Python'],
  cover: {
    src: `${gcsImages}/dashboard.webp`,
    width: 956,
    height: 557,
    alt: 'Ground Control Station dashboard with a weather panel and mission, video, and log shortcuts',
    caption: 'Ground Control Station dashboard',
  },
  gallery: [
    {
      src: `${gcsImages}/mission-planning.webp`,
      width: 1222,
      height: 677,
      alt: 'Satellite map with mission waypoints and a waypoint table',
      caption: 'Mission planning and waypoint management',
    },
    {
      src: `${gcsImages}/live-mission.webp`,
      width: 1272,
      height: 675,
      alt: 'Three-dimensional mission map beside the UAV flight instruments',
      caption: 'Live mission view and aircraft telemetry',
    },
    {
      src: `${gcsImages}/overview.webp`,
      width: 833,
      height: 578,
      alt: 'Overview of the camera, configuration, mission, and log screens',
      caption: 'Ground station interface overview',
    },
  ],
  aircraft: [
    { src: `${gcsImages}/aircraft-side.webp`, width: 675, height: 191 },
    { src: `${gcsImages}/aircraft-angle.webp`, width: 1100, height: 507 },
  ],
} satisfies Project & { shortTitle: string };

export const projects: readonly Project[] = [
  featuredProject,
  {
    slug: 'uav-video-streaming',
    title: 'Cloud-Based UAV Video Streaming and Object Detection',
    category: 'Computer vision and cloud',
    description: 'A video pipeline that streams live footage from a UAV camera and detects objects in the feed. I developed and tested the object detection models, configured the Microsoft Azure deployment, and helped test the streaming pipeline.',
    language: 'en',
    technologies: ['Microsoft Azure', 'Object detection'],
    logo: {
      src: `${streamingImages}/td-division-logo.webp`,
      width: 320,
      height: 320,
      alt: 'Technology Development division logo',
      tone: 'dark',
    },
    cover: {
      src: `${streamingImages}/dashboard.webp`,
      width: 1131,
      height: 572,
      alt: 'UAV video feed with an object detection box and an aircraft telemetry panel',
      caption: 'Live video, object detection, and aircraft telemetry',
    },
    gallery: [
      {
        src: `${streamingImages}/detection-result.webp`,
        width: 622,
        height: 588,
        alt: 'Detection detail panel showing a detected object in a camera frame',
        caption: 'Object detection result',
      },
      {
        src: `${streamingImages}/in-flight-detection.webp`,
        width: 640,
        height: 480,
        alt: 'Aerial camera frame with a detection box around a target on the ground',
        caption: 'In-flight object detection test',
      },
    ],
  },
  {
    slug: 'cevio',
    title: 'CEVIO · From CV to Portfolio Web',
    category: 'AI web application',
    description: 'CEVIO adalah sebuah platform web cerdas berbasis Artificial Intelligence (AI) yang dirancang untuk mengubah dokumen riwayat hidup (CV) berformat PDF menjadi website portofolio interaktif dan profesional secara otomatis.',
    language: 'id',
    technologies: ['AI', 'PDF'],
    logo: { src: `${cevioImages}/logo.png`, width: 640, height: 640, alt: 'CEVIO logo' },
    cover: {
      src: `${cevioImages}/dashboard.webp`,
      width: 1901,
      height: 914,
      alt: 'CEVIO homepage introducing its CV-to-portfolio generator',
      caption: 'CEVIO homepage',
    },
    gallery: [
      {
        src: `${cevioImages}/generate.webp`,
        width: 1902,
        height: 913,
        alt: 'CEVIO generator with PDF upload, theme options, and a generation summary',
        caption: 'CV upload and theme selection',
      },
      {
        src: `${cevioImages}/portfolio-preview.webp`,
        width: 1919,
        height: 906,
        alt: 'Portfolio generated in CEVIO with a profile and theme controls',
        caption: 'Generated portfolio preview',
      },
      {
        src: `${cevioImages}/publish.webp`,
        width: 1919,
        height: 912,
        alt: 'Dialog for saving and publishing a generated portfolio',
        caption: 'Save and publish a portfolio',
      },
    ],
  },
];
