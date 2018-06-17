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

export class TransactionDetail extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    render() {
        return (
            <Container>
                <Header>
                    {/*<Text>{this.props.primaryJournalEntry.name}</Text>*/}
                </Header>
                <Content>
                    <Grid>
                        <Row>
                            <Col>
                                <Form style={styles.container}>
                                    {/*<Row size={1}>*/}
                                        {/*<Right>*/}
                                            {/*<Button id="saveTransactionButton"*/}
                                                    {/*disabled={*/}
                                                        {/*this.props.primaryJournalEntry &&*/}
                                                        {/*(this.props.primaryJournalEntry.generalLedger.uuid === 'noUuid'*/}
                                                            {/*|| !this.props.primaryJournalEntry.amount)*/}
                                                    {/*}*/}
                                                    {/*rounded*/}
                                                    {/*onPress={() => this.handlePress(this.props.transactionType)}>*/}
                                                {/*<Text>Save</Text>*/}
                                            {/*</Button>*/}
                                        {/*</Right>*/}
                                    {/*</Row>*/}
                                    {/*<Row size={1}/>*/}
                                    {/*<Row size={2}>*/}
                                        {/*<Col>*/}
                                            {/*<DatePicker*/}
                                                {/*style={{width: 300}}*/}
                                                {/*date={this.props.primaryJournalEntry ?*/}
                                                    {/*this.props.primaryJournalEntry.transactionDatetime :*/}
                                                    {/*moment().format('MMMM DD YYYY')}*/}
                                                {/*mode="date"*/}
                                                {/*placeholder="select date"*/}
                                                {/*format="MMMM DD YYYY"*/}
                                                {/*minDate="January 01 1900"*/}
                                                {/*maxDate="December 31 2099"*/}
                                                {/*confirmBtnText="Confirm"*/}
                                                {/*cancelBtnText="Cancel"*/}
                                                {/*customStyles={{*/}
                                                    {/*dateIcon: {*/}
                                                        {/*position: 'absolute',*/}
                                                        {/*left: 36,*/}
                                                        {/*top: 4,*/}
                                                        {/*marginLeft: 0*/}
                                                    {/*},*/}
                                                    {/*dateInput: {*/}
                                                        {/*marginLeft: 72*/}
                                                    {/*}*/}
                                                {/*}}*/}
                                                {/*onDateChange={(date) => this.handleDateChange(date)}*/}
                                            {/*/>*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row size={1}/>*/}
                                    {/*<Row size={1}>*/}
                                        {/*<Picker*/}
                                            {/*iosHeader="Category"*/}
                                            {/*mode="dropdown"*/}
                                            {/*selectedValue={this.props.primaryJournalEntry ?*/}
                                                {/*this.props.primaryJournalEntry.generalLedger.uuid :*/}
                                            {/*'noUuid'}*/}
                                            {/*onValueChange={this.handleGeneralLedgerChange.bind(this)}*/}
                                        {/*>*/}
                                            {/*{this.props.generalLedgers.map((generalLedger, i) =>*/}
                                                {/*<Picker.Item key={i} label={generalLedger.name}*/}
                                                             {/*value={generalLedger.uuid}/>*/}
                                            {/*)}*/}
                                        {/*</Picker>*/}
                                    {/*</Row>*/}
                                    {/*<Row size={1}/>*/}
                                    {/*<Row size={1}>*/}
                                        {/*<Col>*/}
                                            {/*<Item>*/}
                                                {/*<Input placeholder='Amount' keyboardType={'numeric'}*/}
                                                       {/*onChangeText={(amount) => this.handleAmountChange(amount)}/>*/}
                                            {/*</Item>*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row size={10}/>*/}
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }

    componentWillMount() {
        this.props.journalEntryActions.findByUuid(this.props.uuid);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)

function mapStateToProps(state, ownProps) {
    return {
        primaryJournalEntry: state.journalEntryReducer.primaryJournalEntry,
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
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
});