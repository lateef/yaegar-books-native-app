import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';

import {
    Container,
    Content,
    Fab,
    Header,
    H1,
    Text,
    Grid,
    Col,
    Row,
    Button,
    Form,
    Item,
    Label,
    Icon,
    Input,
    View
} from 'native-base';

import * as generalLedgerAction from '../actions/generalLedgerActions';

export class Account extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    render() {
        return (
            <Container>
                <Header>
                    <H1>{this.props.accountName}</H1>
                </Header>
                <Grid>
                    <Row style={styles.height}>

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
});