import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';

import store from './store';
import * as appAction from './actions/appActions';
import {registerScreens} from './screens';
import {iconsMap, iconsLoaded} from './util/app-icons';

export default class App extends React.Component {
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
        persistStore(store, null, () => {
            registerScreens(store, Provider);
            switch (navigation) {
                default:
                    Navigation.startSingleScreenApp({
                        screen: {
                            label: 'Dashboard',
                            screen: 'Dashboard'
                        },
                        drawer: {
                            left: {
                                screen: 'Drawer'
                            },
                            disableOpenGesture: true
                        }
                    });
            }
        })
    }
}
