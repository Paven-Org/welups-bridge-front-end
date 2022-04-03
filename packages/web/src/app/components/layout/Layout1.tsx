import Layout from './Layout';
import { Outlet } from 'react-router-dom';
import AppGuard from '../../guards/AppGuard';

const Layout1: React.FC = () => {
  return (
    <AppGuard>
      <Layout home>
        <Outlet />
      </Layout>
    </AppGuard>
  );
};

export default Layout1;
