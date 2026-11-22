import Image from 'next/image';
import Link from 'next/link';

import { projects } from '@/content/projects';

import styles from './work-section.module.css';

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className={`container ${styles.work}`}>
      <div data-reveal>
        <p className="eyebrow">Projects</p>
        <h2 id="work-title" className="section-title">Selected work.</h2>
      </div>

      <div className={styles.projects}>
        {projects.map((project) => (
          <article key={project.slug} id={project.slug} className={styles.card} data-reveal>
            <Link
              className={styles.link}
              href={`/projects/${project.slug}`}
              prefetch={false}
              aria-labelledby={`${project.slug}-title`}
              data-reveal-panel
            >
              <div className={styles.imageFrame}>
                <Image
                  className={styles.image}
                  src={project.cover.src}
                  fill
                  sizes="(max-width: 767px) 90vw, (max-width: 960px) 43vw, 30vw"
                  alt=""
                />
              </div>
              <div className={styles.details}>
                <div className={styles.category}>
                  <p className="eyebrow">{project.category}</p>
                  {project.logo && (
                    <Image
                      className={styles.logo}
                      src={project.logo.src}
                      width={project.logo.width}
                      height={project.logo.height}
                      sizes="32px"
                      alt={project.logo.alt ?? ''}
                      data-tone={project.logo.tone}
                    />
                  )}
                </div>
                <h3 id={`${project.slug}-title`} className={styles.title}>{project.title}</h3>
                <p className={styles.description} lang={project.language}>{project.description}</p>
              </div>
              <div className={styles.cardFooter}>
                <ul className={styles.technologies} aria-label="Project topics" role="list">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <span className={styles.open}>
                  View project <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
