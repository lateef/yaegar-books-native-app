import React from 'react';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import ConnectedDashboard, {Dashboard} from '../../src/screens/Dashboard';

require('bezier');

const mockStore = configureStore([promise(), thunk, logger]);
const store = mockStore({
    generalLedgerReducer: {
        generalLedger: {
            name: ''
        },
        accounts: [],
        categories: []
    }
});

describe('Dashboard', () => {
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
        const wrapper = mount(<Provider store={store}><ConnectedDashboard {...props}/></Provider>);

        expect(wrapper).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });
});
