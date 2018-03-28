import React from 'react';

describe('SignUp Feature', () => {
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

    it('click on the sign up button', () => {
        const wrapper = mount(<SignUp/>);

        expect(wrapper).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });
});