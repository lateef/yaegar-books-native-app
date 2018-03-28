import React from 'react';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import SignUp from '../../../src/screens/SignUp';
require('bezier');

const mockStore = configureStore([promise(), thunk, logger]);
const store = mockStore();

const defaultProps = {
    navigator: {
        push: jest.fn()
    }
};

describe('SignUp', () => {
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
        const wrapper = mount(<Provider store={store}><SignUp {...defaultProps}/></Provider>);

        expect(wrapper).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });
});
