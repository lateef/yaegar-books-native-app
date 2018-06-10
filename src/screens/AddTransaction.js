import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

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
    Right
} from 'native-base';

import * as generalLedgerAction from '../actions/generalLedgerActions';
import * as journalEntryAction from '../actions/journalEntryActions';

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
        this.props.journalEntryActions.updateGeneralLedger(generalLedger);
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
            await this.props.journalEntryActions.updateJournalEntrySide('CREDIT');
        } else if ('Expense' === transactionType) {
            await this.props.journalEntryActions.updateJournalEntrySide('DEBIT');
        } else {
            console.error('This transaction is neither an income or expense');
            return;
        }
        this.props.journalEntryActions.save(this.props.journalEntry);
        this.props.navigator.pop({
            screen: 'Account'
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Text>Add {this.props.transactionType}</Text>
                </Header>
                <Content>
                    <Grid>
                        <Row>
                            <Col>
                                <Form style={styles.container}>
                                    <Row size={1}>
                                        <Right>
                                            <Button id="saveTransactionButton"
                                                    disabled={
                                                        this.props.journalEntry &&
                                                        (this.props.journalEntry.generalLedger.uuid === 'noUuid'
                                                            || !this.props.journalEntry.amount)
                                                    }
                                                    rounded
                                                    onPress={() => this.handlePress(this.props.transactionType)}>
                                                <Text>Save</Text>
                                            </Button>
                                        </Right>
                                    </Row>
                                    <Row size={1}/>
                                    <Row size={2}>
                                        <Col>
                                            <DatePicker
                                                style={{width: 300}}
                                                date={this.props.journalEntry ?
                                                    this.props.journalEntry.transactionDatetime :
                                                    moment().format('MMMM DD YYYY')}
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
                                    <Row size={1}/>
                                    <Row size={1}>
                                        <Picker
                                            iosHeader="Category"
                                            mode="dropdown"
                                            selectedValue={this.props.journalEntry ?
                                                this.props.journalEntry.generalLedger.uuid :
                                            'noUuid'}
                                            onValueChange={this.handleGeneralLedgerChange.bind(this)}
                                        >
                                            {this.props.generalLedgers.map((generalLedger, i) =>
                                                <Picker.Item key={i} label={generalLedger.name}
                                                             value={generalLedger.uuid}/>
                                            )}
                                        </Picker>
                                    </Row>
                                    <Row size={1}/>
                                    <Row size={1}>
                                        <Col>
                                            <Item>
                                                <Input placeholder='Amount' keyboardType={'numeric'}
                                                       onChangeText={(amount) => this.handleAmountChange(amount)}/>
                                            </Item>
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
        this.props.journalEntryActions.updateGeneralLedger(generalLedger);
        this.props.journalEntryActions.updateAmount(null);

        if ('Income' === this.props.transactionType) {
            this.props.generalLedgerActions.listByParentUuid('LIST_CATEGORIES', '4ec43749-b607-4951-9cc6-1e81d657c56c');
        } else if ('Expense' === this.props.transactionType) {
            this.props.generalLedgerActions.listByParentUuid('LIST_CATEGORIES', '4e0de115-6eaa-498e-82fa-34d4f87935f9');
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction)

function mapStateToProps(state, ownProps) {
    return {
        generalLedger: state.generalLedgerReducer.generalLedger,
        generalLedgers: [{name: 'Select Category', uuid: 'noUuid'}].concat(state.generalLedgerReducer.categories),
        journalEntry: state.journalEntryReducer.journalEntry,
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