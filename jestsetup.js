import {configure, mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';

configure({adapter: new Adapter()});

global.mount = mount;
global.shallow = shallow;
global.render = render;

global.setup = function setup() {
    const props = {
        navigator: {
            push: jest.fn(),
            resetTo: jest.fn()
        },
        user: {
            email: '', password: '', passwordAgain: ''
        },
        userActions: {
            init: jest.fn(),
            updateEmail: jest.fn(),
            validateEmail: jest.fn(),
            setPassword: jest.fn(),
            setPasswordAgain: jest.fn(),
            validatePassword: jest.fn(),
            signUp: jest.fn(),
            logIn: jest.fn(),
            logout: jest.fn(),
            unregister: jest.fn()
        }
    };

    return {
        props
    }
};

