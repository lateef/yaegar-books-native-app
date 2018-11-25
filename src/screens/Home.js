import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Text, Grid, Content, Row, Col, Card, CardItem} from 'native-base';
import {Navigation} from "react-native-navigation";

import * as userAction from "../actions/userActions";

export class Home extends React.Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({buttonId}) {
        if ('menu' === buttonId) {
            if (Platform.OS === 'android') {
                Navigation.mergeOptions("homeSideMenu", {
                    sideMenu: {
                        left: {
                            visible: true
                        },
                        right: {
                            visible: false
                        }
                    }
                });
            } else {
                Navigation.mergeOptions("homeSideMenu", {
                    sideMenu: {
                        left: {
                            visible: true
                        }
                    }
                });
            }
        } else  if ('notificationMenu' === buttonId) {
            if (Platform.OS === 'android') {
                Navigation.mergeOptions("homeSideMenu", {
                    sideMenu: {
                        right: {
                            visible: true
                        },
                        left: {
                            visible: false
                        }
                    }
                });
            } else {
                Navigation.mergeOptions("homeSideMenu", {
                    sideMenu: {
                        right: {
                            visible: true
                        }
                    }
                });
            }
        }
    }

    render() {
        return (
            <Container>
                <Grid style={{justifyContent: 'center', padding: 10}}>
                    <Content>
                        <Row size={1}>
                            <Text/>
                        </Row>
                        <Row size={2}>
                            <Col>
                                <Card>
                                    <CardItem header bordered>
                                        <Text style={styles.textCentered}>Welcome</Text>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Grid>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

function mapStateToProps(state, ownProps) {
    return {
        user: state.userReducer.user
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
        padding: 10
    },
    h1: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    },
    text: {
        textAlign: 'left',
        color: '#161616',
        fontSize: 18
    },
    textCentered: {
        textAlign: 'center',
        color: '#161616',
        fontSize: 18
    }
});
