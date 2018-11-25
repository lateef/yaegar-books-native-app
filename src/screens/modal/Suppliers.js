import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import uuid from "uuid/v4";
import {
    Grid, Container, Content, Text, Row, Col, Card, CardItem, Body, List, ListItem, Icon, Right
} from 'native-base';

import * as companyAction from '../../actions/companyActions';
import * as ledgerAction from '../../actions/ledgerActions';
import * as productAction from "../../actions/productActions";
import * as purchaseOrderAction from "../../actions/purchaseOrderActions";
import * as supplierAction from '../../actions/supplierActions';
import {dismissModal, showModal} from "../../App";
import {ModalComponent} from "./ModalComponent";

export class Suppliers extends ModalComponent {
    constructor(props) {
        super(props);
    }

    navigationButtonPressed({buttonId}) {
        if ('backButton' === buttonId) {
           this.dismissModal();
        }
    }

    showAddSupplier(props) {
        showModal('AddSupplier', props, props.text, '#161616');
    }

    addSupplier(supplier) {
        if (supplier === 'NONE') {
            supplier = {uuid: uuid(), name: supplier, suppliedToCompany: this.props.currentCompany};
        }
        if (this.props.action === 'prepAddPurchaseOrder') {
            this.props.purchaseOrderActions.addSupplierToPurchaseOrder(this.props.purchaseOrder.currentPurchaseOrder, supplier);
        } else if (this.props.action === 'prepAddProduct') {
            this.props.productActions.addProductSupplier(this.props.currentProduct, supplier)
        }
        this.dismissModal();
    }

    dismissModal() {
        dismissModal(this.props.componentId);
    }

    render() {
        return (
            <Container>
                <Grid style={{justifyContent: 'center', padding: 10}}>
                    <Content contentContainerStyle={{flex: 1, backgroundColor: '#ffffff'}}>
                        <Row size={2}>
                            <Col>
                                <Card>
                                    <CardItem style={{justifyContent: 'center'}}>
                                        <List style={{flex: 1}}>
                                            <ListItem style={{alignItems: 'center'}} itemDivider onPress={() => this.showAddSupplier({text: 'Supplier'})}>
                                                <Body>
                                                    <Text>Add a new supplier</Text>
                                                </Body>
                                                <Right>
                                                    <Icon name="ios-add" style={{fontSize: 30, color: '#4cb528'}}/>
                                                </Right>
                                            </ListItem>
                                        </List>
                                    </CardItem>
                                    <CardItem header bordered>
                                        <Text style={styles.textCentered}>Suppliers</Text>
                                    </CardItem>
                                    <CardItem style={{justifyContent: 'center'}}>
                                        <List style={{flex: 1}}>
                                                <ListItem style={{alignItems: 'center'}} onPress={() => {this.addSupplier('NONE')}}>
                                                <Body>
                                                <Text>No supplier</Text>
                                                </Body>
                                                <Right>
                                                    <Icon name="ios-arrow-round-forward" style={{fontSize: 30, color: '#4cb528'}}/>
                                                </Right>
                                            </ListItem>
                                            {this.props.suppliers.map((supplier, i) =>
                                                <ListItem key={i} style={{alignItems: 'center'}} onPress={() => {this.addSupplier(supplier)}}>
                                                    <Body>
                                                    <Text>{supplier.name}</Text>
                                                    </Body>
                                                    <Right>
                                                        <Icon name="ios-arrow-round-forward" style={{fontSize: 30, color: '#4cb528'}}/>
                                                    </Right>
                                                </ListItem>)}
                                        </List>
                                    </CardItem>
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

    componentDidAppear() {
        this.props.supplierActions.getSuppliers(this.props.currentCompany.uuid);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers)

function mapStateToProps(state, ownProps) {
    const index = ownProps.index ? ownProps.index : 0;
    return {
        currentCompany: state.companyReducer.company.companies[index],
        currentProduct: state.productReducer.product.currentProduct,
        purchaseOrder: state.purchaseOrderReducer.purchaseOrder,
        suppliers: state.supplierReducer.supplier.suppliers,
        error: state.supplierReducer.supplier.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        companyActions: bindActionCreators(companyAction, dispatch),
        ledgerActions: bindActionCreators(ledgerAction, dispatch),
        productActions: bindActionCreators(productAction, dispatch),
        purchaseOrderActions: bindActionCreators(purchaseOrderAction, dispatch),
        supplierActions: bindActionCreators(supplierAction, dispatch)
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