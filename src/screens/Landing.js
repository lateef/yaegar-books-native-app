import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container, Content, View, Grid, Col, Row, Text, Button} from 'native-base';

export class Landing extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    constructor(props) {
        super(props);
    }

    handlePress = (screen) => {
       alert(screen);
    };

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
                    <Grid>
                        <Row size={1}>
                        </Row>
                        <Row size={1}>
                        </Row>
                        <Row size={1}>
                            <View style={styles.container}>
                                <Text style={{fontSize: 50}}>
                                    Yaegar Books
                                </Text>
                            </View>
                        </Row>
                        <Row size={3}>
                        </Row>
                        <Row size={1}>
                            <Col size={1}>
                            </Col>
                            <Col size={4}>
                                <Button id="signUpButton" block onPress={() => {
                                    this.handlePress('SignUp')
                                }}>
                                    <Text>Sign Up</Text>
                                </Button>
                            </Col>
                            <Col size={1}>
                            </Col>
                            <Col size={4}>
                                <Button id="logInButton" block onPress={() => {
                                    this.handlePress('LogIn')
                                }}>
                                    <Text>Log In</Text>
                                </Button>
                            </Col>
                            <Col size={1}>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)

function mapStateToProps(state, ownProps) {
    return {
    };
}
function mapDispatchToProps(dispatch) {
    return {
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