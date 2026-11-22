import Image from 'next/image';

import { organizations } from '@/content/organizations';
import { site } from '@/content/site';
import { technologies } from '@/content/technologies';

import styles from './profile-section.module.css';

export function ProfileSection() {
  return (
    <section id="profile" className={styles.profile} aria-labelledby="profile-title">
      <span id="about" className={styles.anchor} aria-hidden="true" />
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.bio} data-reveal>
            <p className="eyebrow">Profile</p>
            <h2 id="profile-title" className={styles.title}>A little about me.</h2>
            <p className={styles.description}>{site.about}</p>
            <dl className={styles.details}>
              <div>
                <dt className="eyebrow">Education</dt>
                <dd>{site.education}</dd>
              </div>
              <div>
                <dt className="eyebrow">Location</dt>
                <dd>{site.location}</dd>
              </div>
            </dl>
          </div>

          <figure className={styles.identity} data-reveal>
            <a
              className={styles.portraitFrame}
              href={site.profilePhoto}
              target="_blank"
              rel="noreferrer"
              aria-label={`View full photo of ${site.name} (opens in a new tab)`}
            >
              <Image
                src={site.profilePhoto}
                alt={`Portrait of ${site.name} in front of a collage of UAV team photos`}
                fill
                sizes="(max-width: 500px) 90vw, (max-width: 767px) 450px, (max-width: 1220px) 39vw, 450px"
                className={styles.profilePhoto}
              />
              <span className={styles.photoAction}>View full photo</span>
            </a>
            <figcaption className={styles.identityCaption}>
              <p className={styles.name}>{site.name}</p>
              <p className={styles.role}>Informatics Engineering student</p>
            </figcaption>
          </figure>

          <section className={styles.toolkit} aria-labelledby="toolkit-title" data-reveal>
            <h3 id="toolkit-title" className={styles.subheading}>Tools and languages</h3>
            <ul className={styles.techList} role="list">
              {technologies.map(({ name, logo, invertLogo }) => (
                <li className={styles.techChip} key={name}>
                  <Image
                    src={logo}
                    width={24}
                    height={24}
                    className={`${styles.techLogo}${invertLogo ? ` ${styles.invert}` : ''}`}
                    alt=""
                  />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className={styles.affiliations} aria-labelledby="organizations-title">
          <h3 id="organizations-title" className={styles.subheading} data-reveal>Organizations</h3>
          <ul className={styles.organizationList} role="list">
            {organizations.map(({ name, detail, logo }) => (
              <li className={styles.organization} key={name} data-reveal>
                <div className={styles.logoPlate}>
                  <Image src={logo} width={72} height={72} alt="" />
                </div>
                <div>
                  <p className={styles.organizationName}>{name}</p>
                  <p className={styles.organizationDetail}>{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
