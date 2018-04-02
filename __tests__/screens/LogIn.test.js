import React from 'react';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import ConnectedLogIn, {LogIn} from '../../src/screens/LogIn';

require('bezier');

const mockStore = configureStore([promise(), thunk, logger]);
const store = mockStore({
    userReducer: {
        user: {
            email: ''
        }
    }
});

describe('LogIn', () => {
    jest.resetAllMocks();
    //Start introduce hack to remove warnings as a result of issues with React native and enzyme mount
    const origConsole = console.error;
    beforeEach(() => {
        console.error = () => {
        };
    });
    afterEach(() => {
        console.error = origConsole;
    });
    //End

    it('renders without crashing', () => {
        const {props} = setup();
        const wrapper = mount(<Provider store={store}><ConnectedLogIn {...props}/></Provider>);

        expect(wrapper).toBeTruthy();
        expect(wrapper.find('#logInButton').first().text()).toBe('Log In');
        expect(wrapper.find('#forgotPasswordButton').first().text()).toBe('Forgot Password?');
        expect(wrapper).toMatchSnapshot();
    });

    it('should call correct user actions when rendered', () => {
        const {props} = setup();
        shallow(<LogIn {...props}/>);

        expect(props.userActions.init).toHaveBeenCalledWith();
    });

    it('should call correct user actions when text is entered in email field', () => {
        const {props} = setup();
        const wrapper = shallow(<LogIn {...props}/>);
        const emailInput = wrapper.find('#emailInput').first();

        emailInput.props().onChangeText('a');

        expect(props.userActions.updateEmail).toHaveBeenCalledWith('a');
    });

    it('should call correct user actions when  text with whitespaces is entered in email field', () => {
        const {props} = setup();
        const wrapper = shallow(<LogIn {...props}/>);
        const emailInput = wrapper.find('#emailInput').first();

        emailInput.props().onChangeText(' a ');

        expect(props.userActions.updateEmail).toHaveBeenCalledWith('a');
    });

    it('should call correct user actions when text is entered in password field', () => {
        const {props} = setup();
        const wrapper = shallow(<LogIn {...props}/>);
        const emailInput = wrapper.find('#passwordInput').first();

        emailInput.props().onChangeText('pass');

        expect(props.userActions.setPassword).toHaveBeenCalledWith('pass');
    });

    it('should call correct user actions when login button is clicked', async () => {
        const {props} = setup();
        props.user.email = 'email';
        props.user.password = 'password';
        const wrapper = shallow(<LogIn {...props}/>);
        const continueButton = wrapper.find('#logInButton').first();

        continueButton.props().onPress();

        await expect(props.userActions.validateEmail).toHaveBeenCalledWith(props.user.email);
        await expect(props.userActions.validatePassword).toHaveBeenCalledWith(props.user.password, props.user.password);
        await expect(props.userActions.logIn).toHaveBeenCalledWith(props.user);
    });

    it('should call correct user actions when forgotten password button is clicked', async () => {
        const {props} = setup();
        const wrapper = shallow(<LogIn {...props}/>);
        const forgotPasswordButton = wrapper.find('#forgotPasswordButton').first();

        forgotPasswordButton.props().onPress();

        expect(props.navigator.push).toHaveBeenCalledWith({screen: 'ForgotPassword'});
    });
});
