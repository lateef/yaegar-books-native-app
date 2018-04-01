import React from 'react';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';

import ConnectedSignUpContinue, {SignUpContinue} from '../../src/screens/SignUpContinue';

require('bezier');

const mockStore = configureStore([promise(), thunk, logger]);
const store = mockStore({
    userReducer: {
        user: {
            email: ''
        }
    }
});

beforeEach(() => {
    jest.resetAllMocks();
});

afterEach(() => {
});

describe('SignUpContinue', () => {
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
        const wrapper = shallow(<Provider store={store}><ConnectedSignUpContinue {...props}/></Provider>);

        expect(wrapper).toBeTruthy();
        expect(wrapper.find('Button')).toHaveLength(0);
        expect(wrapper.find('#signUpButton').length).toBe(0);
        expect(wrapper).toMatchSnapshot();
    });

    it('should call correct user actions when text is entered in password field', () => {
        const {props} = setup();
        const wrapper = shallow(<SignUpContinue {...props}/>);
        const passwordInput = wrapper.find('#passwordInput').first();

        passwordInput.props().onChangeText('p');

        expect(props.userActions.setPassword).toHaveBeenCalledWith('p');
        expect(props.userActions.validatePassword).toHaveBeenCalledWith('p', props.user.passwordAgain);
    });

    it('should call correct user actions when text is entered in password again field', () => {
        const {props} = setup();
        const wrapper = shallow(<SignUpContinue {...props}/>);
        const passwordAgainInput = wrapper.find('#passwordAgainInput').first();

        const password = 'pa';
        passwordAgainInput.props().onChangeText(password);

        expect(props.userActions.setPasswordAgain).toHaveBeenCalledWith(password);
        expect(props.userActions.validatePassword).toHaveBeenCalledWith(props.user.password, password);
    });

    it('should call correct user actions when sign up button is clicked', () => {
        const {props} = setup();
        props.user.passwordMatched = true;

        const wrapper = shallow(<SignUpContinue {...props}/>);
        const signUpButton = wrapper.find('#signUpButton').first();

        signUpButton.props().onPress();

        expect(props.userActions.signUp).toHaveBeenCalledWith(props.user);
    })
});
