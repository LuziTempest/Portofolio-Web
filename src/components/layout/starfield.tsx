import { CursorLight } from './cursor-light';
import styles from './starfield.module.css';

export function Starfield() {
  return (
    <div aria-hidden="true" className={styles.sky}>
      <span className={styles.arrival} />
      <CursorLight />
      <span className={`${styles.meteor} ${styles.firstMeteor}`} />
      <span className={`${styles.meteor} ${styles.secondMeteor}`} />
    </div>
  );
}
