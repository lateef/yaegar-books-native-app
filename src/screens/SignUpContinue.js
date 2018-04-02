import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';

import {
    Container,
    Content,
    Text,
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

export class SignUpContinue extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    canNavigate = false;

    constructor(props) {
        super(props);
    }

    handlePasswordChangeText = (password) => {
        this.props.userActions.setPassword(password);
        this.props.userActions.validatePassword(password, this.props.user.passwordAgain);
    };

    handlePasswordAgainChangeText = (passwordAgain) => {
        this.props.userActions.setPasswordAgain(passwordAgain);
        this.props.userActions.validatePassword(this.props.user.password, passwordAgain);
    };

    handlePress = () => {
        if (this.props.user.passwordMatched) {
            this.props.userActions.signUp(this.props.user);
            this.canNavigate = true;
        }
    };

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={{height: 750}}>
                            <Form style={styles.container}>
                                <Row size={1}/>
                                <Row size={2}>
                                    <Text testID="signUpContinueTitle" style={{fontSize: 30}}>Sign Up</Text>
                                </Row>
                                <Row size={1}>
                                    <Text testID="signUpContinueHeading">Enter your password</Text>
                                </Row>
                                <Row size={1}>
                                    <Col style={{flex: 1, alignItems: 'center'}}>
                                        <Text style={{color: 'grey', fontSize: 14, padding: 10, textAlign: 'center'}}>
                                            Minimum 6 characters, and must contain at least 1 lowercase, 1 uppercase and 1 number
                                        </Text>
                                    </Col>
                                </Row>
                                <Row size={2}>
                                    <Col style={{padding: 10}}>
                                        <Item floatingLabel>
                                            <Label>Password</Label>
                                            <Input id="passwordInput"
                                                   testID="signUpContinuePasswordInput"
                                                   secureTextEntry={true}
                                                   onChangeText={(password) => {
                                                       this.handlePasswordChangeText(password)
                                                   }}/>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row size={2}>
                                    <Col style={{padding: 10}}>
                                        <Item floatingLabel>
                                            <Label>Password Again</Label>
                                            <Input id="passwordAgainInput"
                                                   testID="signUpContinuePasswordAgainInput"
                                                   secureTextEntry={true}
                                                   onChangeText={(passwordAgain) => this.handlePasswordAgainChangeText(passwordAgain)}/>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row size={2}>
                                    <Col style={styles.container}>
                                        <Row size={1}>
                                            {this.props.error ?
                                                <Label style={{color: 'red'}}>{this.props.error}</Label> : <Text/>}
                                        </Row>
                                        <Row size={1}>
                                            <Button id="signUpButton"
                                                    testID="signUpContinueSignUpButton"
                                                    disabled={this.props.error !== null || !this.props.user.passwordMatched}
                                                    rounded
                                                    onPress={this.handlePress}>
                                                <Text>Sign Up</Text>
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row size={6}>
                                </Row>
                            </Form>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }

    componentDidUpdate() {
        if (this.canNavigate && !this.props.error) {
            this.props.navigator.resetTo({
                screen: 'SignUpConfirmationSent'
            });
        }
        this.canNavigate = false;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContinue)

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