import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';

import {
    Container,
    Content,
    Text,
    Grid,
    Row,
    Form,
    Title,
    List,
    ListItem,
    Body
} from 'native-base';

import * as userAction from '../actions/userActions';

export class Subscription extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    render() {
        return (
            <Container>
                <Content padder>
                    <Grid>
                        <Row>
                            <Form style={styles.container}>
                                <Row size={1}>
                                    <Body>
                                    <Title style={{fontSize: 30, color: 'black'}}>Subscription</Title>
                                    </Body>
                                </Row>
                                <Row size={9}>
                                    <List style={{flex: 1}}>
                                        {this.props.user.personalUserAccounts.map((personalUserAccount, i) =>
                                            <ListItem key={i} style={{alignItems: 'center'}}
                                                      onPress={() => {}}>
                                                <Body>
                                                    <Text>{personalUserAccount.name}</Text>
                                                </Body>
                                            </ListItem>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Subscription)

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
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});