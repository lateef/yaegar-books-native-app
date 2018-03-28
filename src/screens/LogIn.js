import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';

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

export class LogIn extends Component {
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
                            <View style={styles.container}>
                                <Form style={styles.container}>
                                    <Row size={1}>
                                    </Row>
                                    <Row size={2}>
                                        <Text style={{fontSize: 30}}>Log In</Text>
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
                                            <Text>Log In</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});