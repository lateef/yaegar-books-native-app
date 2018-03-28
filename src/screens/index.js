import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';

import Landing from './Landing';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('Landing', () => Landing, store, Provider);
}