import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';

configure({ adapter: new Adapter() });

global.mount = mount;
global.shallow = shallow;
global.render = render;

