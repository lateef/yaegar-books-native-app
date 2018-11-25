import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import uuid from "uuid/v4";
import {
    Grid, Button, Container, Content, Text, Row, Col, Card, CardItem, Body
} from 'native-base';

import * as ledgerAction from '../../actions/ledgerActions';
import * as companyAction from '../../actions/companyActions';
import {showModal} from "../../App";
import {ModalComponent} from "./ModalComponent";

export class AccountType extends ModalComponent {
    bank = {};

    constructor(props) {
        super(props);
        this.bank.uuid = uuid();
        if (!this.props.currentCompany || !this.props.currentCompany.chartOfAccounts) return;//should actually get from rest end
        this.bank.parentUuid = ledgerAction.findLedgerByName(
            this.props.currentCompany.chartOfAccounts.ledgers, 'Bank'
        ).uuid;
        this.props.ledgerActions.updateLedger(this.bank);
    }

    showAddAccountType(props) {
        showModal('UpdateLedger', props, props.text, '#161616');
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
                                        <Text style={styles.textCentered}>Choose</Text>
                                    </CardItem>
                                    <CardItem style={{justifyContent: 'center'}}>
                                        <Body>
                                        <Button id='addCashButton' full dark
                                                onPress={() => this.showAddAccountType({name: 'Cash', text: 'cash account'})}>
                                            <Text style={{fontSize: 18, color: '#FFFFFF'}}>
                                                Add a cash account
                                            </Text>
                                        </Button>
                                        </Body>
                                    </CardItem>
                                    <CardItem style={{justifyContent: 'center'}}>
                                        <Body>
                                        <Button id='addBankButton' full dark
                                                onPress={() => this.showAddAccountType({name: 'Bank', text: 'bank account'})}>
                                            <Text style={{fontSize: 18, color: '#FFFFFF'}}>
                                                Add a bank account
                                            </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountType)

function mapStateToProps(state, ownProps) {
    const index = ownProps.index ? ownProps.index : 0;
    return {
        user: state.userReducer.user,
        ledger: state.ledgerReducer.ledger,
        currentCompany: state.companyReducer.company.companies[index],
        error: state.companyReducer.company.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ledgerActions: bindActionCreators(ledgerAction, dispatch),
        companyActions: bindActionCreators(companyAction, dispatch)
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