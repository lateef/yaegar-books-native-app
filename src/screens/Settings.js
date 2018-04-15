import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';

import {
    Container,
    Content,
    Text,
    Grid,
    Col,
    Row,
    Button,
    Form,
    Item,
    Input
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

    handleDeleteText = (deleteText) => {
        this.props.userActions.setCanDelete(deleteText);
        if (this.props.user.canDelete) {
            this.disabled = false;
        }
    };

    handleUnregister = async () => {
        if (this.props.user.canDelete) {
            await this.props.userActions.unregister();
            this.props.navigator.resetTo({
                screen: 'Landing'
            });
        }
    };

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={{height: 750}}>
                            <Form style={styles.container}>
                                <Row size={1}/>
                                <Row size={2}>
                                    <Text testID="settingsTitle" style={{fontSize: 30}}>Delete Account</Text>
                                </Row>
                                <Row size={2}>
                                    <Col style={{flex: 1, padding: 10, alignItems: 'center'}}>
                                        <Text style={{fontSize: 20, alignItems: 'center', fontWeight: 'bold'}}>
                                            Are you absolutely sure?
                                        </Text>
                                        <Text/>
                                        <Text>
                                            This action cannot be undone and will permanently delete the user. Please type in delete to confirm.
                                        </Text>
                                        <Text/>
                                        <Text/>
                                        <Text/>
                                        <Text/>
                                        <Item regular>
                                            <Input placeholder="delete"
                                                   id="deleteInput" onChangeText={(deleteText) => {
                                                this.handleDeleteText(deleteText)
                                            }} autoCapitalize="none"/>
                                        </Item>
                                        <Text/>
                                        <Text/>
                                        <Text/>
                                        <Button id="deleteAccount"
                                                testID="settingsDeleteAccount"
                                                disabled={!this.props.user.canDelete}
                                                danger={this.props.user.canDelete}
                                                block onPress={() => {
                                            this.handleUnregister()
                                        }}>
                                            <Text>Delete Account</Text>
                                        </Button>
                                    </Col>
                                </Row>
                                <Row size={12}/>
                            </Form>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }

    componentWillMount() {
        this.props.userActions.setCanDelete('');
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

function mapStateToProps(state, ownProps) {
    return {
        user: state.userReducer.user,
        error: state.userReducer.error
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