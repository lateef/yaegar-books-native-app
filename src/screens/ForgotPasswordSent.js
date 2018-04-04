import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';

import {
    Container,
    Content,
    Grid,
    Col,
    Row,
    Form,
    Input,
    Item,
    Label,
    Text,
    View,
    Button,
    Right
} from 'native-base';

import * as user from '../actions/userActions';

export class ForgotPasswordSent extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    handleChangeEmail = (email) => {
        this.props.userActions.updateEmail(email.trim());
    };

    handleChangeResetCode = (resetCode) => {
        this.props.userActions.setResetCode(resetCode.trim());
    };

    handleChangePassword = (password) => {
        this.props.userActions.setPassword(password);
        this.props.userActions.validatePassword(password, this.props.user.passwordAgain);
    };

    handleChangePasswordAgain = (passwordAgain) => {
        this.props.userActions.setPasswordAgain(passwordAgain);
        this.props.userActions.validatePassword(this.props.user.password, passwordAgain);
    };

    handleResetPassword = () => {
        if (this.props.user.passwordMatched) {
            this.props.userActions.forgotPasswordReset(this.props.user);
        }
    };

    handlePress = (screen) => {
        this.props.navigator.push({
            screen: screen
        });
    };

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={{height: 750}}>
                            {this.props.user.passwordReset ?
                                <View style={styles.container}>
                                    <Row size={1}/>
                                    <Row size={1}>
                                        <Text style={{padding: 10, fontSize: 30, textAlign: 'center'}}>
                                            Password Reset Successfully!
                                        </Text>
                                    </Row>
                                    <Row size={1}>
                                        <Button rounded onPress={() => {
                                            this.handlePress('LogIn')
                                        }}>
                                            <Text>Log In</Text>
                                        </Button>
                                    </Row>
                                </View>
                                :
                                <Form style={styles.container}>
                                    <Row size={1}/>
                                    <Row size={2}>
                                        <Text style={{fontSize: 30}}>Sent! Check Your Email</Text>
                                    </Row>
                                    <Row size={2} style={{padding: 10}}>
                                        <Text style={{color: 'grey', fontSize: 14, alignItems: 'center'}}>
                                            Go to your mailbox to get your reset code and enter the code and your new password below
                                        </Text>
                                    </Row>
                                    <Row size={1}>
                                        <Text>Enter your email address</Text>
                                    </Row>
                                    <Row size={2}>
                                        <Col style={{padding: 10}}>
                                            <Item floatingLabel>
                                                <Label>Email</Label>
                                                <Input testID="forgotPasswordSentEmailInput" id="emailInput"
                                                        onChangeText={(email) => this.handleChangeEmail(email)}
                                                       keyboardType={'email-address'} autoCapitalize="none"/>
                                            </Item>
                                        </Col>
                                    </Row>
                                    <Row size={2}/>
                                    <Row size={1}>
                                        <Text>Enter your reset code</Text>
                                    </Row>
                                    <Row size={2}>
                                        <Col style={{padding: 10}}>
                                            <Item floatingLabel>
                                                <Label>Reset code</Label>
                                                <Input testID="forgotPasswordSentResetCodeInput" id="resetCodeInput"
                                                       secureTextEntry={true}
                                                       onChangeText={(resetCode) => this.handleChangeResetCode(resetCode)}
                                                       keyboardType={'numeric'}/>
                                            </Item>
                                        </Col>
                                    </Row>
                                    <Row size={2}/>
                                    <Row size={1}>
                                        <Text>Create your new password</Text>
                                    </Row>
                                    <Row size={3}>
                                        <Col style={{padding: 10}}>
                                            <Item floatingLabel>
                                                <Label>Password</Label>
                                                <Input testID="forgotPasswordSentPasswordInput" id="passwordInput"
                                                       secureTextEntry={true}
                                                       onChangeText={(password) => this.handleChangePassword(password)}/>
                                            </Item>
                                        </Col>
                                    </Row>
                                    <Row size={3}>
                                        <Col style={{padding: 10}}>
                                            <Item floatingLabel>
                                                <Label>Password Again</Label>
                                                <Input testID="forgotPasswordSentPasswordAgainInput" id="passwordAgainInput"
                                                       secureTextEntry={true}
                                                       onChangeText={(passwordAgain) => this.handleChangePasswordAgain(passwordAgain)}/>
                                            </Item>
                                        </Col>
                                    </Row>
                                    <Row size={2}>
                                        {this.props.error ? <Label style={{color: 'red', alignItems: 'center', padding: 10}}>
                                            {this.props.error}
                                            </Label> : <Text/>}
                                    </Row>
                                    <Row size={3} style={{alignSelf: 'center'}}>
                                        <Button testID="forgotPasswordSentResetPasswordButton"
                                                id="resetPasswordButton"
                                                rounded onPress={() => {
                                            this.handleResetPassword()
                                        }}
                                                disabled={!this.props.user.passwordMatched || !this.props.user.resetCode}>
                                            <Text>Reset password</Text>
                                        </Button>
                                    </Row>
                                    <Row size={6}/>
                                </Form>}
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordSent)

function mapStateToProps(state, ownProps) {
    return {
        user: state.userReducer.user,
        error: state.userReducer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(user, dispatch)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});