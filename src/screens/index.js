import React from 'react';
import {Navigation} from "react-native-navigation";
import {persistStore} from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import store from '../store';
import Initializing from "./Initializing";
import SignUp from "./SignUp";
import SignUpComplete from "./SignUpComplete";
import SignIn from "./SignIn";
import Home from "./Home";
import Drawer from "./Drawer";
import AddCompany from "./modal/AddCompany";
import Business from "./Business";
import AssetType from "./modal/AssetType";
import Products from "./modal/Products";
import AddUpdateProduct from "./modal/AddUpdateProduct";
import UpdateLedger from "./modal/UpdateLedger";
import AddAsset from "./AddAsset";
import UpdateText from "./modal/UpdateText";
import Suppliers from "./modal/Suppliers";
import Customers from "./modal/Customers";
import AddSupplier from "./modal/AddSupplier";
import AddCustomer from "./modal/AddCustomer";
import AddPurchaseOrderLineItem from "./modal/AddPurchaseOrderLineItem";
import AddSalesOrderLineItem from "./modal/AddSalesOrderLineItem";

const persistor = persistStore(store);

const createApp = (Component, ...props) => {
    return class App extends React.Component<TProps> {
        render() {
            return (
                <Provider store={store}>
                    <PersistGate
                        loading={null} persistor={persistor}>
                        <Component {...{
                            ...this.props,
                            ...props,
                        }} />
                    </PersistGate>
                </Provider>
            );
        }
    }
};

export function registerScreens() {
    Navigation.registerComponent('Initializing', () => createApp(Initializing));
    Navigation.registerComponent('SignUp', () => createApp(SignUp));
    Navigation.registerComponent('SignUpComplete', () => createApp(SignUpComplete));
    Navigation.registerComponent('SignIn', () => createApp(SignIn));
    Navigation.registerComponent('Home', () => createApp(Home));
    Navigation.registerComponent('Drawer', () => createApp(Drawer));
    Navigation.registerComponent('AddCompany', () => createApp(AddCompany));
    Navigation.registerComponent('Business', () => createApp(Business));
    Navigation.registerComponent('AssetType', () => createApp(AssetType));
    Navigation.registerComponent('Products', () => createApp(Products));
    Navigation.registerComponent('AddUpdateProduct', () => createApp(AddUpdateProduct));
    Navigation.registerComponent('UpdateLedger', () => createApp(UpdateLedger));
    Navigation.registerComponent('AddAsset', () => createApp(AddAsset));
    Navigation.registerComponent('UpdateText', () => createApp(UpdateText));
    Navigation.registerComponent('Suppliers', () => createApp(Suppliers));
    Navigation.registerComponent('Customers', () => createApp(Customers));
    Navigation.registerComponent('AddSupplier', () => createApp(AddSupplier));
    Navigation.registerComponent('AddCustomer', () => createApp(AddCustomer));
    Navigation.registerComponent('AddPurchaseOrderLineItem', () => createApp(AddPurchaseOrderLineItem));
    Navigation.registerComponent('AddSalesOrderLineItem', () => createApp(AddSalesOrderLineItem));
}