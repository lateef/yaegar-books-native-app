import GeneralLedgerQueries from '../models/queries/GeneralLedgerQueries';

export function updateName(name) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_NAME',
            payload: name
        });
    }
}

export function updateType(type) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_TYPE',
            payload: type
        });
    }
}

export function updateParentUuid(parentUuid) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_PARENT_UUID',
            payload: parentUuid
        });
    }
}

export function save(generalLedger) {
    return function (dispatch) {
        new GeneralLedgerQueries().create(generalLedger);

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

export function listByParentUuid(parentUuid) {
    return async function (dispatch) {
        const chartOfAccounts = await new GeneralLedgerQueries().listByParentUuid(parentUuid);
        dispatch({
            type: 'LIST',
            payload: chartOfAccounts
        });
    }
}

export function count() {
    return async function (dispatch) {
        const count = await new GeneralLedgerQueries().count();
        dispatch({
            type: 'COUNT',
            payload: count
        });
    }
}