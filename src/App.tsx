import { useState } from 'react';
import { LoginPage }       from './components/features/LoginPage';
import { DashboardPage }   from './components/features/DashboardPage';
import { ContratoPage }    from './components/features/ContratoPage';
import { PedidosPage }     from './components/features/PedidosPage';
import { OrdenPage }       from './components/features/OrdenPage';
import { DashboardLayout } from './components/layouts/DashboardLayout';
import './styles/global.css';

/**
 * Rutas disponibles en el sistema.
 * Añadir aquí nuevas páginas a medida que se creen.
 */
type Route =
  | 'dashboard'
  | 'contrato'
  | 'contrato-list'
  | 'contrato-nuevo'
  | 'pedidos'
  | 'pedidos-list'
  | 'pedidos-estado'
  | 'orden'
  | 'orden-list'
  | 'orden-hist'
  | 'soporte'
  | 'soporte-tickets'
  | 'soporte-faq'
  | 'producto'
  | 'kpi';

/** Resuelve el componente para cada ruta */
function renderPage(route: Route) {
  switch (route) {
    case 'contrato':
    case 'contrato-list':
    case 'contrato-nuevo':
      return <ContratoPage />;

    case 'pedidos':
    case 'pedidos-list':
    case 'pedidos-estado':
      return <PedidosPage />;

    case 'orden':
    case 'orden-list':
    case 'orden-hist':
      return <OrdenPage />;

    case 'dashboard':
    default:
      return <DashboardPage />;
  }
}

/** Mapea una ruta a su id "raíz" para marcarla activa en el sidebar */
function getActiveId(route: Route): string {
  if (route.startsWith('contrato')) return 'contrato';
  if (route.startsWith('pedidos'))  return 'pedidos';
  if (route.startsWith('orden'))    return 'orden';
  if (route.startsWith('soporte'))  return 'soporte';
  return route;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [route, setRoute] = useState<Route>('dashboard');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <DashboardLayout
      activeItemId={getActiveId(route)}
      onNavigate={(id) => setRoute(id as Route)}
    >
      {renderPage(route)}
     </DashboardLayout>
  );
}

export default App;
