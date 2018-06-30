import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, Platform, ScrollView, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';

import {
    Container,
    Content,
    Header,
    Text,
    Body,
    Title,
    Grid,
    List,
    ListItem,
    Col,
    Row,
    Right,
    Left
} from 'native-base';

import * as generalLedgerAction from '../actions/generalLedgerActions';
import DATA from "../baseChartOfAccounts";

export class Categories extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                    <Title>Categories</Title>
                    </Body>
                    <Right />
                </Header>
                <Grid>
                    <Row>
                        <Content padder>
                            <Row>
                                <Col>
                                    <Row size={9}>
                                        <List style={{flex: 1}}>
                                            {this.props.generalLedgers.map((generalLedger, i) =>
                                                <ListItem key={i} style={{alignItems: 'center'}}>
                                                    <Body>
                                                        <Text>{generalLedger.name}</Text>
                                                    </Body>
                                                </ListItem>)}
                                        </List>
                                    </Row>
                                </Col>
                            </Row>
                        </Content>
                    </Row>
                </Grid>
            </Container>
        )
    }

    componentWillMount() {
        const incomeRevenue = DATA.chartOfAccounts.filter(function (ledgerEntry) {
            return ledgerEntry.name === "Income/Revenue";
        })[0];
        const nonOperatingIncome = DATA.chartOfAccounts.filter(function (ledgerEntry) {
            return ledgerEntry.name === "Non-operating income";
        })[0];

        const operatingExpenses = DATA.chartOfAccounts.filter(function (ledgerEntry) {
            return ledgerEntry.name === "Operating expenses";
        })[0];

        const nonOperatingExpenses = DATA.chartOfAccounts.filter(function (ledgerEntry) {
            return ledgerEntry.name === "Non-operating expenses";
        })[0];

        this.props.generalLedgerActions.listByParentUuids('LIST_GENERAL_LEDGERS_CATEGORIES',
            [incomeRevenue.uuid, nonOperatingIncome.uuid, operatingExpenses.uuid, nonOperatingExpenses.uuid]);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)

function mapStateToProps(state, ownProps) {
    return {
        generalLedgers: state.generalLedgerReducer.categories,
        error: state.generalLedgerReducer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        generalLedgerActions: bindActionCreators(generalLedgerAction, dispatch)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});