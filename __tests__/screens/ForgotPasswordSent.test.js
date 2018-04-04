import React from 'react';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';

import ConnectedForgotPasswordSent, {ForgotPasswordSent} from '../../src/screens/ForgotPasswordSent';

require('bezier');

const mockStore = configureStore([promise(), thunk, logger]);
const store = mockStore({
    userReducer: {
        user: {
            email: ''
        }
    }
});

describe('Forgot Password Sent', () => {
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
        const wrapper = mount(<Provider store={store}><ConnectedForgotPasswordSent {...props}/></Provider>);

        expect(wrapper).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    it('should call correct user actions when text is entered in email field', () => {
        const {props} = setup();
        const wrapper = shallow(<ForgotPasswordSent {...props}/>);
        const emailInput = wrapper.find('#emailInput').first();

        emailInput.props().onChangeText('a');

        expect(props.userActions.updateEmail).toHaveBeenCalledWith('a');
    });

    it('should call correct user actions when text with whitespaces is entered in email field', () => {
        const {props} = setup();
        const wrapper = shallow(<ForgotPasswordSent {...props}/>);
        const emailInput = wrapper.find('#emailInput').first();

        emailInput.props().onChangeText(' a ');

        expect(props.userActions.updateEmail).toHaveBeenCalledWith('a');
    });

    it('should call correct user actions when reset code is entered', () => {
        const {props} = setup();
        const wrapper = shallow(<ForgotPasswordSent {...props}/>);
        const emailInput = wrapper.find('#resetCodeInput').first();

        emailInput.props().onChangeText('11111');

        expect(props.userActions.setResetCode).toHaveBeenCalledWith('11111');
    });

    it('should call correct user actions when reset code is entered with whitespaces', () => {
        const {props} = setup();
        const wrapper = shallow(<ForgotPasswordSent {...props}/>);
        const emailInput = wrapper.find('#resetCodeInput').first();

        emailInput.props().onChangeText(' 11111 ');

        expect(props.userActions.setResetCode).toHaveBeenCalledWith('11111');
    });

    it('should call correct user actions when text is entered in password field', () => {
        const {props} = setup();
        const wrapper = shallow(<ForgotPasswordSent {...props}/>);
        const passwordInput = wrapper.find('#passwordInput').first();

        passwordInput.props().onChangeText('p');

        expect(props.userActions.setPassword).toHaveBeenCalledWith('p');
        expect(props.userActions.validatePassword).toHaveBeenCalledWith('p', props.user.passwordAgain);
    });

    it('should call correct user actions when text is entered in password again field', () => {
        const {props} = setup();
        const wrapper = shallow(<ForgotPasswordSent {...props}/>);
        const passwordAgainInput = wrapper.find('#passwordAgainInput').first();

        const password = 'pa';
        passwordAgainInput.props().onChangeText(password);

        expect(props.userActions.setPasswordAgain).toHaveBeenCalledWith(password);
        expect(props.userActions.validatePassword).toHaveBeenCalledWith(props.user.password, password);
    });

    it('should call correct user actions when reset password button is clicked', async () => {
        const {props} = setup();
        props.user.email = 'a';
        props.user.passwordMatched = true;
        const wrapper = shallow(<ForgotPasswordSent {...props}/>);
        const resetPasswordButton = wrapper.find('#resetPasswordButton').first();

        resetPasswordButton.props().onPress();

        await expect(props.userActions.forgotPasswordReset).toHaveBeenCalledWith(props.user);
    });

});
