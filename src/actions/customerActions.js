import uuid from "uuid/v4";
import axios from '../../axios';

export function resetCustomer() {
    return function (dispatch) {
        dispatch({type: 'CUSTOMER_RESET'});
    }
}

export function houseKeeping() {
    return function (dispatch) {
        dispatch({type: 'HOUSE_KEEPING_CUSTOMER'});
    }
}

export function updateCustomer(customer) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_CUSTOMER', payload: customer});
    }
}

export function addCustomer(customer) {
    return async function (dispatch) {
        customer.uuid = uuid();
        delete customer.error;
        return axios.post('/add-customer', customer)
            .then(response => {
                let data = response.data;
                if (data) {
                    dispatch({type: 'ADD_CUSTOMER', payload: data});
                } else {
                    dispatch({type: 'CUSTOMER_WARNING', payload: "Failed to save customer"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'CUSTOMER_WARNING', payload: "Failed to save customer"});
            });
    }
}

export function getCustomers(companyUuid) {
    return async function (dispatch) {
        return axios.get('/get-customers/' + companyUuid)
            .then(response => {
                let data = response.data;
                if (data) {
                    dispatch({type: 'UPDATE_CUSTOMERS', payload: data});
                } else {
                    dispatch({type: 'CUSTOMER_WARNING', payload: "Failed to save customer"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'CUSTOMER_WARNING', payload: "Failed to save customer"});
            });
    }
}