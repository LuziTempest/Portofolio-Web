import { activities } from '@/content/activities';
import { WordReveal } from '@/components/motion/word-reveal';

import { ActivityGallery } from './activity-gallery';
import styles from './activities-section.module.css';

export function ActivitiesSection() {
  return (
    <section
      id="activities"
      aria-labelledby="activities-title"
      className={`container ${styles.activities}`}
    >
      <div className={styles.heading}>
        <p className="eyebrow">Activities</p>
        <h2 id="activities-title" className="section-title"><WordReveal text="Research, teaching, and contests." /></h2>
      </div>

      <ul className={styles.list} role="list">
        {activities.map(({ area, title, description }) => (
          <li key={title} data-reveal>
            <article className={styles.entry}>
              <p className="eyebrow">{area}</p>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </article>
          </li>
        ))}
      </ul>

      <ActivityGallery />
    </section>
  );
}
