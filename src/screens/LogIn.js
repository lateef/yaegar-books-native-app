import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';

import {
    Container,
    Content,
    Text,
    View,
    Grid,
    Col,
    Row,
    Button,
    Form,
    Item,
    Label,
    Input
} from 'native-base';

import * as userAction from '../actions/userActions';

export class LogIn extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Home',
                id: 'home'
            }
        ]
    };

    constructor(props) {
        super(props);
        this.props.userActions.init();
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if ('NavBarButtonPress' === event.type) {
            this.props.userActions.reset();
            this.props.navigator.resetTo({
                screen: 'Landing'
            });
        }
    }

    handleEmailChangeText = (email) => {
        this.props.userActions.updateEmail(email.trim());
    };

    handlePasswordChangeText = (password) => {
        this.props.userActions.setPassword(password);
    };

    handleClearLogout = () => {
        setTimeout(this.props.userActions.clearLogout, 5000);
    };

    handlePress = async () => {
        await this.props.userActions.validateEmail(this.props.user.email);
        await this.props.userActions.validatePassword(this.props.user.password, this.props.user.password);
        if (!this.props.error) {
            await this.props.userActions.logIn(this.props.user);
            if (this.props.user.isLoggedIn) {
                this.props.navigator.resetTo({
                    screen: 'Dashboard'
                });
            }
        }
    };

    handleForgotPassword = (screen) => {
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
                            <View style={styles.container}>
                                <Form style={styles.container}>
                                    <Row size={1}>
                                    </Row>
                                    <Row size={2}>
                                        <Text testID="logInTitle" style={{fontSize: 30}}>Log In</Text>
                                    </Row>
                                    <Row size={1}>
                                        <Text testID="logInHeading">Enter your email address/password</Text>
                                    </Row>
                                    <Row size={2}>
                                        <Col style={{padding: 10}}>
                                            <Item floatingLabel>
                                                <Label>Email</Label>
                                                <Input testID="logInEmailInput"
                                                       id="emailInput"
                                                       value={this.props.user.email}
                                                       onChangeText={(email) => {
                                                           this.handleEmailChangeText(email)
                                                       }} keyboardType={'email-address'} autoCapitalize="none"/>
                                            </Item>
                                        </Col>
                                    </Row>
                                    <Row size={2}>
                                        <Col style={{padding: 10}}>
                                            <Item floatingLabel>
                                                <Label>Password</Label>
                                                <Input testID="logInPasswordInput" id="passwordInput"
                                                       secureTextEntry={true}
                                                       onChangeText={(password) => this.handlePasswordChangeText(password)}/>
                                            </Item>
                                        </Col>
                                    </Row>
                                    <Row size={2}>
                                        {this.props.error ?
                                            <Label testID="logInErrorLabel"
                                                   style={{color: 'red'}}>{this.props.error}</Label> : <Text/>}

                                        {this.props.user.isLoggedOut ?
                                            <Label testID="isLoggedOutLabel"
                                                   onLayout={() => {this.handleClearLogout()}}
                                                   style={{color: 'green'}}>Logged out successfully</Label> : <Text/>}
                                    </Row>
                                    <Row size={2}>
                                        <Button id="logInButton"
                                                testID="logInContinueButton"
                                                disabled={this.props.error !== null}
                                                rounded
                                                onPress={this.handlePress}>
                                            <Text>Log In</Text>
                                        </Button>
                                    </Row>
                                    <Row size={2}>
                                        <Button  id="forgotPasswordButton"
                                                 transparent onPress={() => {
                                            this.handleForgotPassword('ForgotPassword')
                                        }}>
                                            <Text>Forgot Password?</Text>
                                        </Button>
                                    </Row>
                                    <Row size={5}>
                                    </Row>
                                </Form>
                            </View>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }

    componentWillMount() {
        if (this.props.error) {
            this.props.userActions.reset();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)

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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});