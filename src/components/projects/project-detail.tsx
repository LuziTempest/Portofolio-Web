import Image from 'next/image';
import Link from 'next/link';

import type { Project, ProjectImage } from '@/content/projects';

import styles from './project-detail.module.css';

function ProjectFigure({ image, sizes }: { image: ProjectImage; sizes: string }) {
  return (
    <figure className={styles.figure} data-reveal>
      <a
        className={styles.imageLink}
        href={image.src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${image.caption} at full size (opens in a new tab)`}
      >
        <Image
          className={styles.screenshot}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
        />
      </a>
      <figcaption className={styles.caption}>{image.caption}</figcaption>
    </figure>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const hasArtwork = Boolean(project.logo || project.aircraft?.length);

  return (
    <main id="main-content" tabIndex={-1} className={`container ${styles.project}`}>
      <Link className={styles.back} href="/#work">Back to selected work</Link>

      <article aria-labelledby="project-title">
        <header className={`${styles.header}${hasArtwork ? ` ${styles.withArtwork}` : ''}`}>
          <div data-reveal>
            <p className="eyebrow">{project.category}</p>
            <h1 id="project-title" className={styles.title}>{project.title}</h1>
            <p className={styles.description} lang={project.language}>{project.description}</p>
            <ul className={styles.technologies} aria-label="Project topics" role="list">
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
          {hasArtwork && (
            <div className={styles.artwork} data-reveal>
              {project.aircraft && (
                <div className={styles.aircraft} aria-hidden="true">
                  {project.aircraft.map(({ src, width, height }) => (
                    <Image
                      key={src}
                      src={src}
                      width={width}
                      height={height}
                      sizes="(max-width: 767px) 42vw, 24vw"
                      alt=""
                    />
                  ))}
                </div>
              )}
              {project.logo && (
                <Image
                  className={styles.logo}
                  src={project.logo.src}
                  width={project.logo.width}
                  height={project.logo.height}
                  sizes="(max-width: 767px) 145px, 192px"
                  alt={project.logo.alt ?? ''}
                  data-tone={project.logo.tone}
                />
              )}
            </div>
          )}
        </header>

        <section className={styles.dashboard} aria-labelledby="dashboard-title">
          <h2 className={`section-title ${styles.sectionTitle}`} id="dashboard-title" data-reveal>
            Dashboard
          </h2>
          <ProjectFigure image={project.cover} sizes="(max-width: 1340px) 90vw, 1200px" />
        </section>

        <section className={styles.gallery} aria-labelledby="gallery-title">
          <h2 className={`section-title ${styles.sectionTitle}`} id="gallery-title" data-reveal>
            Project gallery
          </h2>
          <div className={styles.galleryGrid}>
            {project.gallery.map((image) => (
              <ProjectFigure
                key={image.src}
                image={image}
                sizes="(max-width: 767px) 90vw, (max-width: 1440px) 44vw, 625px"
              />
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
