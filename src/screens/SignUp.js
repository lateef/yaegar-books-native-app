import React from 'react';
import {Navigation} from "react-native-navigation";
import {Text, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Container, Header, Content, Button, Item, Label, Input, Card, CardItem, Body, Grid, Row, Col, Left, Right
} from 'native-base';
import PhoneInput from 'react-native-phone-input';

import * as userAction from "../actions/userActions";
import {goToHome} from "../App";

export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    onChangePhoneNumber() {
        if (this.phone.isValidNumber()) {
            this.props.userActions.updatePhone({
                code: this.phone.getCountryCode(),
                number: this.phone.getValue(),
                countryCode: this.phone.getCountryCode(),
                isoCode: this.phone.getISOCode(),
                notValid: false
            })
        } else {
            this.props.userActions.updatePhone({notValid: true})
        }
    }

    onChangePassword = (password) => {
        this.props.userActions.setPassword(password);
        this.props.userActions.validatePassword(password);
    };

    async signUp() {
        await this.props.userActions.register(this.props.user);
        if (!this.props.user.error) {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'SignUpComplete'
                }
            });
        }
    }

    createUnregisteredUser() {
        this.props.userActions.createUnregisteredUser();
        goToHome();
    }

    goToSmsCode() {
        if (this.props.user.phones[0].number) {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'SignUpComplete'
                }
            });
        } else {
            Alert.alert('Phone number needed', 'Enter the phone number of the sms code you want to enter',
                [{
                    text: 'OK', onPress: () => {
                    }
                }]
            );
        }
    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#161616" iosBarStyle="light-content" style={{backgroundColor: '#161616', justifyContent: 'center', padding: 10}}>
                    <Text style={styles.h1}>SIGN UP</Text>
                </Header>
                <Grid style={{justifyContent: 'center', padding: 10}}>
                    <Content>
                        <Row size={1}>
                            <Text/>
                        </Row>
                        <Row size={2}>
                            <Col>
                                <Card>
                                    <CardItem header bordered>
                                        <Text style={styles.textCentered}>Enter your phone number with the country code</Text>
                                    </CardItem>
                                    <CardItem/>
                                    <CardItem>
                                        <Body>
                                        <Label style={styles.text}>PHONE NUMBER</Label>
                                        <Text/>
                                        <Text/>
                                        <PhoneInput ref={ref => {this.phone = ref;}}
                                                    textStyle={{fontSize: 18,}}
                                                    initialCountry={'none'}
                                                    allowZeroAfterCountryCode={false}
                                                    textProps={{placeholder: '+123 Enter your phone number'}}
                                                    onChangePhoneNumber={() => this.onChangePhoneNumber()}/>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        {this.props.user.phones.length > 0 && this.props.user.phones[0].notValid ?
                                            <Text style={{flex: 1, fontSize: 16, textAlign: 'center', color: 'red'}}>
                                                Invalid phone number
                                            </Text> : <Text/>}
                                        {this.props.user.error ?
                                            <Text style={{flex: 1, fontSize: 16, textAlign: 'center', color: 'red'}}>
                                                Registration failed, perhaps number exists
                                            </Text> : <Text/>}
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <Label style={styles.text}>PASSWORD</Label>
                                        <Item floatingLabel>
                                            <Label style={{color: '#9fced0', fontSize: 18}}>Create a new
                                                password</Label>
                                            <Text/>
                                            <Text/>
                                            <Input id="passwordInput"
                                                   testID="passwordInput"
                                                   secureTextEntry={true}
                                                   onChangeText={(password) => this.onChangePassword(password)}/>
                                        </Item>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        {this.props.user.passwordValid === undefined || this.props.user.passwordValid ?
                                            <Text/> :
                                            <Text style={{fontSize: 16, textAlign: 'center', color: 'red'}}>
                                                Minimum 6 characters, and must contain at least 1 lowercase, 1 uppercase
                                                and
                                                1 number
                                            </Text>}
                                    </CardItem>
                                    <CardItem footer style={{justifyContent: 'center'}}>
                                        <Body>
                                            <Button id="signUpButton" full dark
                                                    disabled={
                                                        this.props.user.phones.length === 0 ||
                                                        !this.props.user.phones[0].number ||
                                                        !this.props.user.passwordValid
                                                    }
                                                    onPress={() => this.signUp()}>
                                                <Text style={{fontSize: 18, color: '#9fced0'}}>SIGN UP</Text>
                                            </Button>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text style={{fontSize: 16, textAlign: 'center', color: 'blue'}}
                                                  onPress={() => {this.createUnregisteredUser()}}>
                                                Register later
                                            </Text>
                                        </Left>
                                        <Right>
                                            <Text style={{fontSize: 16, textAlign: 'center', color: 'blue'}}
                                                  onPress={() => {this.goToSmsCode()}}>
                                                Enter sms code
                                            </Text>
                                        </Right>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Grid>
            </Container>
        );
    }

    componentDidAppear() {
        this.props.userActions.updatePhone({notValid: false});
        this.props.userActions.setPassword(undefined);
        this.props.userActions.validatePassword(undefined);
    }

    componentDidDisappear() {
        this.props.userActions.updateUserWarning('');
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

function mapStateToProps(state, ownProps) {
    return {
        user: state.userReducer.user,
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
        backgroundColor: '#161616',
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
