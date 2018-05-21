import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import ActionButton from 'react-native-action-button';

import {
    Container,
    Header,
    H1,
    Grid,
    Row,
    Icon,
    View
} from 'native-base';

import * as generalLedgerAction from '../actions/generalLedgerActions';

export class Account extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    transact(transactionType) {
        this.props.navigator.push({
            'screen': 'Transaction',
            passProps: {
                transactionType: transactionType
            }
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <H1>{this.props.accountName}</H1>
                </Header>
                <Grid>
                    <Row style={styles.height}>
                        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
                            {/* Rest of the app comes ABOVE the action button component !*/}
                            <ActionButton buttonColor="#3498db">
                                <ActionButton.Item buttonColor='#E74C3C' title="EXPENSES" onPress={() => this.transact('expenses')}>
                                    <Icon type="FontAwesome" name="angle-double-up" style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#1abc9c' title="INCOMES" onPress={() => this.transact('incomes')}>
                                    <Icon type="FontAwesome" name="angle-double-down" style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                            </ActionButton>
                        </View>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)

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
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});