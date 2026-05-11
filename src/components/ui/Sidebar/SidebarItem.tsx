import { type ReactNode } from 'react';
import styles from './SidebarItem.module.css';
import { IconChevronRight, IconChevronDown } from './SidebarIcons';

export interface SidebarItemProps {
  id:         string;
  label:      string;
  icon:       ReactNode;
  active?:    boolean;
  expanded?:  boolean;
  hasChildren?: boolean;
  onClick?:   () => void;
}

export function SidebarItem({
  id,
  label,
  icon,
  active    = false,
  expanded  = false,
  hasChildren = false,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      id={`sidebar-item-${id}`}
      type="button"
      role="menuitem"
      aria-current={active ? 'page' : undefined}
      aria-expanded={hasChildren ? expanded : undefined}
      className={[
        styles.item,
        active   ? styles.active   : '',
        expanded ? styles.expanded : '',
      ].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
      {hasChildren && (
        <span className={styles.chevron}>
          {expanded ? <IconChevronDown /> : <IconChevronRight />}
        </span>
      )}
    </button>
  );
}
