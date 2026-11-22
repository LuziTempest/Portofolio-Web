import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProjectDetail } from '@/components/projects/project-detail';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { projects } from '@/content/projects';
import { site } from '@/content/site';

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

function getProject(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  const title = `${project.title} · ${site.name}`;

  return {
    title,
    description: project.description,
    openGraph: { type: 'website', title, description: project.description },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);

  return (
    <>
      <ProjectDetail project={project} />
      <ScrollReveal />
    </>
  );
}
