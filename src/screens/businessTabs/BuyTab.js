import React from "react";
import {StyleSheet} from 'react-native';
import {
    Container, Text, Grid, Content, Row, Col, Card, CardItem, Body, View, List, ListItem, Left, Right, Icon, Button
} from 'native-base';

import {showModal} from "../../App";

export class BuyTab extends React.Component {
    constructor(props) {
        super(props);
    }

    initPurchaseOrder() {
        this.props.props.purchaseOrderActions.initPurchaseOrder();
    }

    resetPurchaseOrder() {
        this.props.props.purchaseOrderActions.resetPurchaseOrder();
    }

    showSuppliers(props) {
        showModal('Suppliers', props, 'Suppliers', '#161616');
    }

    showAddProductModal(props) {
        showModal('Products', props, 'Products/Services', '#161616');
    }

    goToBusiness(props) {
        showModal('AddCompany', props, 'Company', '#161616');
    }

    addPurchaseOrder() {
        this.props.props.purchaseOrderActions.addPurchaseOrder(this.props.props.currentPurchaseOrder);
        this.resetPurchaseOrder();
    }

    render() {
        return (
            <Container>
                <Content>
                    <Grid style={{justifyContent: 'center', padding: 10}}>
                        <Content>
                            <Row size={1}>
                                <Text/>
                            </Row>
                            <Row size={2}>
                                <Col>
                                    <Card>
                                        {(!this.props.props.currentCompany || !this.props.props.currentCompany.companyId) ?
                                            <View>
                                                <CardItem header bordered>
                                                    <Text style={styles.textCentered}>Business setup</Text>
                                                </CardItem>
                                                <CardItem style={{justifyContent: 'center'}}>
                                                    <Body>
                                                    <Button id='addBusinessButton' full dark
                                                            onPress={() => this.goToBusiness()}>
                                                        <Text style={{fontSize: 18, color: '#FFFFFF'}}>Add business/company</Text>
                                                    </Button>
                                                    </Body>
                                                </CardItem>
                                            </View>
                                            :
                                            <View>
                                                <CardItem header bordered>
                                                    <Body style={styles.textCentered}>
                                                    {(typeof this.props.props.currentPurchaseOrder === 'undefined') ?
                                                        <Text style={{fontSize: 17}}>Raise a purchase order</Text>
                                                        :
                                                        <Text style={{fontSize: 17}}>Total: {this.props.props.currentPurchaseOrder.totalPrice}</Text>}

                                                    </Body>
                                                    {(typeof this.props.props.currentPurchaseOrder !== 'undefined') ?
                                                        <Right>
                                                            <Icon name="ios-close"
                                                                  style={{fontSize: 30, color: '#4cb528'}}
                                                                  onPress={() => this.resetPurchaseOrder()}/>
                                                        </Right> : <View/>}
                                                </CardItem>
                                                {(typeof this.props.props.currentPurchaseOrder === 'undefined') ?
                                                    <List style={{flex: 1}}>
                                                        <ListItem style={{alignItems: 'center'}} itemDivider
                                                                  onPress={() => this.initPurchaseOrder()}>
                                                            <Body>
                                                            <Text>Create Purchase Order</Text>
                                                            </Body>
                                                            <Right>
                                                                <Icon name="ios-add"
                                                                      style={{fontSize: 30, color: '#4cb528'}}/>
                                                            </Right>
                                                        </ListItem>
                                                    </List> : <View/>}
                                                {(typeof this.props.props.currentPurchaseOrder !== 'undefined' && typeof this.props.props.currentPurchaseOrder.supplier === 'undefined') ?
                                                    <List style={{flex: 1}}>
                                                        <ListItem style={{alignItems: 'center'}} itemDivider
                                                                  onPress={() => this.showSuppliers({action: 'prepAddPurchaseOrder'})}>
                                                            <Body>
                                                            <Text>Select supplier</Text>
                                                            </Body>
                                                            <Right>
                                                                <Icon name="ios-add"
                                                                      style={{fontSize: 30, color: '#4cb528'}}/>
                                                            </Right>
                                                        </ListItem>
                                                    </List> : <View/>}
                                                {(typeof this.props.props.currentPurchaseOrder !== 'undefined' && typeof this.props.props.currentPurchaseOrder.supplier !== 'undefined') ?
                                                    <List style={{flex: 1}}>
                                                        <ListItem style={{alignItems: 'center'}} itemDivider>
                                                            <Body>
                                                            <Text>{this.props.props.currentPurchaseOrder.supplier.name}</Text>
                                                            </Body>
                                                        </ListItem>
                                                        <ListItem style={{alignItems: 'center'}}
                                                                  onPress={() => this.showAddProductModal({action: 'prepAddPurchaseOrder'})}>
                                                            <Body>
                                                            <Text>Add products or services</Text>
                                                            </Body>
                                                            <Right>
                                                                <Icon name="ios-add"
                                                                      style={{fontSize: 30, color: '#4cb528'}}/>
                                                            </Right>
                                                        </ListItem>
                                                    </List> : <View/>}
                                                <List>
                                                    {typeof this.props.props.currentPurchaseOrder !== 'undefined' && this.props.props.currentPurchaseOrder.lineItems && this.props.props.currentPurchaseOrder.lineItems.map((lineItem, i) =>
                                                        <ListItem key={i} style={{alignItems: 'center'}}
                                                                  onPress={() => {
                                                                  }}>
                                                            <Left>
                                                                <Text style={{fontSize: 16}}>{lineItem.product.name}</Text>
                                                            </Left>
                                                            <Body>
                                                            <Text style={{fontSize: 16}}>
                                                                Q:   {lineItem.quantity}
                                                                </Text>
                                                            <Text style={{fontSize: 16}}>Sub total: {lineItem.subTotal}
                                                                </Text>
                                                            </Body>
                                                            <Right>
                                                                <Icon name="ios-close"
                                                                      style={{fontSize: 30, color: '#4cb528'}}/>
                                                            </Right>
                                                        </ListItem>)}
                                                    <ListItem>
                                                        <Body>
                                                        <Button full dark disabled={!this.props.props.currentPurchaseOrder ||
                                                        !this.props.props.currentPurchaseOrder.lineItems || !this.props.props.currentPurchaseOrder.lineItems.length > 0}
                                                                onPress={() => this.addPurchaseOrder()}>
                                                            <Text style={{fontSize: 18, color: '#ffffff'}}>Add Purchase Order</Text>
                                                        </Button>
                                                        </Body>
                                                    </ListItem>
                                                </List>
                                            </View>}
                                    </Card>
                                </Col>
                            </Row>
                        </Content>
                    </Grid>
                </Content>
            </Container>
        );
    }
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
