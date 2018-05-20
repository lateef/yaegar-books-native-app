import GeneralLedgerQueries from '../models/queries/GeneralLedgerQueries';

export function updateName(name) {
    return function (dispatch) {

        dispatch({
            type: 'UPDATE_NAME',
            payload: name
        });
    }
}

export function save(generalLedger, generalLedgerType) {
    return function (dispatch) {
        new GeneralLedgerQueries().create(100, generalLedger.name, generalLedgerType, 'GUEST');

        dispatch({
            type: 'SAVE',
            payload: generalLedger
        });
    }
}

export function list() {
    return async function (dispatch) {
            const chartOfAccounts = await new GeneralLedgerQueries().list();
            dispatch({
                type: 'LIST',
                payload: chartOfAccounts
            });
    }
}