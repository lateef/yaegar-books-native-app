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

    handleChangeText = (email) => {
        this.props.userActions.updateEmail(email);
    };

    handlePress = () => {
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
                                        <Item floatingLabel>
                                            <Label>Email</Label>
                                            <Input id="emailInput" onChangeText={(email) => {
                                                this.handleChangeText(email)
                                            }} keyboardType={'email-address'} autoCapitalize="none"/>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row size={1}>
                                    {this.props.user.email.length > 0 ? <Button id="continueButton" rounded onPress={this.handlePress}>
                                        <Text>Continue</Text>
                                    </Button> : <Text/>}
                                </Row>
                                <Row size={4}>
                                </Row>
                            </Form>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

function mapStateToProps(state, ownProps) {
    return {
        user: state.userReducer.user
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