import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import uuid from "uuid/v4";
import {
    Grid, Button, Container, Content, Text, Row, Col, Card, CardItem, Body, ListItem, List, Item, Label, Input
} from 'native-base';

import * as ledgerAction from '../../actions/ledgerActions';
import * as companyAction from '../../actions/companyActions';
import {dismissAllModals} from "../../App";
import {ModalComponent} from "./ModalComponent";

export class UpdateLedger extends ModalComponent {
    bank = {};

    constructor(props) {
        super(props);
        this.bank.uuid = uuid();
        if (!this.props.currentCompany || !this.props.currentCompany.chartOfAccounts) return;//should actually get from rest end
        this.bank.parentUuid = ledgerAction.findLedgerByName(
            this.props.currentCompany.chartOfAccounts.ledgers, this.props.name
        ).uuid;
        this.props.ledgerActions.updateLedger(this.bank);
    }

    onChangeName(name) {
        this.props.ledgerActions.updateLedgerName(name);
    }

    async save() {
        await this.props.ledgerActions.addLedger(this.props.ledger);
        this.props.ledgerActions.resetLedger();
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
                                            <List>
                                                <ListItem>
                                                    <Item floatingLabel>
                                                        <Label style={{color: '#9fced0', fontSize: 18}}>Enter {this.props.text} name </Label>
                                                        <Text/>
                                                        <Text/>
                                                        <Input id="name" value={this.props.ledger.name}
                                                               onChangeText={(name) => this.onChangeName(name)}/>
                                                    </Item>
                                                </ListItem>
                                                <ListItem>
                                                    <Body>
                                                    <Button full dark
                                                            disabled={!this.props.ledger || !this.props.ledger.name}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLedger)

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