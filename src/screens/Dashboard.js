import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Container,
    Content,
    Body,
    Right,
    Icon,
    List,
    ListItem,
    View,
    Grid,
    Col,
    Row,
    Text
} from 'native-base';

import * as generalLedgerAction from '../actions/generalLedgerActions';
import * as journalEntryAction from '../actions/journalEntryActions';
import * as userAction from '../actions/userActions';

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
                screen: event.link
            });
        }
    }

    displayProfile(profile, screen) {
        this.props.navigator.push({
            screen: screen,
            passProps: {
                profile: profile
            }
        });
    }

    render() {
        return (
            <Container>
                <Grid>
                    {Platform.OS === "android" ? <Row size={1}>
                    </Row> : <View/>}
                    <Row size={19}>
                        <Content contentContainerStyle={{flex: 1}} padder>
                            <Row>
                                <Col style={styles.container}>
                                    <Row size={2}>
                                        <List style={{flex: 1}}>
                                            <ListItem itemDivider>
                                                <Text>Personal</Text>
                                            </ListItem>
                                            {this.props.user.personalProfiles.map((personalProfile, i) =>
                                                <ListItem key={i} style={{alignItems: 'center'}}
                                                          onPress={() => this.displayProfile(personalProfile, 'PersonalProfile')}>
                                                    <Body>
                                                        <Text>{personalProfile.name}</Text>
                                                    </Body>
                                                    <Right>
                                                        <Icon name="arrow-forward"/>
                                                    </Right>
                                                </ListItem>)}
                                        </List>
                                    </Row>
                                    <Row size={2}>
                                        {this.props.user.businessProfiles.length > 0 ?
                                            <List style={{flex: 1}}>
                                                <ListItem itemDivider>
                                                    <Text>Business</Text>
                                                </ListItem>
                                                {this.props.user.businessProfiles.map((businessProfile, i) =>
                                                    <ListItem key={i} style={{alignItems: 'center'}}
                                                              onPress={() => {
                                                              }}>
                                                        <Body>
                                                        <Text>{businessProfile.name}</Text>
                                                        </Body>
                                                        <Right>
                                                            <Icon name="arrow-forward"/>
                                                        </Right>
                                                    </ListItem>)}
                                            </List> :
                                            <View>
                                                <Body>
                                                <Text>Add a business account</Text>
                                                </Body>
                                            </View>}
                                    </Row>
                                    <Row size={4}/>
                                </Col>
                            </Row>
                        </Content>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

function mapStateToProps(state, ownProps) {
    return {
        generalLedger: state.generalLedgerReducer.generalLedger,
        generalLedgers: state.generalLedgerReducer.accounts,
        user: state.userReducer.user,
        error: state.generalLedgerReducer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        generalLedgerActions: bindActionCreators(generalLedgerAction, dispatch),
        journalEntryActions: bindActionCreators(journalEntryAction, dispatch),
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