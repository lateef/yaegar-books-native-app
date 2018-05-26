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

export class Transaction extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    constructor() {
        super();
        this.state = {date: moment().format('MMMM DD YYYY')};
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
                                        <Right><Button id="saveTransactionButton"
                                                disabled={true}
                                                rounded
                                                onPress={() => {}}>
                                            <Text>Save</Text>
                                        </Button></Right>
                                    </Row>
                                    <Row size={1}/>
                                    <Row size={2}>
                                        <Col>
                                            <DatePicker
                                                style={{width: 300}}
                                                date={this.props.date}
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
                                                onDateChange={(date) => {
                                                    this.setState({date: date})
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row size={1}/>
                                    <Row size={1}>
                                        <Picker
                                            iosHeader="Category"
                                            mode="dropdown"
                                            selectedValue={'key0'}
                                            // onValueChange={this.onValueChange.bind(this)}
                                        >
                                            <Picker.Item label="Choose category" value="key0"/>
                                            <Picker.Item label="ATM Card" value="key1"/>
                                            <Picker.Item label="Debit Card" value="key2"/>
                                            <Picker.Item label="Credit Card" value="key3"/>
                                            <Picker.Item label="Net Banking" value="key4"/>
                                        </Picker>
                                    </Row>
                                    <Row size={1}/>
                                    <Row size={1}>
                                        <Col>
                                            <Item>
                                                <Input placeholder='Amount' keyboardType={'numeric'}/>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)

function mapStateToProps(state, ownProps) {
    return {
        generalLedger: state.generalLedgerReducer.generalLedger,
        error: state.generalLedgerReducer.error,
        date: moment().format('MMMM DD YYYY')
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
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
});