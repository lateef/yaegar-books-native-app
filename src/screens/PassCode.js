import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import CodeInput from 'react-native-confirmation-code-input';

import {
    Container,
    Title,
    Grid,
    Body,
    Row
} from 'native-base';

import * as userAction from '../actions/userActions';
import * as appAction from '../actions/appActions';

export class PassCode extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    constructor(props) {
        super(props);
    }

    async onFinishCheckingCode(value1, value2) {
        if (this.props.from === 'Settings' || this.props.confirm) {
            if (value1 && !value2) {
                this.props.userActions.updatePassCode(value1, false);
                this.props.navigator.showModal({
                    screen: 'PassCode',
                    passProps: {
                        confirm: true
                    }
                });
            } else if (value1 === true) {
                this.props.userActions.updatePassCode(value2, true);

                Alert.alert('Passcode', 'Passcode saved successfully',
                    [{
                        text: 'OK', onPress: () => {
                            this.props.navigator.dismissAllModals({});
                        }
                    }]
                );
            } else if (value1 === false) {
                this.props.userActions.updatePassCode(null, true);

                Alert.alert('Passcode', 'Passcode don\'t match',
                    [{
                        text: 'OK', onPress: () => {
                            this.props.navigator.dismissAllModals({});
                        }
                    }]
                );
            }
        } else {
            await this.props.userActions.grantAccess(value1);
            if (this.props.user.accessGranted) {
                this.props.appActions.onStart();
            } else {
                Alert.alert('Passcode', 'Wrong passcode',
                    [{
                        text: 'OK', onPress: () => {
                            this.props.navigator.showModal({
                                screen: 'PassCode'
                            });
                        }
                    }]
                );
            }
        }
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Row size={3}/>
                    <Row size={1}>
                        <Body>
                        <Title style={{color: 'black'}}>
                            Enter your pass code {(this.props.user.passCode && this.props.confirm) ? 'again' : ''}
                        </Title>
                        </Body>
                    </Row>
                    <Row size={3}>
                        <CodeInput
                            ref="codeInputRef"
                            secureTextEntry
                            codeLength={4}
                            compareWithCode={this.props.user.passCode}
                            keyboardType="numeric"
                            activeColor='rgba(49, 180, 4, 1)'
                            inactiveColor='rgba(49, 180, 4, 1.3)'
                            // autoFocus={false}
                            inputPosition='center'
                            size={50}
                            onFulfill={(value1, value2) => this.onFinishCheckingCode(value1, value2)}
                            containerStyle={{marginTop: 30}}
                            codeInputStyle={{fontWeight: '800', borderWidth: 1.5}}
                        />
                    </Row>
                    <Row size={1}>
                        {/*<Text>Register to retrieve passcode</Text>*/}
                    </Row>
                    <Row size={8}/>
                </Grid>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PassCode)

function mapStateToProps(state, ownProps) {
    return {
        user: state.userReducer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appAction, dispatch),
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