import React from 'react';

import SignUpConfirmationSent from '../../src/screens/SignUpConfirmationSent';

beforeEach(() => {
    jest.resetAllMocks();
});

afterEach(() => {
});

describe('SignUpConfirmationSent', () => {
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
        const wrapper = mount(<SignUpConfirmationSent {...props}/>);
        const logInButton = wrapper.find('#logInButton').first();

        expect(wrapper).toBeTruthy();
        expect(wrapper.find('Button')).toHaveLength(1);

        expect(logInButton.prop('id')).toBe('logInButton');
        expect(wrapper).toMatchSnapshot();
    });

    it('has log in button with correct behaviour', () => {
        const {props} = setup();
        const wrapper = mount(<SignUpConfirmationSent {...props}/>);
        const logInButton = wrapper.find('#logInButton').first();

        logInButton.props().onPress();
        expect(props.navigator.push).toHaveBeenCalledWith({screen: 'LogIn'});
    });
});
