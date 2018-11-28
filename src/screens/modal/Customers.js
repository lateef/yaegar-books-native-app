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
import * as salesOrderAction from "../../actions/salesOrderActions";
import * as customerAction from '../../actions/customerActions';
import {dismissModal, showModal} from "../../App";
import {ModalComponent} from "./ModalComponent";

export class Customers extends ModalComponent {
    constructor(props) {
        super(props);
    }

    navigationButtonPressed({buttonId}) {
        if ('backButton' === buttonId) {
           this.dismissModal();
        }
    }

    showAddCustomer(props) {
        showModal('AddCustomer', props, props.text, '#161616');
    }

    addCustomer(customer) {
        if (customer === 'NONE') {
            customer = {uuid: uuid(), name: customer, company: this.props.currentCompany};
        }
        if (this.props.action === 'prepAddSalesOrder') {
            this.props.salesOrderActions.addCustomerToSalesOrder(this.props.salesOrder.currentSalesOrder, customer);
        } else if (this.props.action === 'prepAddProduct') {
            this.props.productActions.addProductCustomer(this.props.currentProduct, customer)
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
                                            <ListItem style={{alignItems: 'center'}} itemDivider onPress={() => this.showAddCustomer({text: 'Customer'})}>
                                                <Body>
                                                    <Text>Add a new customer</Text>
                                                </Body>
                                                <Right>
                                                    <Icon name="ios-add" style={{fontSize: 30, color: '#4cb528'}}/>
                                                </Right>
                                            </ListItem>
                                        </List>
                                    </CardItem>
                                    <CardItem header bordered>
                                        <Text style={styles.textCentered}>Customers</Text>
                                    </CardItem>
                                    <CardItem style={{justifyContent: 'center'}}>
                                        <List style={{flex: 1}}>
                                                <ListItem style={{alignItems: 'center'}} onPress={() => {this.addCustomer('NONE')}}>
                                                <Body>
                                                <Text>No customer</Text>
                                                </Body>
                                                <Right>
                                                    <Icon name="ios-arrow-round-forward" style={{fontSize: 30, color: '#4cb528'}}/>
                                                </Right>
                                            </ListItem>
                                            {this.props.customers.map((customer, i) =>
                                                <ListItem key={i} style={{alignItems: 'center'}} onPress={() => {this.addCustomer(customer)}}>
                                                    <Body>
                                                    <Text>{customer.name}</Text>
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
        this.props.customerActions.getCustomers(this.props.currentCompany.uuid);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers)

function mapStateToProps(state, ownProps) {
    const index = ownProps.index ? ownProps.index : 0;
    return {
        currentCompany: state.companyReducer.company.companies[index],
        currentProduct: state.productReducer.product.currentProduct,
        salesOrder: state.salesOrderReducer.salesOrder,
        customers: state.customerReducer.customer.customers,
        error: state.customerReducer.customer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        companyActions: bindActionCreators(companyAction, dispatch),
        ledgerActions: bindActionCreators(ledgerAction, dispatch),
        productActions: bindActionCreators(productAction, dispatch),
        salesOrderActions: bindActionCreators(salesOrderAction, dispatch),
        customerActions: bindActionCreators(customerAction, dispatch)
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