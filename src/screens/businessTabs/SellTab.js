import React from "react";
import {StyleSheet} from 'react-native';
import {
    Body, Card, CardItem, Col, Container, Content, Grid, Icon, List, ListItem, Right, Left, Row, Text, View, Button
} from 'native-base';
import {showModal} from "../../App";

export class SellTab extends React.Component {
    constructor(props) {
        super(props);
    }

    initSalesOrder() {
        this.props.props.salesOrderActions.initSalesOrder();
    }

    resetSalesOrder() {
        this.props.props.salesOrderActions.resetSalesOrder();
    }

    showCustomers(props) {
        showModal('Customers', props, 'Customers', '#161616');
    }

    showAddProductModal(props) {
        showModal('Products', props, 'Products/Services', '#161616');
    }

    goToBusiness(props) {
        showModal('AddCompany', props, 'Company', '#161616');
    }

    addSalesOrder() {
        this.props.props.salesOrderActions.addSalesOrder(this.props.props.currentSalesOrder);
        this.resetSalesOrder();
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
                                                    {(typeof this.props.props.currentSalesOrder === 'undefined') ?
                                                        <Text style={{fontSize: 17}}>Raise a sales order</Text>
                                                        :
                                                        <Text
                                                            style={{fontSize: 17}}>Total: {this.props.props.currentSalesOrder.totalPrice}</Text>}

                                                    </Body>
                                                    {(typeof this.props.props.currentSalesOrder !== 'undefined') ?
                                                        <Right>
                                                            <Icon name="ios-close"
                                                                  style={{fontSize: 30, color: '#4cb528'}}
                                                                  onPress={() => this.resetSalesOrder()}/>
                                                        </Right> : <View/>}
                                                </CardItem>
                                                {(typeof this.props.props.currentSalesOrder === 'undefined') ?
                                                    <List style={{flex: 1}}>
                                                        <ListItem style={{alignItems: 'center'}} itemDivider
                                                                  onPress={() => this.initSalesOrder()}>
                                                            <Body>
                                                            <Text>Create Sales Order</Text>
                                                            </Body>
                                                            <Right>
                                                                <Icon name="ios-add"
                                                                      style={{fontSize: 30, color: '#4cb528'}}/>
                                                            </Right>
                                                        </ListItem>
                                                    </List> : <View/>}
                                                {(typeof this.props.props.currentSalesOrder !== 'undefined' && typeof this.props.props.currentSalesOrder.customer === 'undefined') ?
                                                    <List style={{flex: 1}}>
                                                        <ListItem style={{alignItems: 'center'}} itemDivider
                                                                  onPress={() => this.showCustomers({action: 'prepAddSalesOrder'})}>
                                                            <Body>
                                                            <Text>Select customer</Text>
                                                            </Body>
                                                            <Right>
                                                                <Icon name="ios-add"
                                                                      style={{fontSize: 30, color: '#4cb528'}}/>
                                                            </Right>
                                                        </ListItem>
                                                    </List> : <View/>}
                                                {(typeof this.props.props.currentSalesOrder !== 'undefined' && typeof this.props.props.currentSalesOrder.customer !== 'undefined') ?
                                                    <List style={{flex: 1}}>
                                                        <ListItem style={{alignItems: 'center'}} itemDivider>
                                                            <Body>
                                                            <Text>{this.props.props.currentSalesOrder.customer.name}</Text>
                                                            </Body>
                                                        </ListItem>
                                                        <ListItem style={{alignItems: 'center'}}
                                                                  onPress={() => this.showAddProductModal({action: 'prepAddSalesOrder'})}>
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
                                                    {typeof this.props.props.currentSalesOrder !== 'undefined' && this.props.props.currentSalesOrder.lineItems && this.props.props.currentSalesOrder.lineItems.map((lineItem, i) =>
                                                        <ListItem key={i} style={{alignItems: 'center'}}
                                                                  onPress={() => {
                                                                  }}>
                                                            <Left>
                                                                <Text
                                                                    style={{fontSize: 16}}>{lineItem.product.name}</Text>
                                                            </Left>
                                                            <Body>
                                                            <Text style={{fontSize: 16}}>
                                                                Q: {lineItem.quantity}
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
                                                        <Button full dark
                                                                disabled={!this.props.props.currentSalesOrder ||
                                                                !this.props.props.currentSalesOrder.lineItems || !this.props.props.currentSalesOrder.lineItems.length > 0}
                                                                onPress={() => this.addSalesOrder()}>
                                                            <Text style={{fontSize: 18, color: '#ffffff'}}>Add Sales Order</Text>
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
