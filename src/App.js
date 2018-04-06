import React, {Component} from 'react';

import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import store from './store';
import * as appAction from './actions/appActions';
import {registerScreens} from './screens';
import { iconsMap, iconsLoaded } from './util/app-icons';

registerScreens(store, Provider);

export default class App extends Component {
    constructor(props) {
        super(props);
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appAction.onInit());
    }

    async onStoreUpdate() {
        let {root} = store.getState().appReducer;
        if (this.currentRoot !== root) {
            this.currentRoot = root;

            this.startApp(root);
        }
    }

    startApp(navigation) {

        Navigation.startSingleScreenApp({
            screen: {
                label: 'Landing',
                screen: 'Landing'
            },
            drawer: {
                left: {
                    screen: 'Drawer'
                }
            }
        });
    }
}
