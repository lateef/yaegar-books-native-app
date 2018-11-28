import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {
    Grid, Button, Container, Content, Text, Row, Col, Card, CardItem, Body, ListItem, List, Item, Label, Input
} from 'native-base';

import * as customerAction from '../../actions/customerActions';
import {ModalComponent} from "./ModalComponent";

export class AddCustomer extends ModalComponent {
    customer = {};

    constructor(props) {
        super(props);
        if (!this.props.currentCompany) return;//should actually get from rest end
        this.customer.company = {uuid: this.props.currentCompany.uuid};
        this.props.customerActions.updateCustomer(this.customer);
    }

    onChangeName(name) {
        this.customer.name = name;
        this.props.customerActions.updateCustomer(this.customer);
    }

    async save() {
        await this.props.customerActions.addCustomer(this.customer);
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
                                                            disabled={!this.customer || !this.customer.name}
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
        this.props.customerActions.houseKeeping();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer)

function mapStateToProps(state, ownProps) {
    const index = ownProps.index ? ownProps.index : 0;
    return {
        customer: state.customerReducer.customer,
        currentCompany: state.companyReducer.company.companies[index],
        error: state.customerReducer.customer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
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