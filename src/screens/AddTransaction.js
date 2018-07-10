import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-native-datepicker';

import {
    Button,
    Container,
    Content,
    Header,
    Form,
    Text,
    Grid,
    Col,
    Row,
    Item,
    Input,
    Picker,
    Left,
    Body,
    Right,
    Title
} from 'native-base';

import * as generalLedgerAction from '../actions/generalLedgerActions';
import * as journalEntryAction from '../actions/journalEntryActions';
import DATA from '../baseChartOfAccounts';

export class AddTransaction extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    handleDateChange(date) {
        this.props.journalEntryActions.updateTransactionDateTime(new Date(date));
    }

    handleGeneralLedgerChange(uuid) {
        const generalLedger = this.props.generalLedgers.filter(generalLedger => generalLedger.uuid === uuid)[0];
        this.props.journalEntryActions.updateGeneralLedger(generalLedger, 'primary');
        this.props.journalEntryActions.updateName(generalLedger.name);
    }

    handleAmountChange(amount) {
        if ('Income' === this.props.transactionType) {
            this.props.journalEntryActions.updateAmount(Math.abs(amount));
        } else if ('Expense' === this.props.transactionType) {
            this.props.journalEntryActions.updateAmount(-Math.abs(amount));
        }
    }

    handlePress = async (transactionType) => {
        if ('Income' === transactionType) {
            await this.props.journalEntryActions.updateJournalEntrySide('CREDIT', 'primary');
            await this.props.journalEntryActions.updateJournalEntrySide('DEBIT', 'secondary');
        } else if ('Expense' === transactionType) {
            await this.props.journalEntryActions.updateJournalEntrySide('DEBIT', 'primary');
            await this.props.journalEntryActions.updateJournalEntrySide('CREDIT', 'secondary');
        } else {
            console.error('This transaction is neither an income or expense');
            return;
        }
        this.props.journalEntryActions.save(this.props.primaryJournalEntry, 'primary');
        this.props.journalEntryActions.save(this.props.secondaryJournalEntry, 'secondary');
        this.props.navigator.pop({
            screen: 'Account'
        });
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                    <Title>Add {this.props.transactionType}</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <Grid>
                        <Row>
                            <Col>
                                <Form style={styles.container}>
                                    <Row size={2}>
                                        <Col>
                                            <DatePicker
                                                style={{width: 300}}
                                                date={this.props.primaryJournalEntry.transactionDatetime}
                                                mode="date"
                                                placeholder="select date"
                                                format="MMMM DD YYYY"
                                                minDate="January 01 1900"
                                                maxDate="December 31 2099"
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                customStyles={{
                                                    dateIcon: {
                                                        position: 'absolute',
                                                        left: 36,
                                                        top: 4,
                                                        marginLeft: 0
                                                    },
                                                    dateInput: {
                                                        marginLeft: 72
                                                    }
                                                }}
                                                onDateChange={(date) => this.handleDateChange(date)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row size={1}>
                                        <Picker
                                            iosHeader="Category"
                                            mode="dropdown"
                                            selectedValue={this.props.primaryJournalEntry ?
                                                this.props.primaryJournalEntry.generalLedger.uuid :
                                                'noUuid'}
                                            onValueChange={this.handleGeneralLedgerChange.bind(this)}
                                        >
                                            {this.props.generalLedgers.map((generalLedger, i) =>
                                                <Picker.Item key={i} label={generalLedger.name}
                                                             value={generalLedger.uuid}/>
                                            )}
                                        </Picker>
                                    </Row>
                                    <Row size={1}>
                                        <Col>
                                            <Item>
                                                <Input placeholder='Amount' keyboardType={'numeric'}
                                                       onChangeText={(amount) => this.handleAmountChange(amount)}/>
                                            </Item>
                                        </Col>
                                    </Row>
                                    <Row size={1}/>
                                    <Row size={1}>
                                        <Col>
                                            <Body>
                                            <Button id="saveTransactionButton"
                                                    disabled={
                                                        this.props.primaryJournalEntry &&
                                                        (this.props.primaryJournalEntry.generalLedger.uuid === 'noUuid'
                                                            || !this.props.primaryJournalEntry.amount)
                                                    }
                                                    rounded
                                                    onPress={() => this.handlePress(this.props.transactionType)}>
                                                <Text>Save</Text>
                                            </Button>
                                            </Body>
                                        </Col>
                                    </Row>
                                    <Row size={10}/>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }

    componentWillMount() {
        const generalLedger = this.props.generalLedgers.filter(generalLedger => generalLedger.uuid === 'noUuid')[0];
        this.props.journalEntryActions.updateGeneralLedger(generalLedger, 'primary');
        this.props.journalEntryActions.updateGeneralLedger(this.props.account, 'secondary');
        this.props.journalEntryActions.updateUuid(null, 'primary');
        this.props.journalEntryActions.updateUuid(null, 'secondary');
        this.props.journalEntryActions.updateAmount(null);
        this.props.journalEntryActions.updateTransactionDateTime(new Date());

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

        if ('Income' === this.props.transactionType) {
            this.props.generalLedgerActions.listByParentUuidsAndType('LIST_GENERAL_LEDGERS_CATEGORIES',
                this.props.account.type,
                [incomeRevenue.uuid, nonOperatingIncome.uuid]);
        } else if ('Expense' === this.props.transactionType) {
            this.props.generalLedgerActions.listByParentUuidsAndType('LIST_GENERAL_LEDGERS_CATEGORIES',
                this.props.account.type,
                [operatingExpenses.uuid, nonOperatingExpenses.uuid]);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction)

function mapStateToProps(state, ownProps) {
    return {
        generalLedger: state.generalLedgerReducer.generalLedger,
        generalLedgers: [{name: 'Select Category', uuid: 'noUuid'}].concat(state.generalLedgerReducer.categories),
        primaryJournalEntry: state.journalEntryReducer.primaryJournalEntry,
        secondaryJournalEntry: state.journalEntryReducer.secondaryJournalEntry,
        error: state.generalLedgerReducer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        generalLedgerActions: bindActionCreators(generalLedgerAction, dispatch),
        journalEntryActions: bindActionCreators(journalEntryAction, dispatch)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
});