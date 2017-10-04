import CoreLayout from '../layouts/CoreLayout';
import HomeRoute from './Home';
import ContentRoute from './Content';

export const createRoutes = store => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : HomeRoute(store),
  childRoutes : [
    ContentRoute(store),
  ],
});

export default createRoutes;
