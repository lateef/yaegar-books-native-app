import {Navigation} from 'react-native-navigation';

import Dashboard from './Dashboard';
import AccountTypeSelection from './lightboxes/AccountTypeSelection';
import AddAccount from './AddAccount';
import Account from './Account';
import AddTransaction from './AddTransaction';
import TransactionDetail from './TransactionDetail';
import Drawer from './Drawer';
import Settings from './Settings';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('Dashboard', () => Dashboard, store, Provider);
    Navigation.registerComponent('AccountTypeSelection', () => AccountTypeSelection, store, Provider);
    Navigation.registerComponent('AddAccountType', () => AddAccount, store, Provider);
    Navigation.registerComponent('Account', () => Account, store, Provider);
    Navigation.registerComponent('AddTransaction', () => AddTransaction, store, Provider);
    Navigation.registerComponent('TransactionDetail', () => TransactionDetail, store, Provider);
    Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
    Navigation.registerComponent('Settings', () => Settings, store, Provider);
}