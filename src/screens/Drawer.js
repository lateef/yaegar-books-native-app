import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {Container, Content, Grid, Col, Row, Text, Button} from 'native-base';

import * as userAction from '../actions/userActions';

export class Drawer extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    constructor(props) {
        super(props);
    }

    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true,
            to: 'close'
        });
    };

    handleLogout = async () => {
        await this.props.userActions.logout();
        this.toggleDrawer();
        this.navigateToLandingPage();
    };

    handleUnregister = async () => {
        await this.props.userActions.unregister();
        this.toggleDrawer();
        this.navigateToLandingPage();
    };

    navigateToLandingPage = () => {
        this.props.navigator.handleDeepLink({
            link: 'Landing'
        });
    };

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
                    <Grid>
                        <Row size={1}>
                        </Row>
                        <Row size={3}>
                            <Col size={4}>
                                <Text>{this.props.user.email}</Text>
                            </Col>
                        </Row>
                        <Row size={7}>
                        </Row>
                        <Row size={1}>
                            <Col size={1}></Col>
                            <Col size={4}>
                                <Button id="deleteAccount"
                                        testID="dashboardDeleteAccount"
                                        block onPress={() => {
                                    this.handleUnregister()
                                }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)

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