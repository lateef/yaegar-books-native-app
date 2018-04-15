import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {Container, Content, View, Grid, Col, Row, Text} from 'native-base';

import * as userAction from '../actions/userActions';
import {iconsMap} from '../util/app-icons';

export let rootNavigator = null;

export class Dashboard extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    constructor(props) {
        super(props);
        this.props.navigator.setButtons({
            leftButtons: [
                {
                    id: 'sideMenu'
                },
                {
                    icon: iconsMap['ios-menu'],
                    id: 'menuIcon'
                }
            ]
        });
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        rootNavigator = this.props.navigator
    }

    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        });
    };

    onNavigatorEvent(event) {
        if ('NavBarButtonPress' === event.type && Platform.OS === 'ios') {
           this.toggleDrawer();
        } else if ('DeepLink' === event.type) {
            this.props.navigator.resetTo({
                'screen': event.link
            })
        }
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
                    <Grid>
                        <Row style={{}}>
                            <Col>
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
                                </Row>
                            </Col>
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