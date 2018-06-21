import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';

import {
    Container,
    Content,
    Text,
    Grid,
    Left,
    Right,
    Body,
    Row,
    Form,
    Switch,
    List,
    ListItem
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
                <Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
                    <Grid>
                        <Row style={{height: 750}}>
                            <Form style={styles.container}>
                                <Row size={1}>
                                    <Text>Settings</Text>
                                </Row>
                                <Row size={9}>
                                    <List style={{flex: 1}}>
                                        <ListItem itemDivider/>
                                        <ListItem icon>
                                            <Left/>
                                            <Body>
                                                <Text>Pass code</Text>
                                            </Body>
                                            <Right>
                                                <Switch value={false}/>
                                            </Right>
                                        </ListItem>
                                        <ListItem itemDivider/>
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
    }
    });