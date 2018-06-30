import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import PhoneInput from 'react-native-phone-input';

import {
    Container,
    Content,
    Text,
    Grid,
    Input,
    Item,
    Row,
    Col,
    Body,
    Form,
    Title,
    Label,
    Button
} from 'native-base';

import * as userAction from '../actions/userActions';

export class SignUp extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    onChangePhoneNumber() {
        if (this.phone.isValidNumber()) {
            this.props.userActions.updatePhone({
                code: this.phone.getCountryCode(),
                number: this.phone.getValue(),
                countryCode: this.phone.getCountryCode(),
                isoCode: this.phone.getISOCode()
            })
        }
    }

    onChangePassword = (password) => {
        this.props.userActions.setPassword(password);
        this.props.userActions.validatePassword(password, this.props.user.passwordAgain);
    };

    onChangePasswordAgain = (passwordAgain) => {
        this.props.userActions.setPasswordAgain(passwordAgain);
        this.props.userActions.validatePassword(this.props.user.password, passwordAgain);
    };

    render() {
        return (
            <Container>
                <Content padder>
                    <Grid>
                        <Row>
                            <Form style={styles.container}>
                                <Row size={1}>
                                    <Body>
                                    <Title style={{fontSize: 30, color: 'black'}}>Sign Up</Title>
                                    </Body>
                                </Row>
                                <Row size={1}>
                                    <Body>
                                    <Text style={{color: 'grey', fontSize: 14}}>
                                        Enter your phone number with country code
                                    </Text>
                                    </Body>
                                </Row>
                                <Row size={2}>
                                    <Col>
                                        <Label>Phone Number</Label>
                                        <PhoneInput ref={ref => {this.phone = ref;}}
                                                    initialCountry={'none'}
                                                    allowZeroAfterCountryCode={false}
                                                    textProps={{placeholder: '+123 Enter your phone number'}}
                                                    onChangePhoneNumber={() => this.onChangePhoneNumber()}/>
                                    </Col>
                                </Row>
                                <Row size={1}>
                                    <Body style={{flexDirection: 'row'}}>
                                    <Text style={{color: 'grey', fontSize: 14, flexWrap: 'wrap', textAlign: 'center'}}>
                                        Minimum 6 characters, and must contain at least 1 lowercase, 1 uppercase and
                                        1 number
                                    </Text>
                                    </Body>
                                </Row>
                                <Row size={2}>
                                    <Col>
                                        <Item floatingLabel>
                                            <Label>Password</Label>
                                            <Input id="passwordInput"
                                                   secureTextEntry={true}
                                                   value={this.props.user.password}
                                                   onChangeText={(password) => this.onChangePassword(password)}/>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row size={2}>
                                    <Col>
                                        <Item floatingLabel>
                                            <Label>Password Again</Label>
                                            <Input id="passwordAgainInput"
                                                   secureTextEntry={true}
                                                   value={this.props.user.passwordAgain}
                                                   onChangeText={(password) => this.onChangePasswordAgain(password)}/>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row size={2}>
                                    <Col>
                                        <Body size={1}>
                                        {1 > 0 ?
                                            <Button id="signUpButton"
                                                    disabled={
                                                        this.props.error !== null ||
                                                        !this.props.user.passwordMatched ||
                                                        !this.phone.isValidNumber()}
                                                    rounded
                                                    onPress={() => {}}>
                                                <Text>Register</Text>
                                            </Button> : <Text/>}
                                        </Body>
                                    </Col>
                                </Row>


                                <Row size={1}>
                                    <Col style={styles.container}>
                                        <Row size={1}>
                                            {this.props.error ?
                                                <Label style={{color: 'red'}}>{this.props.error}</Label> : <Text/>}
                                        </Row>
                                    </Col>
                                </Row>
                                <Row size={7}>
                                </Row>
                            </Form>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }

    componentWillMount() {
        this.props.userActions.setPassword("");
        this.props.userActions.setPasswordAgain("");
    }

    componentWillUnmount() {
        this.props.userActions.setPassword("");
        this.props.userActions.setPasswordAgain("");
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

function mapStateToProps(state, ownProps) {
    return {
        user: state.userReducer.user,
        error: state.userReducer.error
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
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});