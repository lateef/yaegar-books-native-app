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
    Label,
    Input
} from 'native-base';

import * as generalLedgerAction from '../actions/generalLedgerActions';

export class AddAccountType extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    handleNameChangeText = (name) => {
        this.props.generalLedgerActions.updateName(name.trim());
    };

    handlePress = (accountType) => {
        this.props.generalLedgerActions.save(this.props.generalLedger, accountType);
        this.props.navigator.push({
            screen: 'Dashboard'
        });

    };

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={{height: 500}}>
                            <Form style={styles.container}>
                                <Row size={1}/>
                                <Row size={2}>
                                    <Text testID="addAccountTitle" style={{fontSize: 30}}>Add Account</Text>
                                </Row>
                                <Row size={1}>
                                    <Text testID="addAccountHeading">Enter {this.props.accountType} name</Text>
                                </Row>
                                <Row size={2}>
                                    <Col style={{padding: 10}}>
                                        <Item floatingLabel
                                              error={this.props.error !== null}>
                                            <Label>{this.props.accountType}</Label>
                                            <Input testID="addAccountNameInput" id="nameInput" onChangeText={(name) => {
                                                this.handleNameChangeText(name)}}  autoCapitalize="words"/>
                                        </Item>
                                    </Col>
                                </Row>
                                <Row size={2}>
                                    <Col style={styles.container}>
                                        <Row size={1}>
                                            {this.props.error ?
                                                <Label testID="addAccountErrorLabel" style={{color: 'red'}}>{this.props.error}</Label> : <Text/>}
                                        </Row>
                                        <Row size={1}>
                                            {this.props.generalLedger.name.length > 0 ?
                                                <Button id="continueButton"
                                                        testID="addAccountContinueButton"
                                                        disabled={this.props.error !== null}
                                                        rounded
                                                        onPress={() => this.handlePress(this.props.accountType)}>
                                                    <Text>Add Account</Text>
                                                </Button> : <Text/>}
                                        </Row>
                                    </Col>
                                </Row>
                                <Row size={3}>
                                </Row>
                            </Form>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAccountType)

function mapStateToProps(state, ownProps) {
    return {
        generalLedger: state.generalLedgerReducer.generalLedger,
        error: state.generalLedgerReducer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        generalLedgerActions: bindActionCreators(generalLedgerAction, dispatch)
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