import Image from 'next/image';
import Link from 'next/link';

import { ActionLink } from '@/components/ui/action-link';
import { PortraitGlitch } from '@/components/ui/portrait-glitch';
import { featuredProject } from '@/content/projects';
import { site, specialties } from '@/content/site';

import styles from './hero-section.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro} data-reveal>
          <p className={`eyebrow ${styles.eyebrow}`}>Informatics Engineering at ITS</p>
          <h1 className={styles.title} id="hero-title">
            {site.firstName}{' '}
            <span className={styles.lastName}>{site.lastName}.</span>
          </h1>
          <p className={styles.description}>{site.introduction}</p>
          <div className={styles.actions}>
            <ActionLink href="#work" variant="primary" icon="↓">View my work</ActionLink>
            <ActionLink href={site.linkedinUrl}>LinkedIn</ActionLink>
          </div>
        </div>

        <div className={styles.visual}>
          <PortraitGlitch
            className={styles.portrait}
            src={site.portrait}
            alt={`Portrait of ${site.name} wearing sunglasses and a brown jacket`}
            sizes="(max-width: 767px) 100vw, (max-width: 1440px) 46vw, 650px"
            priority
          />
          <Image
            {...site.mascot}
            className={styles.companion}
            sizes="(max-width: 767px) 14vw, 115px"
            alt=""
            aria-hidden="true"
          />
          <Link className={styles.featured} href={`/projects/${featuredProject.slug}`} prefetch={false}>
            <div>
              <p className={`eyebrow ${styles.featuredLabel}`}>Featured project</p>
              <p className={styles.featuredTitle}>{featuredProject.shortTitle}</p>
              <p className={styles.featuredTeam}>{site.researchTeam}</p>
            </div>
            <div className={styles.featuredPreview}>
              <Image src={featuredProject.cover.src} fill sizes="88px" alt="" />
            </div>
          </Link>
        </div>

        <dl className={styles.specialties} data-reveal>
          {specialties.map(({ label, tools }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{tools}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={`container ${styles.strip}`} data-reveal>
        <p>{site.location}</p>
        <a href="#work">Selected work <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
