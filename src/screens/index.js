import {Navigation} from 'react-native-navigation';

import Dashboard from './Dashboard';
import AccountTypeSelection from './lightboxes/AccountTypeSelection';
import AddAccount from './AddAccount';
import Account from './Account';
import Transaction from './Transaction';
// import Drawer from './Drawer';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('Dashboard', () => Dashboard, store, Provider);
    Navigation.registerComponent('AccountTypeSelection', () => AccountTypeSelection, store, Provider);
    Navigation.registerComponent('AddAccountType', () => AddAccount, store, Provider);
    Navigation.registerComponent('Account', () => Account, store, Provider);
    Navigation.registerComponent('Transaction', () => Transaction, store, Provider);
    // Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
}