import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {
    Grid, Button, Container, Content, Text, Row, Col, Card, CardItem, Body, Item, Label, Input
} from 'native-base';

import {ModalComponent} from "./ModalComponent";
import * as purchaseOrderAction from "../../actions/purchaseOrderActions";

export class AddPurchaseOrderLineItem extends ModalComponent {

    constructor(props) {
        super(props);
        this.props.purchaseOrderActions.createPurchaseOrderLineItem(this.props.currentProduct, "PRODUCT");
    }

    onChangeQuantity(quantity) {
        this.props.purchaseOrderActions.updatePurchaseOrderLineItemQuantity(quantity);
        this.props.purchaseOrderActions.updatePurchaseOrderLineItemSubTotal(
            quantity, this.props.currentPurchaseOrder.currentPurchaseOrderLineItem.unitPrice
        );
    }

    onChangeUnitPrice(unitPrice) {
        this.props.purchaseOrderActions.updatePurchaseOrderLineItemUnitPrice(unitPrice);
        this.props.purchaseOrderActions.updatePurchaseOrderLineItemSubTotal(
            this.props.currentPurchaseOrder.currentPurchaseOrderLineItem.quantity, unitPrice
        );
    }

    addLineItemToPurchaseOrder() {
        this.props.purchaseOrderActions.addLineItemToPurchaseOrder(
            this.props.currentPurchaseOrder,
            this.props.currentPurchaseOrder.currentPurchaseOrderLineItem);
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
                                        <Text style={styles.textCentered}>Add to purchase order</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <Text>{this.props.currentProduct.name}</Text>
                                        <Text/>
                                        <Text>Cost Price: {this.props.currentProduct.costPrice}</Text>
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
                                        <Text>Unit price: {this.props.currentPurchaseOrder.currentPurchaseOrderLineItem
                                        && this.props.currentPurchaseOrder.currentPurchaseOrderLineItem.unitPrice}</Text>
                                        <Text/>
                                        <Text>Sub total price: {this.props.currentPurchaseOrder.currentPurchaseOrderLineItem
                                        && this.props.currentPurchaseOrder.currentPurchaseOrderLineItem.subTotal}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <Button full dark disabled={!this.props.currentPurchaseOrder.currentPurchaseOrderLineItem || !this.props.currentPurchaseOrder.currentPurchaseOrderLineItem.quantity
                                        || !this.props.currentPurchaseOrder.currentPurchaseOrderLineItem.unitPrice}
                                                onPress={() => this.addLineItemToPurchaseOrder()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddPurchaseOrderLineItem)

function mapStateToProps(state, ownProps) {
    return {
        currentPurchaseOrder: state.purchaseOrderReducer.purchaseOrder.currentPurchaseOrder,
        error: state.purchaseOrderReducer.purchaseOrder.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
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