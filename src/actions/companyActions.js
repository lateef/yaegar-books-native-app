import uuid from "uuid/v4";

import axios from '../../axios';

export function updateCompany(company) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_COMPANY', payload: company});
    }
}

export function updateCompanyName(name) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_COMPANY_NAME', payload: name});
    }
}

export function updateCompanyType(companyType) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_COMPANY_TYPE', payload: companyType});
    }
}

export function addCompany(company) {
    return async function (dispatch) {
        company.uuid = uuid();
        delete company.error;
        return axios.post('/add-company', company)
            .then(response => {
                let data = response.data;
                if (data) {
                    dispatch({type: 'UPDATE_COMPANY', payload: data});
                } else {
                    dispatch({type: 'COMPANY_WARNING', payload: "Failed to save company"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'COMPANY_WARNING', payload: "Failed to save company"});
            });
    }
}

export function getCompanies() {
    return async function (dispatch) {
        return axios.get('/get-companies')
            .then(response => {
                let data = response.data;
                if (data) {
                    dispatch({type: 'UPDATE_COMPANIES', payload: data});
                } else {
                    dispatch({type: 'COMPANY_WARNING', payload: "Failed to save company"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'COMPANY_WARNING', payload: "Failed to save company"});
            });
    }
}
