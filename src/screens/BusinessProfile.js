import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Button,
    Container,
    Content,
    Icon,
    Left,
    Body,
    Right,
    List,
    ListItem,
    View,
    Grid,
    Col,
    Row,
    Text
} from 'native-base';

import * as appAction from "../actions/appActions";
import * as generalLedgerAction from '../actions/generalLedgerActions';
import * as journalEntryAction from '../actions/journalEntryActions';
import * as userAction from '../actions/userActions';
import DATA from '../baseChartOfAccounts';

import {iconsMap} from '../util/app-icons';

export let rootNavigator = null;

export class BusinessProfile extends React.Component {
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
                    id: 'dashboard'
                },
                {
                    icon: iconsMap['ios-grid'],
                    id: 'menuIcon'
                }
            ],
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

    showLightBox = () => {
        this.props.navigator.showLightBox({
            screen: 'BusinessAccountTypeSelection',
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
        if ('NavBarButtonPress' === event.type && 'menuIcon' === event.id) {
            this.props.appActions.onStart();
        } else if ('NavBarButtonPress' === event.type && 'addAccount' === event.id) {
            this.showLightBox();
        } else if (event.type === 'ScreenChangedEvent' && event.id === 'willAppear') {
            this.initDashboard().then(() => {});
        }
    }

    displayAccount(generalLedger) {
        this.props.navigator.push({
            screen: 'Account',
            passProps: {
                account: {
                    uuid: generalLedger.uuid,
                    name: generalLedger.name,
                    type: generalLedger.type
                }
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
                        <Content padder>
                            <View>
                                {this.props.generalLedgers.length > 0 ?
                                    <Row>
                                        <Col>
                                            <Row size={9}>
                                                <List style={{flex: 1}}>
                                                    <ListItem itemDivider>
                                                        <Text>Accounts</Text>
                                                    </ListItem>
                                                    {this.props.generalLedgers.map((generalLedger, i) =>
                                                        <View key={i}>
                                                            <ListItem style={{alignItems: 'center'}} icon
                                                                      onPress={() => this.displayAccount(generalLedger)}>
                                                                <Left>
                                                                    {generalLedger.classifier === "Bank" ?
                                                                        <Icon type="FontAwesome" style={{fontSize: 20}}
                                                                              name="university"/>
                                                                        : <Text/>}
                                                                    {generalLedger.classifier === "Credit" ?
                                                                        <Icon type="FontAwesome" style={{fontSize: 20}}
                                                                              name="credit-card"/>
                                                                        : <Text/>}
                                                                    {generalLedger.classifier === "Cash" ?
                                                                        <Icon name="cash" style={{fontSize: 25}}/>
                                                                        : <Text/>}
                                                                </Left>
                                                                <Body>
                                                                <Text>{generalLedger.name}</Text>
                                                                </Body>
                                                                <Right>
                                                                    <Text>{generalLedger.total}</Text>
                                                                </Right>
                                                            </ListItem>
                                                            <ListItem itemDivider>
                                                                <Text/>
                                                            </ListItem>
                                                        </View>)}
                                                </List>
                                            </Row>
                                        </Col>
                                    </Row>
                                    :
                                    <Row>
                                        <Col>
                                            <Row size={1}>
                                                <View style={styles.container}>
                                                    <Icon type="FontAwesome" name="university"/>
                                                    <Text testID="dashboardTitle">
                                                        Add an account
                                                    </Text>
                                                </View>
                                            </Row>
                                            <Row size={1}/>
                                            <Row size={1}>
                                                <Col size={3}/>
                                                <Col size={2}>
                                                    <Button onPress={() => this.showLightBox()}>
                                                        <Text>New Account</Text>
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Row size={7}>
                                            </Row>
                                        </Col>
                                    </Row>}
                            </View>
                        </Content>
                    </Row>
                </Grid>
            </Container>
        );
    }

    componentWillMount() {
        this.initDashboard().then(() => {});
    }

    async initDashboard() {
        const generalLedger = DATA.chartOfAccounts.filter(function (ledgerEntry) {
            return ledgerEntry.name === 'Bank' && ledgerEntry.type === 'business1';
        })[0];
        await this.props.generalLedgerActions.listByProfileUuidAndParentUuid(
            'LIST_GENERAL_LEDGERS_ACCOUNTS',
            this.props.profile.uuid,
            [generalLedger.uuid]
        );
        this.props.generalLedgers.map((generalLedger) => {
            this.props.journalEntryActions.sumAmountByGeneralLedgerUuid(generalLedger.uuid)
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile)

function mapStateToProps(state, ownProps) {
    return {
        generalLedger: state.generalLedgerReducer.generalLedger,
        generalLedgers: state.generalLedgerReducer.accounts,
        user: state.userReducer.user,
        profile: state.userReducer.profile,
        error: state.generalLedgerReducer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appAction, dispatch),
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