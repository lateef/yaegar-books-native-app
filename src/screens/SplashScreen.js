import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container, Content, View, Grid, Row, Text} from 'native-base';
import {bindActionCreators} from 'redux';

import * as userAction from '../actions/userActions';
import * as appAction from "../actions/appActions";

export class SplashScreen extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    render() {
        return (
            <Container>
                <Grid style={styles.container}>
                    <Content padder>
                        <Row size={1}/>
                        <Row size={1}>
                            <View style={styles.container}>
                                <Text>
                                    Yaegar Books
                                </Text>
                            </View>
                        </Row>
                        <Row size={1}/>
                    </Content>
                </Grid>
            </Container>
        );
    }

    async componentDidMount() {
        await this.props.userActions.findByUuid();
        this.props.userActions.updateUserAccount(this.props.user);
        if (this.props.user.passCodeMatch) {
            this.props.appActions.onPasscodeRequired();
        } else {
            this.props.appActions.onStart();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)

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
    },
});