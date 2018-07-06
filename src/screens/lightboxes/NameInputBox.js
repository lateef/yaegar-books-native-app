import React from 'react';
import {connect} from 'react-redux';
import {Button, Dimensions, StyleSheet, View} from 'react-native';
import {bindActionCreators} from 'redux';

import {
    Item,
    Label,
    Input,
    Right,
    Text,
    Grid,
    Col,
    Row
} from 'native-base';

import * as userAction from '../../actions/userActions';

export class NameInputBox extends React.Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    dismissLightBox = () => {
        this.props.navigator.dismissLightBox();
    };

    createAccount() {
        this.dismissLightBox();
        this.props.userActions.createBusinessProfile(this.name, this.props.user.uuid);
    }

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
                            <Col>
                                <Item floatingLabel>
                                    <Label>Name</Label>
                                    <Input id="nameInput"
                                           onChangeText={(name) => {this.name = name}}/>
                                </Item>
                            </Col>
                        </Row>
                        <Row size={1}/>
                        <Row size={2}>
                            <View>
                                <Right>
                                    <Button title={'Create account'} onPress={() => this.createAccount()}/>
                                </Right>
                            </View>
                        </Row>
                        <Row size={2}/>
                    </Grid>
                </View>
                <View style={{flex: 1}}>
                    <Button
                        title={'Cancel'}
                        onPress={() => this.dismissLightBox()}/>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameInputBox)

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