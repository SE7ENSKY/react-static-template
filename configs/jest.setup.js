import sinon from 'sinon';
import {
	shallow,
	render,
	mount,
	configure
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

global.sinon = sinon;

global.shallow = shallow;
global.render = render;
global.mount = mount;