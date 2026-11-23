import styles from './starfield.module.css';

export function Starfield() {
  return (
    <div aria-hidden="true" className={styles.sky}>
      <span className={styles.arrival} />
      <span className={`${styles.star} ${styles.nearStar}`} />
      <span className={`${styles.star} ${styles.farStar}`} />
      <span className={styles.meteor} />
    </div>
  );
}
