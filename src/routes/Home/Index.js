import Loadable from 'react-loadable';
import LoadingComponent from 'components/LoadingComponent';

export default Loadable({
	loader: () => import('./Home'),
	loading: LoadingComponent,
});
