import React from 'react';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import {Landing} from '../../src/screens/Landing';

const mockStore = configureStore([promise(), thunk, logger]);
const store = mockStore();

describe('Landing', () => {
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
        const wrapper = mount(<Provider store={store}><Landing {...props}/></Provider>);

        expect(wrapper).toBeTruthy();
        expect(wrapper.find('Button')).toHaveLength(2);
        expect(wrapper).toMatchSnapshot();
    });

    it('has sign up button with correct behaviour', () => {
        const {props} = setup();
        const wrapper = mount(<Provider store={store}><Landing {...props}/></Provider>);
        const signUpButton = wrapper.find('#signUpButton').first();

        expect(signUpButton.prop('id')).toBe('signUpButton');
        expect(signUpButton.prop('block')).toBeTruthy();
        expect(signUpButton.text()).toBe('Sign Up');

        signUpButton.props().onPress();
        expect(props.navigator.push).toHaveBeenCalledWith({screen: 'SignUp'});
    });

    it('has log in button with correct behaviour', () => {
        const {props} = setup();
        const wrapper = mount(<Provider store={store}><Landing {...props}/></Provider>);
        const logInButton = wrapper.find('#logInButton').first();

        expect(logInButton.prop('id')).toBe('logInButton');
        expect(logInButton.prop('block')).toBeTruthy();
        expect(logInButton.text()).toBe('Log In');

        logInButton.props().onPress();
        expect(props.navigator.push).toHaveBeenCalledWith({screen: 'LogIn'});
    });
});