import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';

import Landing from './Landing';
import SignUp from './SignUp';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('Landing', () => Landing, store, Provider);
    Navigation.registerComponent('SignUp', () => SignUp, store, Provider);
}