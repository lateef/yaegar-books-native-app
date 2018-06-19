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

export class Settings extends Component {
    static navigatorStyle = {
        topBarElevationShadowEnabled: false,
        navBarTransparent: true,
        screenBackgroundColor: 'white'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={{height: 750}}>
                            <Form style={styles.container}>
                                <Row size={1}/>
                                <Row size={4}>
                                    <Text>Settings</Text>
                                </Row>
                                <Row size={12}/>
                            </Form>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

function mapStateToProps(state, ownProps) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
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