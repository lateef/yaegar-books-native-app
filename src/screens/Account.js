import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import ActionButton from 'react-native-action-button';

import {
    Container,
    Header,
    Text,
    Grid,
    List,
    ListItem,
    Col,
    Row,
    Icon,
    View,
    Right,
    Left
} from 'native-base';

import * as journalEntryAction from '../actions/journalEntryActions';

export class Account extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    addTransaction(transactionType) {
        this.props.navigator.push({
            'screen': 'AddTransaction',
            passProps: {
                transactionType: transactionType
            }
        });
    }

    displayTransaction(uuid) {
        this.props.navigator.push({
            'screen': 'TransactionDetail',
            passProps: {
                uuid: uuid
            }
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Text>{this.props.accountName}</Text>
                </Header>
                <Grid>
                    <Row style={styles.height}>
                        <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
                            <Row>
                                <Col>
                                    {Platform.OS === "android" ? <Row size={1}>
                                    </Row> : <View/>}
                                    <Row size={9}>
                                        <List style={{flex: 1}}>
                                            <ListItem itemDivider>
                                                <Text>Income/Expenses</Text>
                                            </ListItem>
                                            {this.props.journalEntries.map((journalEntry, i) =>
                                                <ListItem key={i} style={{alignItems: 'center'}}
                                                          onPress={() => this.displayTransaction(this.props.journalEntry.uuid)}>
                                                        <Left>
                                                            <Text>{journalEntry.generalLedger.name}</Text>
                                                        </Left>
                                                        <Right>
                                                            <Text>{journalEntry.amount}</Text>
                                                        </Right>
                                                </ListItem>)}
                                        </List>
                                    </Row>
                                </Col>
                            </Row>
                            {/* Rest of the app comes ABOVE the action button component !*/}
                            <ActionButton buttonColor="#3498db">
                                <ActionButton.Item buttonColor='#1abc9c' title="INCOME"
                                                   onPress={() => this.addTransaction('Income')}>
                                    <Icon type="FontAwesome" name="angle-double-down" style={styles.actionButtonIcon}/>
                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#E74C3C' title="EXPENSE"
                                                   onPress={() => this.addTransaction('Expense')}>
                                    <Icon type="FontAwesome" name="angle-double-up" style={styles.actionButtonIcon}/>
                                </ActionButton.Item>
                            </ActionButton>
                        </View>
                    </Row>
                </Grid>
            </Container>
        )
    }

    componentWillMount() {
        this.props.journalEntryActions.list();
        // this.props.journalEntryActions.listByGeneralLedgerUuid(this.props.accountUuid);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)

function mapStateToProps(state, ownProps) {
    return {
        journalEntry: state.journalEntryReducer.journalEntry,
        journalEntries: state.journalEntryReducer.journalEntries,
        error: state.generalLedgerReducer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        journalEntryActions: bindActionCreators(journalEntryAction, dispatch)
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