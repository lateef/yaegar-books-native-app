import React, {Component} from 'react';

import {Navigation} from 'react-native-navigation';

import {registerScreens} from './screens';
import {iconsMap, iconsLoaded} from './util/app-icons';

registerScreens();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.startApp();

    }

    startApp() {
        Navigation.startSingleScreenApp({
            screen: {
                label: 'Landing',
                screen: 'Landing'
            }
        });
    }
}