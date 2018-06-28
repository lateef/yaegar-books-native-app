import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';

import {
    Container,
    Content,
    Title,
    Text,
    Grid,
    Left,
    Right,
    Body,
    Row,
    Form,
    Switch,
    List,
    ListItem
} from 'native-base';

import * as userAction from '../actions/userActions';

export class Settings extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    constructor(props) {
        super(props);
    }

    handlePassCode(passCode) {
        if (passCode) {
            this.props.userActions.updatePassCode(null);
            this.props.navigator.showModal({
                screen: 'PassCode',
                passProps: {
                    from: 'Settings'
                }
            });
        } else {
            this.props.userActions.updatePassCode(null, true);
        }
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Grid>
                        <Row>
                            <Form style={styles.container}>
                                <Row size={1}>
                                    <Title style={{color: 'black'}}>Settings</Title>
                                </Row>
                                <Row size={9}>
                                    <List style={{flex: 1}}>
                                        <ListItem itemDivider/>
                                        <ListItem icon>
                                            <Left/>
                                            <Body>
                                            <Text>Turn {this.props.user.passCodeMatch ? 'off' : 'on'} pass code</Text>
                                            </Body>
                                            <Right>
                                                <Switch value={this.props.user.passCodeMatch}
                                                        onValueChange={(passCode) => this.handlePassCode(passCode)}/>
                                            </Right>
                                        </ListItem>
                                        <ListItem itemDivider/>
                                    </List>
                                </Row>
                            </Form>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

function mapStateToProps(state, ownProps) {
    return {
        user: state.userReducer.user,
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
    }
});