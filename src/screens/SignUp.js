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

export class SignUp extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    canNavigate = false;

    constructor(props) {
        super(props);
        this.props.userActions.init();
    }

    handleEmailChangeText = (email) => {
        this.props.userActions.updateEmail(email.trim());
    };

    handlePress = () => {
        this.canNavigate = true;
        this.props.userActions.validateEmail(this.props.user.email);
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
                                    <Text style={{fontSize: 30}}>Sign Up</Text>
                                </Row>
                                <Row size={1}>
                                    <Text>Enter your email address</Text>
                                </Row>
                                <Row size={2}>
                                    <Col style={{padding: 10}}>
                                        <Item
                                            floatingLabel
                                            error={this.props.error !== null}>
                                            <Label>Email</Label>
                                            <Input id="emailInput" onChangeText={(email) => {
                                                this.handleEmailChangeText(email)
                                            }} keyboardType={'email-address'} autoCapitalize="none"/>
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
                                            {this.props.user.email.length > 0 ?
                                                <Button id="continueButton"
                                                        disabled={this.props.error !== null}
                                                        rounded
                                                        onPress={this.handlePress}>
                                                    <Text>Continue</Text>
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

    componentDidUpdate() {
        if (this.canNavigate && !this.props.error) {
            this.props.navigator.push({
                screen: 'SignUpContinue'
            });
        }
        this.canNavigate = false;
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});