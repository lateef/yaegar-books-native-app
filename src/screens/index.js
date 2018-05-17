import {Navigation} from 'react-native-navigation';

import Dashboard from './Dashboard';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('Dashboard', () => Dashboard, store, Provider);
}