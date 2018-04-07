import React from 'react';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import ConnectedDrawer, {Drawer} from '../../src/screens/Drawer';

require('bezier');

const mockStore = configureStore([promise(), thunk, logger]);
const store = mockStore({
    userReducer: {
        user: {
            email: ''
        }
    }
});

describe('Drawer', () => {
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
        const wrapper = mount(<Provider store={store}><ConnectedDrawer {...props}/></Provider>);

        expect(wrapper).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    it('has log out button with correct behaviour', async () => {
        const {props} = setup();
        const wrapper = shallow(<Drawer {...props}/>);
        const signOut = wrapper.find('#signOut').first();

        signOut.props().onPress();
        await expect(props.userActions.logout).toHaveBeenCalled();
        expect(props.navigator.toggleDrawer).toHaveBeenCalled();
        expect(props.navigator.handleDeepLink).toHaveBeenCalled();
    });

    it('has unregister button with correct behaviour', async () => {
        const {props} = setup();
        const wrapper = shallow(<Drawer {...props}/>);
        const deleteAccount = wrapper.find('#deleteAccount').first();

        deleteAccount.props().onPress();
        await expect(props.userActions.unregister).toHaveBeenCalled();
        expect(props.navigator.toggleDrawer).toHaveBeenCalled();
        expect(props.navigator.handleDeepLink).toHaveBeenCalled();
    });
});
