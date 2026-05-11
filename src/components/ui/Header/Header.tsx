import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.pageTitle}>Dashboard</h1>

      <div className={styles.userCard}>
        <div className={styles.userInfo}>
          <p className={styles.userName}>Diego Guzman</p>
          <p className={styles.userRole}>Administrador</p>
        </div>
        <div className={styles.avatar} aria-hidden="true">DG</div>
      </div>
    </header>
  );
}
