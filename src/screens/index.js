import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';

import Landing from './Landing';

export function registerScreens() {
    Navigation.registerComponent('Landing', () => Landing);
}