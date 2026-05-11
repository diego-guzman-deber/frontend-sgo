import { type ReactNode } from 'react';
import { Sidebar } from '../ui/Sidebar';
import { Header }  from '../ui/Header';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children:      ReactNode;
  activeItemId?: string;
  onNavigate?:   (id: string) => void;
}

/**
 * DashboardLayout — layout base para todas las páginas autenticadas.
 * Incluye el Header en la parte superior y el Sidebar a la izquierda.
 */
export function DashboardLayout({ children, activeItemId, onNavigate }: DashboardLayoutProps) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.layout}>
        <Sidebar activeItemId={activeItemId} onNavigate={onNavigate} />
        <main id="main-content" className={styles.main} tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}

