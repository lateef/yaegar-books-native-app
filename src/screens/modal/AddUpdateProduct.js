import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {
    Grid, Button, Container, Content, Text, Row, Col, Card, CardItem, Body, ListItem, List, Item, Label, Input,
    View, Right, Icon
} from 'native-base';

import * as companyAction from '../../actions/companyActions';
import * as productAction from '../../actions/productActions';
import {dismissAllModals, showModal} from "../../App";
import {ModalComponent} from "./ModalComponent";

export class AddUpdateProduct extends ModalComponent {
    constructor(props) {
        super(props);
        if (!props.currentProduct) {
            this.props.productActions.createProduct();
        } else {
            this.props.productActions.updateProduct(props.currentProduct);
        }
    }

    onChangeName(name) {
        this.props.productActions.updateProductName(name);
    }

    onChangeCostPrice(costPrice) {
        this.props.productActions.updateProductCostPrice(costPrice);
    }

    onChangeSellPrice(sellPrice) {
        this.props.productActions.updateProductSellPrice(sellPrice);
    }

    toggleAddSupplier() {
        const supplier = (this.props.product.supplier !== 'undefined') ? {} : null;
        this.props.productActions.addProductSupplier(this.props.product, supplier);
    }

    showSuppliers(props) {
        showModal('Suppliers', props, 'Suppliers', '#161616');
    }

    recreateProduct() {
        this.props.productActions.resetProduct();
        this.props.productActions.createProduct();
    }

    async save() {
        await this.props.productActions.addProduct(this.props.product);
        this.props.productActions.resetProduct();
        dismissAllModals();
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
                                        <Text style={styles.textCentered}>Add {this.props.text}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Col>
                                            {this.props.product ?
                                                <List>
                                                    <ListItem>
                                                        <Item floatingLabel>
                                                            <Label style={{color: '#9fced0', fontSize: 18}}>Enter {this.props.text} Name </Label>
                                                            <Text/>
                                                            <Text/>
                                                            <Input id="name" value={this.props.product.name}
                                                                   onChangeText={(name) => this.onChangeName(name)}/>
                                                        </Item>
                                                    </ListItem>
                                                    {this.props.product.name ?
                                                        <View>
                                                            <ListItem>
                                                                <Item floatingLabel>
                                                                    <Label style={{color: '#9fced0', fontSize: 18}}>Enter Cost Price </Label>
                                                                    <Text/>
                                                                    <Text/>
                                                                    <Input id="costPrice" value={`${this.props.product.costPrice}`}
                                                                           keyboardType="decimal-pad" onChangeText={(costPrice) => this.onChangeCostPrice(costPrice)}/>
                                                                </Item>
                                                            </ListItem>
                                                            <ListItem>
                                                                <Item floatingLabel>
                                                                    <Label style={{color: '#9fced0', fontSize: 18}}>Enter Sell Price </Label>
                                                                    <Text/>
                                                                    <Text/>
                                                                    <Input id="sellPrice" value={`${this.props.product.sellPrice}`}
                                                                           keyboardType="decimal-pad" onChangeText={(sellPrice) => this.onChangeSellPrice(sellPrice)}/>
                                                                </Item>
                                                            </ListItem>
                                                            {/*<ListItem onPress={() => this.toggleAddSupplier()}>*/}
                                                                {/*<CheckBox checked={!!this.props.product.supplier} onPress={() => this.toggleAddSupplier()}/>*/}
                                                                {/*<Body>*/}
                                                                {/*<Text>Add Supplier</Text>*/}
                                                                {/*</Body>*/}
                                                            {/*</ListItem>*/}
                                                            {!this.props.product.supplier ?
                                                                <ListItem style={{alignItems: 'center'}} itemDivider onPress={() => this.showSuppliers({action: 'prepAddProduct'})}>
                                                                <Body>
                                                                    <Text>Select supplier/Select None</Text>
                                                                </Body>
                                                                <Right>
                                                                    <Icon name="ios-add" style={{fontSize: 30, color: '#4cb528'}}/>
                                                                </Right>
                                                            </ListItem> : <View/>}
                                                            {this.props.product.supplier && this.props.product.supplier.name ?
                                                                <ListItem style={{alignItems: 'center'}} itemDivider onPress={() => this.recreateProduct()}>
                                                                <Body>
                                                                    <Text>{this.props.product.supplier.name}</Text>
                                                                </Body>
                                                                {(typeof this.props.product !== 'undefined') ?
                                                                <Right>
                                                                    <Icon name="ios-close" style={{fontSize: 30, color: '#4cb528'}}/>
                                                                </Right> :<View/>}
                                                            </ListItem> : <View/>}
                                                        </View> : <View/>}
                                                    <ListItem>
                                                        <Body>
                                                        <Button full dark
                                                                disabled={!this.props.product || !this.props.product.name || !this.props.product.supplier}
                                                                onPress={() => this.save()}>
                                                            <Text style={{fontSize: 18, color: '#ffffff'}}>Save</Text>
                                                        </Button>
                                                        </Body>
                                                    </ListItem>
                                            </List> : <View/>}
                                        </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateProduct)

function mapStateToProps(state, ownProps) {
    const index = ownProps.index ? ownProps.index : 0;
    return {
        user: state.userReducer.user,
        product: state.productReducer.product.currentProduct,
        currentCompany: state.companyReducer.company.companies[index],
        error: state.companyReducer.company.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        companyActions: bindActionCreators(companyAction, dispatch),
        productActions: bindActionCreators(productAction, dispatch)
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