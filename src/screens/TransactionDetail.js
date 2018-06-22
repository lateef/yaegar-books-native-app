import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {
    Container,
    Content,
    Header,
    Form,
    Text,
    Grid,
    Col,
    Row,
    Left,
    Right,
    Body,
    Title
} from 'native-base';

import * as journalEntryAction from '../actions/journalEntryActions';

export class TransactionDetail extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>{this.props.journalEntry.name}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={{flex: 1}} padder>
                    <Grid>
                        <Row>
                            <Col>
                                <Form style={styles.container}>
                                    <Row size={1}>
                                        <Text>
                                            {moment(this.props.journalEntry.transactionDatetime)
                                                .format("ddd, MMM Do YYYY, h:mm a")}
                                                </Text>
                                    </Row>
                                    <Row size={1}>
                                        <Text>Amount: {this.props.journalEntry.amount}</Text>
                                    </Row>
                                    <Row size={10}/>
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)

function mapStateToProps(state, ownProps) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        journalEntryActions: bindActionCreators(journalEntryAction, dispatch)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
});