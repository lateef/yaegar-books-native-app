import React, {Component} from 'react';

import {
    Container,
    Content,
    Text,
    View,
    Grid,
    Col,
    Row,
    Button,
    Icon,
    Form,
    Item,
    Label,
    Input
} from 'native-base';

export default class SignUp extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
                    <Grid>
                        <Row>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Form style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Row size={1}>
                                    </Row>
                                    <Row size={2}>
                                        <Text style={{fontSize: 30}}>Sign Up</Text>
                                    </Row>
                                    <Row size={1}>
                                    </Row>
                                    <Row size={1}>
                                        <Text>Enter your email address</Text>
                                    </Row>
                                    <Row size={1}>
                                        <Col>
                                            <Item floatingLabel>
                                                <Label>Email</Label>
                                                <Input keyboardType={'email-address'} autoCapitalize="none"/>
                                            </Item>
                                        </Col>
                                    </Row>
                                    <Row size={2}>
                                    </Row>
                                    <Row size={1}>
                                        <Button block>
                                            <Text>Sign Up</Text>
                                            <Icon name='arrow-forward'/>
                                        </Button>
                                    </Row>
                                    <Row size={8}>
                                    </Row>
                                </Form>
                            </View>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}