import styles from './word-reveal.module.css';

export function WordReveal({ text }: { text: string }) {
  return (
    <span data-word-reveal>
      <span className={styles.accessible}>{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((part, index) => (
          /\S/.test(part)
            ? <span className={styles.mask} key={index}><span className={styles.word} data-word>{part}</span></span>
            : part
        ))}
      </span>
    </span>
  );
}
