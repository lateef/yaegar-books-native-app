import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {Navigation} from "react-native-navigation";
import uuid from "uuid/v4";
import {
    Grid, Button, Container, Content, Text, Row, Col, Card, CardItem, Body, Item, Input, Picker, Icon,
    Label, Header, Left, Right, Title
} from 'native-base';

import * as transactionAction from '../actions/transactionActions';
import * as ledgerAction from "../actions/ledgerActions";
import * as userAction from "../actions/userActions";
import {pop} from "../App";

export class AddAsset extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.props.transactionActions.resetTransaction();
        this.props.transactionActions.updateTransaction({uuid: uuid()});
        this.props.transactionActions.updateCounterLedgerUuid(this.props.counterLedger.uuid);
    }

    onLedgerChange(ledger) {
        this.props.transactionActions.updateLedger(ledger);
    }

    onChangeDescription(description) {
        this.props.transactionActions.updateTransactionDescription(description);
    }

    onChangeAmount(amount) {
        this.props.transactionActions.updateTransactionAmount(amount);
    }

    save() {
        this.props.transactionActions.addTransaction(this.props.transaction);
        pop(this.props.componentId);
    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#161616" iosBarStyle="light-content"
                        style={{backgroundColor: '#161616', justifyContent: 'center', padding: 10}}>
                    <Text style={styles.h1}>{this.props.counterLedger.name}</Text>
                </Header>
                <Grid style={{justifyContent: 'center', padding: 10}}>
                    <Content>
                        <Row size={1}>
                            <Text/>
                        </Row>
                        <Row size={2}>
                            <Col>
                                <Card>
                                    <CardItem header bordered>
                                        <Text style={styles.textCentered}>Add {this.props.name} Transaction</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Item picker>
                                            <Picker
                                                renderHeader={backAction =>
                                                    <Header style={{backgroundColor: "#161616"}}>
                                                        <Left>
                                                            <Button transparent onPress={backAction}>
                                                                <Icon name="arrow-back" style={{color: "#fff"}}/>
                                                            </Button>
                                                        </Left>
                                                        <Body style={{flex: 3}}>
                                                        <Title style={{color: "#fff"}}>Asset Type</Title>
                                                        </Body>
                                                        <Right/>
                                                    </Header>}
                                                mode="dropdown"
                                                iosIcon={<Icon name="ios-arrow-down-outline"/>}
                                                style={{width: 300}}
                                                placeholder="Select asset type"
                                                placeholderStyle={{color: "#bfc6ea"}}
                                                placeholderIconColor="#007aff"
                                                selectedValue={this.props.transaction.ledger}
                                                onValueChange={this.onLedgerChange.bind(this)}>
                                                {this.props.equities.map((equity, i) => {
                                                    return <Item key={i} label={equity.name} value={equity}/>
                                                })}
                                            </Picker>
                                        </Item>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <Label style={styles.text}>Description</Label>
                                        <Item floatingLabel>
                                            <Label style={{color: '#9fced0', fontSize: 18}}>Description</Label>
                                            <Text/>
                                            <Text/>
                                            <Input id="descriptionInput"
                                                   onChangeText={(description) => this.onChangeDescription(description)}/>
                                        </Item>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <Label style={styles.text}>Amount</Label>
                                        <Item floatingLabel>
                                            <Label style={{color: '#9fced0', fontSize: 18}}>Amount</Label>
                                            <Text/>
                                            <Text/>
                                            <Input id="amountInput"
                                                   onChangeText={(amount) => this.onChangeAmount(amount)}/>
                                        </Item>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <Button full dark disabled={
                                            !this.props.transaction.ledger
                                            || !this.props.transaction.description
                                            || !this.props.transaction.amount
                                        } onPress={() => this.save()}>
                                            <Text style={{fontSize: 18, color: '#ffffff'}}>Save</Text>
                                        </Button>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Grid>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAsset)

function mapStateToProps(state, ownProps) {
    const index = (ownProps.index) ? ownProps.index : 0;
    return {
        user: state.userReducer.user,
        currentCompany: state.companyReducer.company.companies[index],
        equities: ledgerAction.listCompanyLedgersByParentName(state.companyReducer.company.companies[index], 'Equity'),
        transaction: state.transactionReducer.transaction,
        ledger: state.ledgerReducer.ledger,
        error: state.companyReducer.company.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        transactionActions: bindActionCreators(transactionAction, dispatch),
        userActions: bindActionCreators(userAction, dispatch)
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