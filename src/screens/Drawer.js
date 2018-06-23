import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {Container, Content, Text, Header, List, ListItem, Left, Body, Right, Icon} from 'native-base';

import {rootNavigator} from './Dashboard';

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

    handleSettings = () => {
        this.toggleDrawer();
        if (Platform.OS === 'android') {
            this.props.navigator.push({
                screen: 'Settings'
            });
        }
        if (Platform.OS === 'ios') {
            rootNavigator.push({
                screen: 'Settings'
            });
        }
    };

    // handleLogout = async () => {
    //     await this.props.userActions.logout();
    //     this.toggleDrawer();
    //     this.navigateToLandingPage();
    // };
    //
    // navigateToLandingPage = () => {
    //     this.props.navigator.handleDeepLink({
    //         link: 'Landing'
    //     });
    // };

    render() {
        return (
            <Container>
                <Header>
                    <Left style={{flex: 1}}>
                        <Icon ios="ios-contact" android="md-contact"/>
                    </Left>
                    <Body style={{flex: 4}}>
                    {/*<Text>{this.props.user.email}</Text>*/}
                    </Body>
                    <Right style={{flex: 1}}>
                    </Right>
                </Header>
                <Content contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
                    <List>
                        <ListItem itemDivider>
                            <Text/>
                        </ListItem>
                        <ListItem id="settings"
                                  icon button onPress={() => {this.handleSettings()}}>
                            <Left>
                                <Icon ios="ios-cog" android="md-cog"/>
                            </Left>
                            <Body>
                                <Text>Settings</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text/>
                        </ListItem>
                        {/*<ListItem id="signOut"*/}
                            {/*icon button onPress={() => {*/}
                            {/*this.handleLogout()*/}
                        {/*}}>*/}
                            {/*<Left>*/}
                                {/*<Icon ios="ios-log-out" android="md-log-out"/>*/}
                            {/*</Left>*/}
                            {/*<Body>*/}
                            {/*<Text>Sign Out</Text>*/}
                            {/*</Body>*/}
                            {/*<Right>*/}
                                {/*<Icon name="arrow-forward"/>*/}
                            {/*</Right>*/}
                        {/*</ListItem>*/}
                    </List>
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)

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