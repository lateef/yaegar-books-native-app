import React from 'react';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Content, View, Grid, Col, Row, Text} from 'native-base';

import {iconsMap} from '../util/app-icons';

export class Dashboard extends React.Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    constructor(props) {
        super(props);
        this.props.navigator.setButtons({
            leftButtons: [
                {
                    id: 'sideMenu'
                },
                {
                    icon: iconsMap['ios-menu'],
                    id: 'menuIcon'
                }
            ]
        });
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
                    <Grid>
                        <Row style={{}}>
                            <Col>
                                <Row size={1}>
                                </Row>
                                <Row size={1}>
                                </Row>
                                <Row size={7}>
                                    <View style={styles.container}>
                                        <Text style={{fontSize: 30}}>
                                            Yaegar Books Dashboard
                                        </Text>
                                    </View>
                                </Row>
                                <Row size={1}>
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

function mapStateToProps(state, ownProps) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(dispatch)
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