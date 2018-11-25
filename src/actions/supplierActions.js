import uuid from "uuid/v4";
import axios from '../../axios';

export function resetSupplier() {
    return function (dispatch) {
        dispatch({type: 'SUPPLIER_RESET'});
    }
}

export function houseKeeping() {
    return function (dispatch) {
        dispatch({type: 'HOUSE_KEEPING_SUPPLIER'});
    }
}

export function updateSupplier(supplier) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_SUPPLIER', payload: supplier});
    }
}

export function addSupplier(supplier) {
    return async function (dispatch) {
        supplier.uuid = uuid();
        delete supplier.error;
        return axios.post('/add-supplier', supplier)
            .then(response => {
                let data = response.data;
                if (data) {
                    dispatch({type: 'ADD_SUPPLIER', payload: data});
                } else {
                    dispatch({type: 'SUPPLIER_WARNING', payload: "Failed to save supplier"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'SUPPLIER_WARNING', payload: "Failed to save supplier"});
            });
    }
}

export function getSuppliers(companyUuid) {
    return async function (dispatch) {
        return axios.get('/get-suppliers/' + companyUuid)
            .then(response => {
                let data = response.data;
                if (data) {
                    dispatch({type: 'UPDATE_SUPPLIERS', payload: data});
                } else {
                    dispatch({type: 'SUPPLIER_WARNING', payload: "Failed to save supplier"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'SUPPLIER_WARNING', payload: "Failed to save supplier"});
            });
    }
}
