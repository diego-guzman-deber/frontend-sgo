import { useState, type ReactNode } from 'react';
import { SidebarItem }  from './SidebarItem';
import styles from './Sidebar.module.css';
import {
  IconHome,
  IconContract,
  IconOrders,
  IconSupport,
  IconProduct,
  IconKpi,
  IconMenu,
  IconClose,
} from './SidebarIcons';

/* ── Tipos ── */
export interface NavSubItem {
  id:    string;
  label: string;
}

export interface NavItem {
  id:       string;
  label:    string;
  icon:     ReactNode;
  children?: NavSubItem[];
}

/* ── Configuración de navegación ── */
const NAV_ITEMS: NavItem[] = [
  {
    id:    'dashboard',
    label: 'Dashboard',
    icon:  <IconHome />,
  },
  {
    id:    'contrato',
    label: 'Contrato',
    icon:  <IconContract />,
    children: [
      { id: 'contrato-list',   label: 'Listado' },
      { id: 'contrato-nuevo',  label: 'Nuevo contrato' },
    ],
  },
  {
    id:    'pedidos',
    label: 'Pedidos',
    icon:  <IconOrders />,
    children: [
      { id: 'pedidos-list',   label: 'Todos los pedidos' },
      { id: 'pedidos-estado', label: 'Por estado' },
    ],
  },
  {
    id:    'orden',
    label: 'Orden',
    icon:  <IconOrders />,
    children: [
      { id: 'orden-list',  label: 'Órdenes activas' },
      { id: 'orden-hist',  label: 'Historial' },
    ],
  },
  {
    id:    'soporte',
    label: 'Soporte',
    icon:  <IconSupport />,
    children: [
      { id: 'soporte-tickets', label: 'Tickets' },
      { id: 'soporte-faq',     label: 'FAQ' },
    ],
  },
  {
    id:    'producto',
    label: 'Producto',
    icon:  <IconProduct />,
  },
  {
    id:    'kpi',
    label: 'KPI',
    icon:  <IconKpi />,
  },
];

/* ── Props ── */
interface SidebarProps {
  activeItemId?: string;
  /** Se llama con el id del ítem (padre o hijo) cuando el usuario navega */
  onNavigate?:   (id: string) => void;
}

/* ── Componente ── */
export function Sidebar({ activeItemId = 'dashboard', onNavigate }: SidebarProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [collapsed,  setCollapsed]  = useState(false);

  function handleItemClick(item: NavItem) {
    if (item.children) {
      // Expande/colapsa el sub-menú Y navega al ítem padre
      setExpandedId(prev => prev === item.id ? null : item.id);
      onNavigate?.(item.id);
    } else {
      onNavigate?.(item.id);
    }
  }

  return (
    <>
      {/* Overlay móvil */}
      {!collapsed && (
        <div
          className={styles.overlay}
          aria-hidden="true"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        id="sidebar"
        className={[styles.sidebar, collapsed ? styles.collapsed : ''].join(' ')}
        aria-label="Navegación principal"
      >
        {/* ── Cabecera ── */}
        <div className={styles.sidebarHeader}>
          {!collapsed && (
            <div className={styles.brand}>
              <div className={styles.brandIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                  <rect width="24" height="24" rx="6" fill="url(#sbGrad)" />
                  <path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2"
                    strokeLinecap="round" />
                  <defs>
                    <linearGradient id="sbGrad" x1="0" y1="0" x2="24" y2="24"
                      gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2d6a2d" />
                      <stop offset="1" stopColor="#3a8a3a" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className={styles.brandName}>SGO Admin</span>
            </div>
          )}

          <button
            id="sidebar-toggle"
            type="button"
            className={styles.toggleBtn}
            onClick={() => setCollapsed(v => !v)}
            aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
            aria-controls="sidebar"
            aria-expanded={!collapsed}
          >
            <span className={styles.toggleIcon}>
              {collapsed ? <IconMenu /> : <IconClose />}
            </span>
          </button>
        </div>

        {/* ── Sección de navegación ── */}
        <nav className={styles.nav} aria-label="Menú principal">
          {!collapsed && (
            <p className={styles.sectionLabel}>MENÚ</p>
          )}

          <ul role="menu" className={styles.navList}>
            {NAV_ITEMS.map(item => {
              const isExpanded = expandedId === item.id;
              const isActive   = activeItemId === item.id
                || (item.children?.some(c => c.id === activeItemId) ?? false);

              return (
                <li key={item.id} role="none">
                  <SidebarItem
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    active={isActive}
                    expanded={isExpanded}
                    hasChildren={Boolean(item.children?.length)}
                    onClick={() => handleItemClick(item)}
                  />

                  {/* Sub-items desplegables */}
                  {item.children && isExpanded && !collapsed && (
                    <ul
                      role="menu"
                      className={styles.subList}
                      aria-label={`Sub-menú ${item.label}`}
                    >
                      {item.children.map(child => (
                        <li key={child.id} role="none">
                          <button
                            id={`sidebar-item-${child.id}`}
                            type="button"
                            role="menuitem"
                            aria-current={activeItemId === child.id ? 'page' : undefined}
                            className={[
                              styles.subItem,
                              activeItemId === child.id ? styles.subItemActive : '',
                            ].join(' ')}
                            onClick={() => onNavigate?.(child.id)}
                          >
                            <span className={styles.subDot} />
                            {child.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

      </aside>
    </>
  );
}
