import React, {Component} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {
    Container,
    Content,
    Text,
    Grid,
    Row,
    Col,
    Button,
    Item,
    Label,
    Input
} from 'native-base';

export default class SignUpComplete extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    smsCode = "";

    onChangeSmsCode = () => {
        console.log(this.smsCode)
    };

    handlePress = () => {
        this.props.navigator.resetTo({
            screen: 'Dashboard'
        });
    };

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={{padding: 10}}>
                            <Col style={styles.container}>
                                <Row size={1}>
                                    <Text style={{fontSize: 30}}>Sign Up SMS Sent</Text>
                                </Row>
                                <Row size={1}>
                                    <Text>
                                        A sign up confirmation SMS has been sent to your phone.
                                        Please enter the 4 digit code from the SMS to complete your registration.
                                    </Text>
                                </Row>
                                <Row size={1}>
                                    <Col>
                                        <Item floatingLabel>
                                            <Label>SMS code</Label>
                                            <Input id="smsCodeInput"
                                                   value={this.smsCode}
                                                   onChangeText={(code) => this.onChangeSmsCode(code)}/>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row size={1}>
                                    <Button id="submitButton"
                                            // disabled={!this.smsCode && this.smsCode.length < 4}
                                            rounded onPress={() => this.handlePress()}>
                                        <Text>Submit</Text>
                                    </Button>
                                </Row>
                                <Row size={5}/>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});