import Loadable from 'react-loadable';
import LoadingComponent from 'components/LoadingComponent';

export default Loadable({
	loader: () => import('./About'),
	loading: LoadingComponent,
});
