import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {
    Grid, Button, Container, Content, Text, Row, Col, Card, CardItem, Body, Title, ListItem, List, Item, Label, Input,
    Right, Header
} from 'native-base';

import * as transactionAction from '../../actions/transactionActions';
import * as companyAction from '../../actions/companyActions';
import {dismissModal} from "../../App";

export class UpdateText extends Component {
    constructor(props) {
        super(props);
    }

    onChange(transaction, field, value) {
        transaction[field] = value;
        this.props.transactionActions.updateTransaction(transaction);
    }

    async save() {
        await this.props.transactionActions.addTransaction(this.props.transaction);
        dismissModal();
    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#161616" iosBarStyle="light-content"
                        style={{backgroundColor: '#161616', justifyContent: 'center', padding: 10}}>
                    <Body>
                    <Title style={styles.h1}>{this.props.text}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text style={{fontSize: 18, color: 'white'}} onPress={() => dismissModal(this.props.componentId)}>Back</Text>
                        </Button>
                    </Right>
                </Header>
                <Grid style={{justifyContent: 'center', padding: 10}}>
                    <Content contentContainerStyle={{flex: 1, backgroundColor: '#ffffff'}}>
                        <Row size={2}>
                            <Col>
                                <Card>
                                    <CardItem header bordered>
                                        <Text style={styles.textCentered}>{this.props.name}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Col>
                                            <List>
                                                <ListItem>
                                                    <Item floatingLabel>
                                                        <Label style={{color: '#9fced0', fontSize: 18}}>Enter {this.props.name} </Label>
                                                        <Text/>
                                                        <Text/>
                                                        <Input id="transaction" value={this.props.transaction.name}
                                                               onChangeText={(value) =>
                                                                   this.onChange(this.props.transaction, this.props.field, value)}/>
                                                    </Item>
                                                </ListItem>
                                                <ListItem>
                                                    <Body>
                                                    <Button full dark
                                                            disabled={!this.props.transaction || !this.props.transaction.description}
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateText)

function mapStateToProps(state, ownProps) {
    const index = ownProps.index ? ownProps.index : 0;
    return {
        user: state.userReducer.user,
        transaction: state.transactionReducer.transaction,
        // currentCompany: state.companyReducer.company.companies[index],
        error: state.companyReducer.company.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        transactionActions: bindActionCreators(transactionAction, dispatch),
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