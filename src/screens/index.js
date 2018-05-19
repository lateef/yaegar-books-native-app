import {Navigation} from 'react-native-navigation';

import Dashboard from './Dashboard';
import AccountTypeSelection from './lightboxes/AccountTypeSelection';
import AddAccountType from './AddAccountType';
// import Drawer from './Drawer';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('Dashboard', () => Dashboard, store, Provider);
    Navigation.registerComponent('AccountTypeSelection', () => AccountTypeSelection, store, Provider);
    Navigation.registerComponent('AddAccountType', () => AddAccountType, store, Provider);
    // Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
}