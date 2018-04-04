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

export class ForgotPassword extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    constructor(props) {
        super(props);
        this.props.userActions.init();
    }

    handleEmailChangeText = (email) => {
        this.props.userActions.updateEmail(email.trim());
    };

    handlePress = async () => {
        await this.props.userActions.validateEmail(this.props.user.email);
        if (!this.props.error) {
            await this.props.userActions.forgotPassword(this.props.user);
            if (this.props.user.hasSentForgottenPassword) {
                this.props.navigator.push({
                    screen: 'ForgotPasswordSent'
                });
            }
        }
    };

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={{height: 500}}>
                            <Form style={styles.container}>
                                <Row size={1}/>
                                <Row size={2}>
                                    <Text testID="forgotPasswordTitle" style={{fontSize: 30}}>Forgot Password</Text>
                                </Row>
                                <Row size={1}>
                                    <Text testID="forgotPasswordHeading"
                                          style={{color: 'grey', fontSize: 14, padding: 10, textAlign: 'center'}}>
                                        Enter your email address and we'll send you a link to reset your password
                                    </Text>
                                </Row>
                                <Row size={2}>
                                    <Col style={{padding: 10}}>
                                        <Item
                                            floatingLabel
                                            error={this.props.error !== null}>
                                            <Label>Email</Label>
                                            <Input testID="forgotPasswordEmailInput" id="emailInput"
                                                   onChangeText={(email) => {
                                                       this.handleEmailChangeText(email)
                                                   }} keyboardType={'email-address'} autoCapitalize="none"/>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row size={2}>
                                    <Col style={styles.container}>
                                        <Row size={1}>
                                            {this.props.error ?
                                                <Label testID="forgotPasswordErrorLabel"
                                                       style={{color: 'red'}}>{this.props.error}</Label> : <Text/>}
                                        </Row>
                                        <Row size={1}>
                                            {this.props.user.email.length > 0 ?
                                                <Button id="continueButton"
                                                        testID="forgotPasswordContinueButton"
                                                        disabled={this.props.error !== null}
                                                        rounded
                                                        onPress={this.handlePress}>
                                                    <Text>Send</Text>
                                                </Button> : <Text/>}
                                        </Row>
                                    </Col>
                                </Row>
                                <Row size={3}>
                                </Row>
                            </Form>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)

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