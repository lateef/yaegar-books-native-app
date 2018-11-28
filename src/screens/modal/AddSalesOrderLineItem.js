import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {
    Grid, Button, Container, Content, Text, Row, Col, Card, CardItem, Body, Item, Label, Input
} from 'native-base';

import {ModalComponent} from "./ModalComponent";
import * as salesOrderAction from "../../actions/salesOrderActions";

export class AddSalesOrderLineItem extends ModalComponent {

    constructor(props) {
        super(props);
        this.props.salesOrderActions.createSalesOrderLineItem(this.props.currentProduct, "PRODUCT");
    }

    onChangeQuantity(quantity) {
        this.props.salesOrderActions.updateSalesOrderLineItemQuantity(quantity);
        this.props.salesOrderActions.updateSalesOrderLineItemSubTotal(
            quantity, this.props.currentSalesOrder.currentSalesOrderLineItem.unitPrice
        );
    }

    onChangeUnitPrice(unitPrice) {
        this.props.salesOrderActions.updateSalesOrderLineItemUnitPrice(unitPrice);
        this.props.salesOrderActions.updateSalesOrderLineItemSubTotal(
            this.props.currentSalesOrder.currentSalesOrderLineItem.quantity, unitPrice
        );
    }

    addLineItemToSalesOrder() {
        this.props.salesOrderActions.addLineItemToSalesOrder(
            this.props.currentSalesOrder,
            this.props.currentSalesOrder.currentSalesOrderLineItem);
        this.dismissAllModals();
    }

    render() {
        return (
            <Container>
                <Grid style={{justifyContent: 'center', padding: 10}}>
                    <Content contentContainerStyle={{flex: 1, backgroundColor: '#ffffff'}}>
                        <Row size={2}>
                            <Col>
                                <Card>
                                    <CardItem header bordered>
                                        <Text style={styles.textCentered}>Add to sales order</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <Text>{this.props.currentProduct.name}</Text>
                                        <Text/>
                                        <Text>Sell Price: {this.props.currentProduct.sellPrice}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Item floatingLabel>
                                            <Label style={{color: '#9fced0', fontSize: 18}}>Quantity</Label>
                                            <Text/>
                                            <Text/>
                                            <Input id="quantity"
                                                   onChangeText={(quantity) => this.onChangeQuantity(quantity)}/>
                                        </Item>
                                    </CardItem>
                                    <CardItem>
                                        <Item floatingLabel>
                                            <Label style={{color: '#9fced0', fontSize: 18}}>Unit price</Label>
                                            <Text/>
                                            <Text/>
                                            <Input id="unitPrice"
                                                   onChangeText={(unitPrice) => this.onChangeUnitPrice(unitPrice)}/>
                                        </Item>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <Text>Unit price: {this.props.currentSalesOrder.currentSalesOrderLineItem
                                        && this.props.currentSalesOrder.currentSalesOrderLineItem.unitPrice}</Text>
                                        <Text/>
                                        <Text>Sub total price: {this.props.currentSalesOrder.currentSalesOrderLineItem
                                        && this.props.currentSalesOrder.currentSalesOrderLineItem.subTotal}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <Button full dark disabled={!this.props.currentSalesOrder.currentSalesOrderLineItem || !this.props.currentSalesOrder.currentSalesOrderLineItem.quantity
                                        || !this.props.currentSalesOrder.currentSalesOrderLineItem.unitPrice}
                                                onPress={() => this.addLineItemToSalesOrder()}>
                                            <Text style={{fontSize: 18, color: '#ffffff'}}>Add to order</Text>
                                        </Button>
                                        </Body>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSalesOrderLineItem)

function mapStateToProps(state, ownProps) {
    return {
        currentSalesOrder: state.salesOrderReducer.salesOrder.currentSalesOrder,
        error: state.salesOrderReducer.salesOrder.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        salesOrderActions: bindActionCreators(salesOrderAction, dispatch)
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
        fontSize: 24
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