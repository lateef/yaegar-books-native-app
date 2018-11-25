import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {
    Grid, Button, Container, Content, Text, Row, Col, Card, CardItem, List, ListItem, Body, Icon, Item,
    Label, Input, Picker
} from 'native-base';

import * as companyAction from '../../actions/companyActions';
import {ModalComponent} from "./ModalComponent";

export class AddCompany extends ModalComponent {
    constructor(props) {
        super(props);
    }

    onChangeName(name) {
        this.props.companyActions.updateCompanyName(name);
    }

    onValueChange(companyType) {
        this.props.companyActions.updateCompanyType(companyType);
    }

    async addCompany() {
        await this.props.companyActions.addCompany(this.props.company.companies[0]);
        this.dismissModal();
    }

    render() {
        return (
            <Container>
                <Grid style={{justifyContent: 'center', padding: 10}}>
                    <Content contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
                        <Row size={2}>
                            <Col>
                                <Card>
                                    <CardItem header bordered>
                                        <Text style={styles.textCentered}>Add a business/company</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Col>
                                            <List>
                                                <ListItem>
                                                        <Item floatingLabel>
                                                            <Label style={{color: '#9fced0', fontSize: 18}}>Enter company name </Label>
                                                            <Text/>
                                                            <Text/>
                                                            <Input id="name" value={this.props.company.companies[0] ? this.props.company.companies[0].name : ''}
                                                                   onChangeText={(name) => this.onChangeName(name)}/>
                                                        </Item>
                                                </ListItem>
                                                <ListItem>
                                                    <Item picker>
                                                        <Picker
                                                            mode="dropdown"
                                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                            style={{ width: 300 }}
                                                            placeholder="Select your Business Type"
                                                            placeholderStyle={{ color: "#bfc6ea" }}
                                                            placeholderIconColor="#007aff"
                                                            selectedValue={
                                                                this.props.company.companies[0] ?
                                                                    this.props.company.companies[0].companyType : ''
                                                            }
                                                            onValueChange={this.onValueChange.bind(this)}>
                                                            <Picker.Item label="Products" value="PRODUCTS" />
                                                            <Picker.Item label="Services" value="SERVICES" />
                                                        </Picker>
                                                    </Item>
                                                </ListItem>
                                                <ListItem>
                                                    <Text/>
                                                </ListItem>
                                                <ListItem>
                                                    <Body>
                                                    <Button full dark
                                                            disabled={
                                                                !this.props.company.companies[0]
                                                                || !this.props.company.companies[0].name
                                                                || !this.props.company.companies[0].companyType
                                                            }
                                                            onPress={() => this.addCompany()}>
                                                        <Text style={{fontSize: 18, color: '#ffffff'}}>Save</Text>
                                                    </Button>
                                                    </Body>
                                                </ListItem>
                                            </List>
                                        </Col>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row size={1}>
                        </Row>
                    </Content>
                </Grid>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCompany)

function mapStateToProps(state, ownProps) {
    return {
        company: state.companyReducer.company,
        error: state.companyReducer.company.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        companyActions: bindActionCreators(companyAction, dispatch)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    h1: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
        fontSize: 24
    },
    text: {
        textAlign: 'left',
        color: '#161616',
        fontSize: 18
    },
    textCentered: {
        textAlign: 'center',
        color: '#161616',
        fontSize: 18
    }
});