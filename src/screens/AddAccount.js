import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Keyboard, StyleSheet} from 'react-native';
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
import DATA from '../baseChartOfAccounts';

export class AddAccount extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    handleNameChange = (name) => {
        this.props.generalLedgerActions.updateName(name);
    };

    handlePress = async (accountType) => {
        const currentAsset = DATA.chartOfAccounts.filter(function (ledgerEntry) {
            return ledgerEntry.name === "Current assets";
        })[0];
        await this.props.generalLedgerActions.updateType(accountType.trim());
        await this.props.generalLedgerActions.updateProfile(this.props.profile);
        await this.props.generalLedgerActions.updateOwnerUuid(this.props.user.uuid);
        await this.props.generalLedgerActions.updateParentUuid(currentAsset.uuid);
        await this.props.generalLedgerActions.updateClassifier(this.props.accountType);
        Keyboard.dismiss();
        this.props.generalLedgerActions.save(this.props.generalLedger);
        this.props.navigator.pop({});
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
                                    <Text testID="addAccountHeading">Enter {this.props.accountType} Name</Text>
                                </Row>
                                <Row size={2}>
                                    <Col style={{padding: 10}}>
                                        <Item floatingLabel error={this.props.error !== null}>
                                            <Label>{this.props.accountType}</Label>
                                            <Input id="nameInput" autoCapitalize="words" value={this.props.generalLedger.name}
                                                   onChangeText={(name) => this.handleNameChange(name)}/>
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
                                            {this.props.generalLedger && this.props.generalLedger.name.length > 0 ?
                                                <Button id="continueButton"
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

    componentWillMount() {
        this.props.generalLedgerActions.renewUuid();
        this.props.generalLedgerActions.updateName('');
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAccount)

function mapStateToProps(state, ownProps) {
    return {
        user: state.userReducer.user,
        profile: state.userReducer.profile,
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