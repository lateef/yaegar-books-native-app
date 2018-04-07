import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {Container, Content, View, Grid, Col, Row, Text} from 'native-base';

import * as userAction from '../actions/userActions';

export class Dashboard extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    static navigatorButtons = {
        leftButtons: [
            {
                id: 'sideMenu'
            },
            {
                icon: require('../img/menu.png'),
                id: 'menuIcon'
            }
        ]
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        });
    };

    onNavigatorEvent(event) {
        console.log(event)
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