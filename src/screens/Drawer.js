import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {Button, Container, Content, Text, Header, List, ListItem, Left, Body, Right, Icon} from 'native-base';

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

    handleSignUp() {
        this.toggleDrawer();
        if (Platform.OS === 'android') {
            this.props.navigator.push({
                screen: 'SignUp'
            });
        }
        if (Platform.OS === 'ios') {
            rootNavigator.push({
                screen: 'SignUp'
            });
        }
    }

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

    handleCategories = () => {
        this.toggleDrawer();
        if (Platform.OS === 'android') {
            this.props.navigator.push({
                screen: 'Categories'
            });
        }
        if (Platform.OS === 'ios') {
            rootNavigator.push({
                screen: 'Categories'
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
                        <Icon name="ios-contact" style={{fontSize: 36}}/>
                    </Left>
                    <Body style={{flex: 4}}>
                    </Body>
                    <Right style={{flex: 4}}>
                        <Button transparent >
                            <Text style={{color: 'black'}}>Sign Up</Text>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
                    <List>
                        <ListItem itemDivider>
                            <Text/>
                        </ListItem>
                        <ListItem id="signUp" icon button onPress={() => {this.handleSignUp()}}>
                            <Left>
                                <Icon name="ios-person-add" style={{fontSize: 36}}/>
                            </Left>
                            <Body>
                            <Text>Sign Up</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text/>
                        </ListItem>
                        <ListItem id="settings" icon button onPress={() => {this.handleSettings()}}>
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
                        <ListItem id="categories" icon button onPress={() => {this.handleCategories()}}>
                            <Left>
                                <Icon type="FontAwesome" name='object-group' style={{fontSize: 20}}/>
                            </Left>
                            <Body>
                            <Text>Categories</Text>
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