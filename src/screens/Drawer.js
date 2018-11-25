import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {Button, Container, Content, Text, Header, List, ListItem, Left, Body, Right, Icon, View} from 'native-base';

import * as userAction from '../actions/userActions';
import {goToAddBank, goToAddProduct, goToAuth, toggleDrawer} from "../App";

export class Drawer extends Component {
    constructor(props) {
        super(props);
    }

    handleSignUp = () => {
        toggleDrawer();
        goToAuth('signUpId');
    };

    handleSignIn = () => {
        toggleDrawer();
        goToAuth('signInId');
    };

    handleAddBankAccount = () => {
        goToAddBank();
    };

    handleAddProduct = () => {
        goToAddProduct();
    };

    handlePayment = () => {
        toggleDrawer();
    };

    handleLogout = async () => {
        toggleDrawer();
        await this.props.userActions.logout();
        goToAuth('signInId');
    };

    reset = () => {
        toggleDrawer();
        Alert.alert('Reset Account', 'This will delete data on phone only',
            [{
                text: 'OK', onPress: () => {
                    this.props.userActions.reset();
                    goToAuth('signUpId');
                }
            },
                {
                    text: 'Cancel', onPress: () => {}
                }
            ]
        );
    };

    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#161616" iosBarStyle="light-content" style={{backgroundColor: '#161616', justifyContent: 'center', padding: 10}}>
                    <Left style={{flex: 1}}>
                        <Icon name="ios-contact" style={{
                            fontSize: 36,
                            color: 'white'
                        }}/>
                    </Left>
                    <Body style={{flex: 1}}>
                    </Body>
                    <Right style={{flex: 6}}>
                        <Button transparent>

                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
                    <List>
                        {!this.props.user.isLoggedIn ?
                            <View>
                                <ListItem itemDivider>
                                    <Text/>
                                </ListItem>
                                <ListItem id="signUp" icon button onPress={() => {
                                    this.handleSignUp()
                                }}>
                                    <Left>
                                        <Icon name="ios-person-add" testID="signUpButton" style={{fontSize: 30}}/>
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
                                <ListItem id="signIn" icon button onPress={() => {
                                    this.handleSignIn()
                                }}>
                                    <Left>
                                        <Icon name="ios-log-in" testID="signInButton" style={{fontSize: 30}}/>
                                    </Left>
                                    <Body>
                                    <Text>Log In</Text>
                                    </Body>
                                    <Right>
                                        <Icon name="arrow-forward"/>
                                    </Right>
                                </ListItem>
                            </View>
                            :
                            <Text/>}
                        {this.props.user.isLoggedIn ?
                            <View>
                                <ListItem itemDivider>
                                    <Text/>
                                </ListItem>
                                <ListItem id="payment" icon button onPress={() => {
                                    this.handlePayment()
                                }}>
                                    <Left>
                                        <Icon name="ios-card" style={{fontSize: 28}}/>
                                    </Left>
                                    <Body>
                                    <Text>Payment</Text>
                                    </Body>
                                    <Right>
                                        <Icon name="arrow-forward"/>
                                    </Right>
                                </ListItem>
                                <ListItem itemDivider>
                                    <Text/>
                                </ListItem>
                                <ListItem id="logout" icon button onPress={() => {
                                    this.handleLogout()
                                }}>
                                    <Left>
                                        <Icon name="ios-log-out" style={{fontSize: 28}}/>
                                    </Left>
                                    <Body>
                                    <Text>Logout</Text>
                                    </Body>
                                    <Right>
                                        <Icon name="arrow-forward"/>
                                    </Right>
                                </ListItem>
                            </View>
                            :
                            <Text/>}
                        <ListItem itemDivider>
                            <Text/>
                        </ListItem>
                        <ListItem id="reset" icon button onPress={() => {
                            this.reset()
                        }}>
                            <Left>
                                <Icon name="ios-alert" style={{fontSize: 28}}/>
                            </Left>
                            <Body>
                            <Text>Reset</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text/>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)

function mapStateToProps(state, ownProps) {
    return {
        user: state.userReducer.user,
        error: state.userReducer.user.error
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