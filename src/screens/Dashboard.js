import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {Container, Content, View, Grid, Col, Row, Text, Button} from 'native-base';

import * as userAction from '../actions/userActions';

export class Dashboard extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    constructor(props) {
        super(props);
    }

    handleLogout = () => {
        this.props.userActions.logout();
        this.navigateToLandingPage();
    };

    handleUnregister = async () => {
        await this.props.userActions.unregister();
        this.navigateToLandingPage();
    };

    navigateToLandingPage() {
        this.props.navigator.resetTo({
            screen: 'Landing'
        });
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
                    <Grid>
                        <Row size={1}>
                        </Row>
                        <Row size={1}>
                        </Row>
                        <Row size={7}>
                            <View style={styles.container}>
                                <Text testID="dashboardTitle" style={{fontSize: 30}}>
                                    Yaegar Books Dashboard
                                </Text>
                            </View>
                        </Row>
                        <Row size={1}>
                            <Col size={1}></Col>
                            <Col size={4}>
                                <Button id="deleteAccount"
                                        testID="dashboardDeleteAccount"
                                        block onPress={() => {this.handleUnregister()}}>
                                    <Text>Delete Account</Text>
                                </Button>
                            </Col>
                            <Col size={1}></Col>
                            <Col size={4}>
                                <Button id="signOut"
                                        testID="dashboardSignOut"
                                        block onPress={() => {
                                    this.handleLogout()
                                }}>
                                    <Text>Sign Out</Text>
                                </Button>
                            </Col>
                            <Col size={1}></Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

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