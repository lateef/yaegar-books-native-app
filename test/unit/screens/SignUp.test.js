import React from 'react';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';

import ConnectedSignUp, {SignUp} from '../../../src/screens/SignUp';

require('bezier');

const mockStore = configureStore([promise(), thunk, logger]);
const store = mockStore({
    userReducer: {
        user: {
            email: ''
        }
    }
});

function setup() {
    const props = {
        navigator: {
            push: jest.fn()
        },
        user: {
            email: ''
        },
        userActions: {
            updateEmail: jest.fn(),
            validateEmail: jest.fn()
        }
    };

    return {
        props
    }
}

beforeEach(() => {
    jest.resetAllMocks();
});

afterEach(() => {
});

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
        const {props} = setup();
        const wrapper = shallow(<Provider store={store}><ConnectedSignUp {...props}/></Provider>);

        expect(wrapper).toBeTruthy();
        expect(wrapper.find('Button')).toHaveLength(0);
        expect(wrapper.find('#signUpButton').length).toBe(0);
        expect(wrapper).toMatchSnapshot();
    });

    it('should call update email user action when email has text', () => {
        const {props} = setup();
        const wrapper = shallow(<SignUp {...props}/>);
        const emailInput = wrapper.find('#emailInput').first();

        emailInput.props().onChangeText('a');

        expect(props.userActions.updateEmail).toHaveBeenCalledWith('a');
    });

    it('should call validate email user action when continue button is clicked', () => {
        const {props} = setup();
        props.user.email = 'a';
        const wrapper = shallow(<SignUp {...props}/>);
        const continueButton = wrapper.find('#continueButton').first();

        continueButton.props().onPress();

        expect(props.userActions.validateEmail).toHaveBeenCalled();
    })
});
