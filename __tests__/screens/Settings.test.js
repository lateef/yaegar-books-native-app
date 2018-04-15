import React from 'react';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import ConnectedSettings, {Settings} from '../../src/screens/Settings';

require('bezier');

const mockStore = configureStore([promise(), thunk, logger]);
const store = mockStore({
    userReducer: {
        user: {
            email: ''
        }
    }
});

describe('Settings', () => {
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
        const wrapper = mount(<Provider store={store}><ConnectedSettings {...props}/></Provider>);

        expect(wrapper).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });
});
