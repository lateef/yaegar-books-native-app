import React from 'react';
import Landing from '../../../src/screens/Landing';

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
        const wrapper = mount(<Landing/>);

        expect(wrapper).toBeTruthy();
        expect(wrapper.find('Button')).toHaveLength(2);
        expect(wrapper).toMatchSnapshot();
    });

    it('has sign up button with correct behaviour', () => {
        const wrapper = mount(<Landing/>);
        const signUpButton = wrapper.find('#signUpButton').first();

        expect(signUpButton.prop('id')).toBe('signUpButton');
        expect(signUpButton.prop('block')).toBeTruthy();
        expect(signUpButton.props().block).toBeTruthy();
        expect(signUpButton.text()).toBe('Sign Up');
        expect(signUpButton.props().onPress);
    });

    it('has log in button with correct behaviour', () => {
        const wrapper = mount(<Landing/>);
        const logInButton = wrapper.find('#logInButton').first();

        expect(logInButton.prop('id')).toBe('logInButton');
        expect(logInButton.prop('block')).toBeTruthy();
        expect(logInButton.text()).toBe('Log In');
    });
});