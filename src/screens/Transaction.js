import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';

import {
    Container,
    Header,
    H1,
    Grid,
    Row,
    View
} from 'native-base';

import * as generalLedgerAction from '../actions/generalLedgerActions';

export class Transaction extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    render() {
        return (
            <Container>
                <Header>
                    <H1>{this.props.transactionType.toUpperCase()}</H1>
                </Header>
                <Grid>
                    <Row style={styles.height}>
                        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
                        </View>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)

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