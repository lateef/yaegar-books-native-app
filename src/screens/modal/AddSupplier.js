import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {
    Grid, Button, Container, Content, Text, Row, Col, Card, CardItem, Body, ListItem, List, Item, Label, Input
} from 'native-base';

import * as supplierAction from '../../actions/supplierActions';
import {ModalComponent} from "./ModalComponent";

export class AddSupplier extends ModalComponent {
    supplier = {};

    constructor(props) {
        super(props);
        if (!this.props.currentCompany) return;//should actually get from rest end
        this.supplier.suppliedToCompany = {uuid: this.props.currentCompany.uuid};
        this.props.supplierActions.updateSupplier(this.supplier);
    }

    onChangeName(name) {
        this.supplier.name = name;
        this.props.supplierActions.updateSupplier(this.supplier);
    }

    async save() {
        await this.props.supplierActions.addSupplier(this.supplier);
        this.dismissModal();
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
                                            <List>
                                                <ListItem>
                                                    <Item floatingLabel>
                                                        <Label style={{color: '#9fced0', fontSize: 18}}>Enter {this.props.text} name </Label>
                                                        <Text/>
                                                        <Text/>
                                                        <Input id="name"
                                                               onChangeText={(name) => this.onChangeName(name)}/>
                                                    </Item>
                                                </ListItem>
                                                <ListItem>
                                                    <Body>
                                                    <Button full dark
                                                            disabled={!this.supplier || !this.supplier.name}
                                                            onPress={() => this.save()}>
                                                        <Text style={{fontSize: 18, color: '#ffffff'}}>Save</Text>
                                                    </Button>
                                                    </Body>
                                                </ListItem>
                                            </List>
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

    componentDidDisappear() {
        this.props.supplierActions.houseKeeping();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSupplier)

function mapStateToProps(state, ownProps) {
    const index = ownProps.index ? ownProps.index : 0;
    return {
        supplier: state.supplierReducer.supplier,
        currentCompany: state.companyReducer.company.companies[index],
        error: state.supplierReducer.supplier.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
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