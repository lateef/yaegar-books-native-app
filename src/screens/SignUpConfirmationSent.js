import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
    Container,
    Content,
    Text,
    Grid,
    Row,
    Col,
    Button
} from 'native-base';

export default class SignUpConfirmationSent extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
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
                        <Row style={{height: 500, padding:10}}>
                            <Col style={styles.container}>
                                <Row size={1}/>
                                <Row size={1}>
                                    <Text style={{fontSize: 30}}>Sign Up Email Sent</Text>
                                </Row>
                                <Row size={1}>
                                    <Text>
                                        A sign up confirmation has been sent to you email,
                                        Please click the link in the email to complete your registration.
                                    </Text>
                                </Row>
                                <Row size={1}>
                                    <Text>
                                        Then click the button below to login after your registration has been
                                        confirmed</Text>
                                </Row>
                                <Row size={1}>
                                    <Button id="logInButton" rounded onPress={() => {
                                        this.handlePress('LogIn')
                                    }}>
                                        <Text>Log In</Text>
                                    </Button>
                                </Row>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});