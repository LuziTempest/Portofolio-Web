import { activities } from '@/content/activities';

import { ActivityGallery } from './activity-gallery';
import styles from './activities-section.module.css';

export function ActivitiesSection() {
  return (
    <section
      id="activities"
      aria-labelledby="activities-title"
      className={`container ${styles.activities}`}
    >
      <div data-reveal>
        <p className="eyebrow">Activities</p>
        <h2 id="activities-title" className="section-title">Research, teaching, and contests.</h2>
      </div>

      <ul className={styles.list} role="list">
        {activities.map(({ area, title, description }) => (
          <li key={title} data-reveal>
            <article className={styles.card}>
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
