import React from 'react';
import {connect} from 'react-redux';
import {Button, Dimensions, Platform, StyleSheet, View} from 'react-native';
import {bindActionCreators} from 'redux';

import {
    Icon,
    Text,
    Grid,
    Col,
    Row
} from 'native-base';

import {rootNavigator} from '../Dashboard';

export class BusinessAccountTypeSelection extends React.Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    addAccount = (accountType) =>  {
        this.dismissLightBox();
        const pushObject = {
            screen: 'AddAccount',
            passProps: {
                accountType: accountType,
                generalLedgerName: 'Bank',
                generalLedgerType: 'business1'
            }
        };

        if (Platform.OS === 'android') {
            this.props.navigator.push(pushObject);
        }
        if (Platform.OS === 'ios') {
            rootNavigator.push(pushObject);
        }
    };

    dismissLightBox = () => {
        this.props.navigator.dismissLightBox();
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 8}}>
                    <Text/>
                    <Grid>
                        <Row size={2}>
                            <Text style={styles.title}>{this.props.title}</Text>
                        </Row>
                        <Row size={2}>
                            <Col size={1}>
                                <Icon type="FontAwesome" name="university"/>
                            </Col>
                            <Col size={3} onPress={() => this.addAccount('Bank')}>
                                <Row>
                                    <Text style={styles.title}>BANK</Text>
                                </Row>
                                <Row>
                                    <Text>Bank Account</Text>
                                </Row>
                            </Col>
                        </Row>
                        <Row size={1}/>
                        <Row size={2}>
                            <Col size={1}>
                                <Icon type="FontAwesome" name="credit-card"/>
                            </Col>
                            <Col size={3} onPress={() => this.addAccount('Credit')}>
                                <Row>
                                    <Text style={styles.title}>CREDIT CARD</Text>
                                </Row>
                                <Row>
                                    <Text>Credit card</Text>
                                </Row>
                            </Col>
                        </Row>
                        <Row size={1}/>
                        <Row size={2}>
                            <Col size={1}>
                                <Icon name="cash"/>
                            </Col>
                            <Col size={3} onPress={() => this.addAccount('Cash')}>
                                <Row>
                                    <Text style={styles.title}>CASH/WALLET</Text>
                                </Row>
                                <Row>
                                    <Text>Cash at hand</Text>
                                </Row>
                            </Col>
                        </Row>
                        <Row size={2}/>
                    </Grid>
                </View>
                <View style={{flex: 1}}>
                    <Button
                        title={'Cancel'}
                        onPress={() => this.dismissLightBox()}
                    />
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessAccountTypeSelection)

function mapStateToProps(state, ownProps) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(dispatch)
    };
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.5,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
    },
    content: {
        marginTop: 8,
    },
});