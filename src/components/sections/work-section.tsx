import Image from 'next/image';
import Link from 'next/link';

import { WordReveal } from '@/components/motion/word-reveal';
import { featuredProject, projects } from '@/content/projects';

import styles from './work-section.module.css';

const coverSizes = '(max-width: 767px) 90vw, (max-width: 895px) 46vw, (max-width: 1440px) 51vw, 735px';

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className={styles.work}>
      <div className={styles.horizon} aria-hidden="true">
        <span data-scroll-horizon />
      </div>
      <div className="container">
        <div className={styles.heading}>
          <p className="eyebrow">Projects</p>
          <h2 id="work-title" className="section-title"><WordReveal text="Selected work." /></h2>
        </div>

        <div className={styles.showcase} data-project-showcase>
          <div>
            {projects.map((project) => (
              <article
                key={project.slug}
                id={project.slug}
                className={project.slug === featuredProject.slug ? `${styles.card} ${styles.feature}` : styles.card}
                data-reveal
                data-project-row={project.slug}
              >
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
                      sizes={coverSizes}
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
          <div className={styles.preview} aria-hidden="true">
            <div className={styles.stage} data-project-stage>
              {projects.map((project) => (
                <figure key={project.slug} className={styles.frame} data-project-frame={project.slug}>
                  <div className={styles.frameImage}>
                    <Image className={styles.image} src={project.cover.src} alt="" fill sizes={coverSizes} />
                  </div>
                  <figcaption>{project.cover.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
