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
            toggleDrawer: jest.fn(),
            handleDeepLink: jest.fn(),
            resetTo: jest.fn(),
            setOnNavigatorEvent: jest.fn(),
            setButtons: jest.fn()
        },
        user: {
            email: '', password: '', passwordAgain: ''
        },
        userActions: {
            init: jest.fn(),
            reset: jest.fn(),
            updateEmail: jest.fn(),
            validateEmail: jest.fn(),
            setPassword: jest.fn(),
            setPasswordAgain: jest.fn(),
            validatePassword: jest.fn(),
            signUp: jest.fn(),
            logIn: jest.fn(),
            logout: jest.fn(),
            clearLogout: jest.fn(),
            unregister: jest.fn(),
            forgotPassword: jest.fn(),
            setResetCode: jest.fn(),
            forgotPasswordReset: jest.fn(),
            setCanDelete: jest.fn()
        }
    };

    return {
        props
    }
};

