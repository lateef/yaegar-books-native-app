import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
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

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container} padder>
                    <Grid>
                        <Row>
                            <Form style={styles.container}>
                                <Row size={3}>
                                    <Body>
                                    <Title style={{fontSize: 30, color: 'black'}}>Sign Up</Title>
                                    </Body>
                                </Row>
                                <Row size={2}>
                                    <Body>
                                    <Text>Enter your phone number with country code</Text>
                                    </Body>
                                </Row>
                                <Row size={1}>
                                    <Col>
                                        <Label>Phone Number</Label>
                                        <PhoneInput ref='phone'
                                                    initialCountry={'none'}
                                                    allowZeroAfterCountryCode={false}
                                                    textProps={{placeholder: '+123 Enter your phone number'}}
                                                    onChangePhoneNumber={() => {
                                                    }}/>
                                    </Col>
                                </Row>
                                <Row size={2}>
                                    <Col>
                                        <Item floatingLabel>
                                            <Label>Password</Label>
                                            <Input id="passwordInput"
                                                   secureTextEntry={true}
                                                   onChangeText={(name) => {
                                                   }}/>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row size={1}/>
                                <Row size={1}>
                                    <Col>
                                        <Body size={1}>
                                            {1 > 0 ?
                                            <Button id="continueButton"
                                                    disabled={this.props.error !== null}
                                                    rounded
                                                    onPress={() => {
                                                    }}>
                                                <Text>Register</Text>
                                            </Button> : <Text/>}
                                        </Body>
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
        justifyContent: 'center'
    },
});