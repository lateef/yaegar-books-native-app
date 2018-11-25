import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, StyleSheet} from 'react-native';

import {
    Container, Header, Content, Card, CardItem, Text, Grid, Row, Col, Button, Item, Label, Input, Body
} from 'native-base';
import {bindActionCreators} from "redux";
import * as userAction from "../actions/userActions";
import {goToHome} from "../App";

export class SignUpComplete extends Component {
    onChangeSmsCode = (code) => {
        this.props.userActions.setSmsCode(code)
    };

    async confirmUser() {
        await this.props.userActions.confirmUser(this.props.user);
        if (!this.props.error) {
            Alert.alert('SMS Code', 'Registration complete',
                [{
                    text: 'OK', onPress: () => {
                        goToHome();
                    }
                }]
            );
        } else {
            Alert.alert('SMS Code', 'Invalid SMS code',
                [{
                    text: 'OK', onPress: () => {}
                }]
            );
        }
    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#161616" iosBarStyle="light-content" style={{backgroundColor: '#161616', justifyContent: 'center', padding: 10}}>
                    <Text style={styles.h1}>ENTER SMS CODE</Text>
                </Header>
                <Grid style={{justifyContent: 'center', padding: 10}}>
                    <Content>
                        <Row size={5}/>
                        <Row size={2}>
                            <Col>
                                <Card>
                                    <CardItem header bordered>
                                        <Text style={styles.textCentered}> An SMS has been sent to your phone.
                                            Please enter the 5 digit code from the SMS to complete your registration.
                                        </Text>
                                    </CardItem>
                                    <CardItem>
                                        {this.props.user.passwordValid === undefined || this.props.user.passwordValid ?
                                            <Text/> :
                                            <Text style={{fontSize: 16, textAlign: 'center', color: 'red'}}>
                                                Minimum 6 characters, and must contain at least 1 lowercase, 1
                                                uppercase and 1 number
                                            </Text>}
                                    </CardItem>
                                    <CardItem>
                                        <Item floatingLabel>
                                            <Label>SMS CODE</Label>
                                            <Input id="smsCodeInput"
                                                   keyboardType="number-pad"
                                                   value={this.smsCode}
                                                   onChangeText={(code) => this.onChangeSmsCode(code)}/>
                                        </Item>
                                    </CardItem>
                                    <CardItem>
                                        {this.props.error ?
                                            <Text style={{flex: 1, fontSize: 16, textAlign: 'center', color: 'red'}}>
                                                Incorrect code, please use code sent in text
                                            </Text> : <Text/>}
                                    </CardItem>
                                    <CardItem/>
                                    <CardItem footer bordered style={{justifyContent: 'center'}}>
                                        <Body>
                                            <Button id="submitButton" full dark
                                                    disabled={!this.props.user || !this.props.user.smsCode}
                                                    onPress={() => this.confirmUser()}>
                                                <Text style={{fontSize: 18, color: '#9fced0'}}> SUBMIT </Text>
                                            </Button>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Grid>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComplete)

function mapStateToProps(state, ownProps) {
    return {
        user: state.userReducer.user,
        error: state.userReducer.user.error
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
        backgroundColor: '#5264d8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    h1: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
        fontSize: 30
    },
    textCentered: {
        textAlign: 'center',
        color: '#161616',
        fontSize: 18
    }
});