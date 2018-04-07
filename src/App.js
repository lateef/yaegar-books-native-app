import React, {Component} from 'react';

import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import store from './store';
import * as appAction from './actions/appActions';
import {registerScreens} from './screens';
import {iconsMap, iconsLoaded} from './util/app-icons';

registerScreens(store, Provider);

export default class App extends Component {
    constructor(props) {
        super(props);
        iconsLoaded.then(() => {});
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appAction.onInit());
    }

    onStoreUpdate() {
        let {root} = store.getState().appReducer;
        if (this.currentRoot !== root) {
            this.currentRoot = root;

            this.startApp(root);
        }
    }

    startApp(navigation) {
        switch (navigation) {
            case 'tabbed':
                Navigation.startTabBasedApp({
                    tabs: [
                        {
                            label: 'Dashboard',
                            icon: iconsMap['ios-desktop'],
                            screen: 'Dashboard'
                        }
                    ]
                });
                return;
            default :
                Navigation.startSingleScreenApp({
                    screen: {
                        label: 'Landing',
                        screen: 'Landing'
                    },
                    drawer: {
                        left: {
                            screen: 'Drawer'
                        },
                        disableOpenGesture: true
                    }
                });
        }
    }
}
