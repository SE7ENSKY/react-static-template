import jsdom from 'jsdom';
import sinon from 'sinon';
import {
	shallow,
	render,
	mount,
	configure
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

const { JSDOM } = jsdom;
const page = '<!doctype html><html><head></head><body></body></html>';
const {
	document,
	document: { defaultView }
} = (new JSDOM(page)).window;

global.document = document;
global.window = defaultView;
global.sinon = sinon;
global.shallow = shallow;
global.render = render;
global.mount = mount;

window.scrollTo = () => { };
