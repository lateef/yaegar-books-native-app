import React from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, ScrollableTab, Tabs, Tab} from 'native-base';
import {Navigation} from "react-native-navigation";

import * as ledgerAction from '../actions/ledgerActions';
import * as purchaseOrderAction from "../actions/purchaseOrderActions";
import {AssetsTab} from "./businessTabs/AssetsTab";
import {BuyTab} from "./businessTabs/BuyTab";
import {SellTab} from "./businessTabs/SellTab";
import {ProductsTab} from "./businessTabs/ProductsTab";

export class Business extends React.Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({buttonId}) {
        if ('menu' === buttonId) {
            if (Platform.OS === 'android') {
                Navigation.mergeOptions("homeSideMenu", {
                    sideMenu: {
                        left: {
                            visible: true
                        },
                        right: {
                            visible: false
                        }
                    }
                });
            } else {
                Navigation.mergeOptions("homeSideMenu", {
                    sideMenu: {
                        left: {
                            visible: true
                        }
                    }
                });
            }
        } else if ('notificationMenu' === buttonId) {
            if (Platform.OS === 'android') {
                Navigation.mergeOptions("homeSideMenu", {
                    sideMenu: {
                        right: {
                            visible: true
                        },
                        left: {
                            visible: false
                        }
                    }
                });
            } else {
                Navigation.mergeOptions("homeSideMenu", {
                    sideMenu: {
                        right: {
                            visible: true
                        }
                    }
                });
            }
        }
    }

    render() {
        return (
            <Container>
                <Tabs renderTabBar={()=> <ScrollableTab />}>
                    <Tab heading="Sell">
                        <SellTab  props={this.props}/>
                    </Tab>
                    <Tab heading="Buy">
                        <BuyTab  props={this.props}/>
                    </Tab>
                    <Tab heading="Products">
                        <ProductsTab  props={this.props}/>
                    </Tab>
                    <Tab heading="Bank/Cash">
                        <AssetsTab props={this.props}/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Business)

function mapStateToProps(state, ownProps) {
    const index = (ownProps.index) ? ownProps.index : 0;
    return {
        // user: state.userReducer.user,
        currentCompany: state.companyReducer.company.companies[index],
        product: state.productReducer.product.currentProduct,
        currentPurchaseOrder: state.purchaseOrderReducer.purchaseOrder.currentPurchaseOrder,
        banks: ledgerAction.listCompanyLedgersByParentName(state.companyReducer.company.companies[index], 'Bank'),
        cash: ledgerAction.listCompanyLedgersByParentName(state.companyReducer.company.companies[index], 'Cash'),
        revenue: ledgerAction.listCompanyLedgersByParentName(state.companyReducer.company.companies[index], 'Sales Income'),
        // ledger: state.ledgerReducer.ledger
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ledgerActions: bindActionCreators(ledgerAction, dispatch),
        purchaseOrderActions: bindActionCreators(purchaseOrderAction, dispatch)
    };
}