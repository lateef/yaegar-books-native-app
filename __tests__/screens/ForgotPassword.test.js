import React from 'react';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';

import ConnectedForgotPassword, {ForgotPassword} from '../../src/screens/ForgotPassword';

require('bezier');

const mockStore = configureStore([promise(), thunk, logger]);
const store = mockStore({
    userReducer: {
        user: {
            email: ''
        }
    }
});

describe('Forgot Password', () => {
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
        const wrapper = mount(<Provider store={store}><ConnectedForgotPassword {...props}/></Provider>);

        expect(wrapper).toBeTruthy();
        expect(wrapper.find('Button')).toHaveLength(0);
        expect(wrapper.find('#continueUpButton').length).toBe(0);
        expect(wrapper).toMatchSnapshot();
    });

    it('should call correct user actions when rendered', () => {
        const {props} = setup();
        shallow(<ForgotPassword {...props}/>);
    });

    it('should call correct user actions when text is entered in email field', () => {
        const {props} = setup();
        const wrapper = shallow(<ForgotPassword {...props}/>);
        const emailInput = wrapper.find('#emailInput').first();

        emailInput.props().onChangeText('a');

        expect(props.userActions.updateEmail).toHaveBeenCalledWith('a');
    });

    it('should call correct user actions when  text with whitespaces is entered in email field', () => {
        const {props} = setup();
        const wrapper = shallow(<ForgotPassword {...props}/>);
        const emailInput = wrapper.find('#emailInput').first();

        emailInput.props().onChangeText(' a ');

        expect(props.userActions.updateEmail).toHaveBeenCalledWith('a');
    });

    it('should call correct user actions when send button is clicked', async () => {
        const {props} = setup();
        props.user.email = 'a';
        props.user.hasSentForgottenPassword = true;
        const wrapper = shallow(<ForgotPassword {...props}/>);
        const continueButton = wrapper.find('#continueButton').first();

        continueButton.props().onPress();

        await expect(props.userActions.validateEmail).toHaveBeenCalledWith(props.user.email);
        await expect(props.userActions.forgotPassword).toHaveBeenCalledWith(props.user);
        await expect(props.navigator.push).toHaveBeenCalled();
    });
});
