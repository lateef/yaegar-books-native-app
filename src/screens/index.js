import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';

import Landing from './Landing';
import SignUp from './SignUp';
import SignUpContinue from './SignUpContinue';
import SignUpConfirmationSent from './SignUpConfirmationSent';
import LogIn from './LogIn';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordSent from './ForgotPasswordSent';
import Dashboard from './Dashboard';
import Drawer from './Drawer';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('Landing', () => Landing, store, Provider);
    Navigation.registerComponent('SignUp', () => SignUp, store, Provider);
    Navigation.registerComponent('SignUpContinue', () => SignUpContinue, store, Provider);
    Navigation.registerComponent('SignUpConfirmationSent', () => SignUpConfirmationSent, store, Provider);
    Navigation.registerComponent('LogIn', () => LogIn, store, Provider);
    Navigation.registerComponent('ForgotPassword', () => ForgotPassword, store, Provider);
    Navigation.registerComponent('ForgotPasswordSent', () => ForgotPasswordSent, store, Provider);
    Navigation.registerComponent('Dashboard', () => Dashboard, store, Provider);
    Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
}