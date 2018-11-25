import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import axios from '../../axios';
import * as userAction from "../actions/userActions";
import { goToAuth, goToHome } from '../App';
import DeviceStorage from "../storage/DeviceStorage";

export class Initializing extends React.Component {
  render() {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
  }

    async componentDidMount() {
        try {
            axios.get("/do-nothing");//set up axios adding headers etc
            const idToken = await new DeviceStorage().getItem('id_token');
            if (idToken) {
                this.props.userActions.isLoggedIn();
                goToHome();
            } else {
                const userType = await new DeviceStorage().getItem('user_type');
                if (userType === null) {
                    goToAuth("signUpId");
                } else if (userType === 'registeredUser') {
                    goToAuth("signInId");
                } else if (userType === 'unregisteredUser') {
                    goToHome();
                }
            }
        } catch (e) {
            console.log('error: ', e);
            goToAuth("signUp");
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Initializing)

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
  },
});
