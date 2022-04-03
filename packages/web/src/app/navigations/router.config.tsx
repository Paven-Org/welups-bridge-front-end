import { Routes, Route, Link } from 'react-router-dom';
import Layout1 from '../components/layout/Layout1';
import Bridge from '../pages/bridge/bridge';
import Index from '../pages/index/Index';

const RouterConfig: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout1 />}>
        <Route index element={<Index />} />
        <Route path='bridge' element={<Bridge />} />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default RouterConfig;

function Page404() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  );
}
