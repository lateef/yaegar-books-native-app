import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {
    Grid, Container, Content, Text, Row, Col, Card, Body, Right, Left, List, ListItem, Icon, View
} from 'native-base';

import * as companyAction from '../../actions/companyActions';
import * as ledgerAction from '../../actions/ledgerActions';
import * as productAction from "../../actions/productActions";
import * as purchaseOrderAction from "../../actions/purchaseOrderActions";
import {dismissModal, showModal} from "../../App";
import {ModalComponent} from "./ModalComponent";

export class Products extends ModalComponent {
    constructor(props) {
        super(props);
        const supplier = (this.props.purchaseOrder.currentPurchaseOrder) ? this.props.purchaseOrder.currentPurchaseOrder.supplier : null;
        if (this.props.action === 'prepProduct') {
            this.props.productActions.getProducts(this.getLedgerUuid('Sales Income'), null);
        } else {
            this.props.productActions.getProducts(this.getLedgerUuid('Sales Income'), supplier);
        }
    }

    getLedgerUuid(ledgerName) {
        return ledgerAction.findLedgerByName(
            this.props.currentCompany.chartOfAccounts.ledgers, ledgerName
        ).uuid;
    }

    processProduct(props) {
        if (this.props.action === 'prepAddPurchaseOrder' && props.currentProduct) {
            showModal('AddPurchaseOrderLineItem', props, props.text, '#161616');
        } else if (this.props.action === 'prepAddSalesOrder') {
            showModal('AddSalesOrderLineItem', props, props.text, '#161616');
        } else if (this.props.action === 'prepProduct' || !props.currentProduct) {
            showModal('AddUpdateProduct', props, props.text, '#161616');
        }
    }

    dismissModal() {
        dismissModal(this.props.componentId);
    }

    render() {
        return (
            <Container>
                <Grid style={{justifyContent: 'center', padding: 10}}>
                    <Content>
                        <Row size={1}>
                            <Text/>
                        </Row>
                        <Row size={2}>
                            <Col>
                                <Card>
                                    <List style={{flex: 1}}>
                                        <ListItem style={{alignItems: 'center'}} itemDivider onPress={() => this.processProduct({name: 'Purchases', text: 'Product/Service'})}>
                                            <Body>
                                            <Text>Add products/services</Text>
                                            </Body>
                                            {this.props.action !== 'prepAddSalesOrder' ?
                                                <Right>
                                                <Icon name="ios-add" style={{fontSize: 30, color: '#4cb528'}}/>
                                            </Right> : <View/>}
                                        </ListItem>
                                        {this.props.products && this.props.products.map((product, i) =>
                                            <ListItem key={i} style={{alignItems: 'center'}} onPress={() => this.processProduct({name: 'Sales Income', text: 'Product/Service', currentProduct: product})}>
                                                <Left>
                                                    <Text>{product.name}</Text>
                                                </Left>
                                                <Right>
                                                    <Icon name="ios-arrow-round-forward" style={{fontSize: 30, color: '#4cb528'}}/>
                                                </Right>
                                            </ListItem>)}
                                        </List>
                                </Card>
                            </Col>
                        </Row>
                        <Row size={1}>
                        </Row>
                    </Content>
                </Grid>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)

function mapStateToProps(state, ownProps) {
    const index = ownProps.index ? ownProps.index : 0;
    return {
        user: state.userReducer.user,
        ledger: state.ledgerReducer.ledger,
        currentCompany: state.companyReducer.company.companies[index],
        currentProduct: state.productReducer.product.currentProduct,
        products: state.productReducer.product.products,
        purchaseOrder: state.purchaseOrderReducer.purchaseOrder,
        error: state.companyReducer.company.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        companyActions: bindActionCreators(companyAction, dispatch),
        ledgerActions: bindActionCreators(ledgerAction, dispatch),
        productActions: bindActionCreators(productAction, dispatch),
        purchaseOrderActions: bindActionCreators(purchaseOrderAction, dispatch)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    h1: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    },
    text: {
        textAlign: 'left',
        color: '#161616',
        fontSize: 18
    },
    textCentered: {
        textAlign: 'center',
        color: '#161616',
        fontSize: 18
    }
});