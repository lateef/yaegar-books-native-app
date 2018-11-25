import React from "react";
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Text, Grid, Content, Row, Col, Card, Body, View, List, ListItem, Left, Right, Icon
} from 'native-base';

import * as ledgerAction from "../../actions/ledgerActions";
import * as userAction from "../../actions/userActions";
import {showModal} from "../../App";

export class ProductsTab extends React.Component {
    constructor(props) {
        super(props);
    }

    showAddProductModal(props) {
        showModal('Products', props, 'Products/Services', '#161616');
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
                                        {(this.props.props.currentCompany && this.props.props.currentCompany.chartOfAccounts) ?
                                            <List style={{flex: 1}}>
                                                <ListItem style={{alignItems: 'center'}} itemDivider onPress={() => this.showAddProductModal({action: 'prepProduct'})}>
                                                    <Body>
                                                        <Text>Products/Services</Text>
                                                    </Body>
                                                    <Right>
                                                        <Icon name="ios-add" style={{fontSize: 30, color: '#4cb528'}}/>
                                                    </Right>
                                                </ListItem>
                                                {this.props.props.revenue.map((revenue, i) =>
                                                    <ListItem key={i} style={{alignItems: 'center'}}
                                                              onPress={() => {}}>
                                                        <Left>
                                                            <Text>{revenue.name}</Text>
                                                        </Left>
                                                        <Right>
                                                            <Text>0:00</Text>
                                                        </Right>
                                                    </ListItem>)}
                                                    </List>
                                            :
                                            <View/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTab)

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
