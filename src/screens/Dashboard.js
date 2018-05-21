import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Container, Content, Icon, List, ListItem, View, Grid, Col, Row, Text} from 'native-base';

import * as generalLedgerAction from '../actions/generalLedgerActions';

import {iconsMap} from '../util/app-icons';

export let rootNavigator = null;

export class Dashboard extends React.Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    constructor(props) {
        super(props);
        this.props.navigator.setButtons({
            // leftButtons: [
            //     {
            //         id: 'sideMenu'
            //     },
            //     {
            //         icon: iconsMap['ios-menu'],
            //         id: 'menuIcon'
            //     }
            // ],
            rightButtons: [
                {
                    icon: iconsMap['ios-add'],
                    id: 'addAccount'
                }
            ]
        });
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        rootNavigator = this.props.navigator;
    }

    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        });
    };

    showLightBox = () => {
        this.props.navigator.showLightBox({
            screen: 'AccountTypeSelection',
            passProps: {
                title: 'Choose account type'
            },
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                tapBackgroundToDismiss: true
            }
        });
    };

    onNavigatorEvent(event) {
        if ('NavBarButtonPress' === event.type && 'menuIcon' === event.id && Platform.OS === 'ios') {
            this.toggleDrawer();
        } else if ('DeepLink' === event.type) {
            this.props.navigator.resetTo({
                'screen': event.link
            });
        } else if ('NavBarButtonPress' === event.type && 'addAccount' === event.id) {
            this.showLightBox();
        }
    }

    displayAccount(accountName, accountUuid) {
        this.props.navigator.push({
            'screen': 'Account',
            passProps: {
                accountName: accountName,
                accountUuid: accountUuid
            }
        });
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
                    <Grid>
                        {this.props.generalLedgers.length > 0
                            ?
                            <Row>
                                <Col>
                                    {Platform.OS === "android" ? <Row size={1}>
                                    </Row> : <View/>}
                                    <Row size={9}>
                                        <List style={{flex: 1}}>
                                            {this.props.generalLedgers.map((generalLedger, i) =>
                                                <ListItem key={i} style={{alignItems: 'center'}}
                                                          onPress={() => this.displayAccount(generalLedger.name, generalLedger.uuid)}>
                                                    <Text>{generalLedger.name}</Text>
                                                </ListItem>)}
                                        </List>
                                    </Row>
                                </Col>
                            </Row>
                            :
                            <Row>
                                <Col>
                                    {Platform.OS === "android" ? <Row size={1}>
                                    </Row> : <View/>}
                                    <Row size={1}>
                                        <View style={styles.container}>
                                            <Icon type="FontAwesome" name="university"/>
                                            <Text testID="dashboardTitle">
                                                Add a bank account
                                            </Text>
                                        </View>
                                    </Row>
                                    <Row size={1}>
                                        <Col size={3}/>
                                        <Col size={2}>
                                            <Button onPress={() => this.showLightBox()}>
                                                <Text>New Account</Text>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row size={8}>
                                    </Row>
                                </Col>
                            </Row>}
                    </Grid>
                </Content>
            </Container>
        );
    }

    componentWillMount() {
        this.props.generalLedgerActions.list();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

function mapStateToProps(state, ownProps) {
    return {
        generalLedger: state.generalLedgerReducer.generalLedger,
        generalLedgers: state.generalLedgerReducer.list,
        error: state.generalLedgerReducer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        generalLedgerActions: bindActionCreators(generalLedgerAction, dispatch)
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