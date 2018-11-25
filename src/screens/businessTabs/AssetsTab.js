import React from "react";
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Text, Grid, Content, Row, Col, Card, CardItem, Button, Body, View, List, ListItem, Left, Right, Icon
} from 'native-base';

import * as ledgerAction from "../../actions/ledgerActions";
import * as userAction from "../../actions/userActions";
import {navigateTo, showModal} from "../../App";

export class AssetsTab extends React.Component {
    constructor(props) {
        super(props);
    }

    showLedgerSelection(props) {
        showModal('AssetType', props, 'Add an asset', '#161616');
    }

    goToBusiness() {
        navigateTo(this.props.props.componentId, 'AddCompany', {}, 'Add business/company', '#161616');
    }

    addAsset(props) {
        navigateTo(this.props.props.componentId, 'AddAsset', {counterLedger: props}, 'Add an asset', '#161616');
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
                                                    <Button id='addBusinessButton' full dark onPress={() => this.goToBusiness()}>
                                                        <Text style={{fontSize: 18, color: '#FFFFFF'}}>Add business/company</Text>
                                                    </Button>
                                                    </Body>
                                                </CardItem>
                                            </View>
                                            :
                                            <View>
                                                {(this.props.props.currentCompany
                                                    && this.props.props.currentCompany.chartOfAccounts
                                                ) ?
                                                    <List style={{flex: 1}}>
                                                        <ListItem style={{alignItems: 'center'}} itemDivider onPress={() => this.showLedgerSelection()}>
                                                            <Body>
                                                            <Text>Assets</Text>
                                                            </Body>
                                                            <Right>
                                                                <Icon name="ios-add" style={{fontSize: 30, color: '#4cb528'}}/>
                                                            </Right>
                                                        </ListItem>
                                                        {this.props.props.cash.map((cash, i) =>
                                                            <ListItem key={i} style={{alignItems: 'center'}}
                                                                      onPress={() => {this.addAsset(cash)}}>
                                                                <Left>
                                                                    <Text>{cash.name}</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Text>0:00</Text>
                                                                </Right>
                                                            </ListItem>)}
                                                        {this.props.props.banks.map((bank, i) =>
                                                            <ListItem key={i} style={{alignItems: 'center'}}
                                                                      onPress={() => {this.addAsset(bank)}}>
                                                                <Left>
                                                                    <Text>{bank.name}</Text>
                                                                </Left>
                                                                <Right>
                                                                    <Text>0:00</Text>
                                                                </Right>
                                                            </ListItem>)}
                                                    </List>
                                                    :
                                                    <View>
                                                    </View>
                                                }
                                            </View>
                                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(AssetsTab)

function mapStateToProps(state, ownProps) {
    const index = (ownProps.index) ? ownProps.index : 0;
    return {
        user: state.userReducer.user,
        currentCompany: state.companyReducer.company.companies[index],
        banks: ledgerAction.listCompanyLedgersByParentName(state.companyReducer.company.companies[index], 'Bank'),
        cash: ledgerAction.listCompanyLedgersByParentName(state.companyReducer.company.companies[index], 'Cash'),
        revenue: ledgerAction.listCompanyLedgersByParentName(state.companyReducer.company.companies[index], 'Sales Income'),
        ledger: state.ledgerReducer.ledger
    };
}

function mapDispatchToProps(dispatch) {
    return {
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
