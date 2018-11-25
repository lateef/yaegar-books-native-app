import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
    Container, Header, Content, Card, CardItem, Text, Grid, Row, Col, Button, Item, Label, Input, Body
} from 'native-base';
import PhoneInput from 'react-native-phone-input';
import {bindActionCreators} from "redux";

import * as userAction from "../actions/userActions";
import * as companyAction from "../actions/companyActions";
import {goToHome} from "../App";

export class SignIn extends React.Component {
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

    async signIn() {
        await this.props.userActions.login(this.props.user);
        this.props.companyActions.getCompanies();
        if (!this.props.user.error) {
            goToHome();
        } else {
            Alert.alert('Login failed', 'Check your phone number and/or password',
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
                <Text style={styles.h1}>LOG IN</Text>
            </Header>
            <Grid style={{justifyContent: 'center', padding: 10}}>
                <Content>
                    <Row size={5}/>
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
                                            Log in failed, check your phone number and/or password
                                        </Text> : <Text/>}
                                </CardItem>
                                <CardItem>
                                    <Body>
                                    <Label style={styles.text}>PASSWORD</Label>
                                    <Item floatingLabel>
                                        <Label style={{color: '#9fced0', fontSize: 18}}>Enter your password</Label>
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
                                </CardItem>
                                <CardItem footer bordered style={{justifyContent: 'center'}}>
                                    <Body>
                                        <Button id="loginButton" full dark
                                                disabled={!this.props.user.phones[0].number || !this.props.user.passwordValid}
                                                onPress={() => this.signIn()}>
                                            <Text style={{fontSize: 18, color: '#FFFFFF'}}>LOGIN</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Grid>
        </Container>
    );
  }

    componentWillMount() {
        this.props.userActions.updatePhone({notValid: false});
        this.props.userActions.setPassword(undefined);
        this.props.userActions.validatePassword(undefined);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

function mapStateToProps(state, ownProps) {
    return {
        user: state.userReducer.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userAction, dispatch),
        companyActions: bindActionCreators(companyAction, dispatch)
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
