import { experience } from '@/content/experience';

import styles from './experience-section.module.css';

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className={`container ${styles.experience}`}>
      <div data-reveal>
        <p className="eyebrow">Experience</p>
        <h2 id="experience-title" className={`section-title ${styles.title}`}>Where I’ve worked.</h2>
        <p className={styles.summary}>UAV software development, laboratory support, mentoring, and competitive programming.</p>
      </div>

      <ol className={styles.timeline} role="list">
        {experience.map(({ role, organization, description, period }) => (
          <li key={`${organization}-${role}-${period}`} className={styles.entry} data-reveal>
            <div className={styles.entryHeading}>
              <h3>{role}</h3>
              <p className={styles.period}>{period}</p>
            </div>
            <p className={styles.organization}>{organization}</p>
            <ul className={styles.description}>
              {description.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
