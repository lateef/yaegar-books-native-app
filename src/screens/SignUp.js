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

export class SignUp extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
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
                                    <Col>
                                        <Item floatingLabel>
                                            <Label>Email</Label>
                                            <Input keyboardType={'email-address'} autoCapitalize="none"/>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row size={1}>
                                    <Button block>
                                        <Text>Sign Up</Text>
                                        <Icon name='arrow-forward'/>
                                    </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

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