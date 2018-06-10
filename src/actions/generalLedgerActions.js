import GeneralLedgerQueries from '../models/queries/GeneralLedgerQueries';

export function updateName(name) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_GENERAL_LEDGERS_NAME',
            payload: name
        });
    }
}

export function updateType(type) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_GENERAL_LEDGERS_TYPE',
            payload: type
        });
    }
}

export function updateParentUuid(parentUuid) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_GENERAL_LEDGERS_PARENT_UUID',
            payload: parentUuid
        });
    }
}

export function updateClassifier(classifier) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_GENERAL_LEDGERS_CLASSIFIER',
            payload: classifier
        });
    }
}

export function save(generalLedger) {
    return function (dispatch) {
        generalLedger = new GeneralLedgerQueries().create(generalLedger, false);

        dispatch({
            type: 'SAVE_GENERAL_LEDGERS',
            payload: generalLedger
        });
    }
}

export function list() {
    return async function (dispatch) {
        const chartOfAccounts = await new GeneralLedgerQueries().list();
        dispatch({
            type: 'LIST_GENERAL_LEDGERS',
            payload: chartOfAccounts
        });
    }
}

export function listByParentUuid(type, parentUuid) {
    return async function (dispatch) {
        const chartOfAccounts = await new GeneralLedgerQueries().listByParentUuid(parentUuid);
        dispatch({
            type: type,
            payload: chartOfAccounts
        });
    }
}

export function count() {
    return async function (dispatch) {
        const count = await new GeneralLedgerQueries().count();
        dispatch({
            type: 'COUNT_GENERAL_LEDGERS',
            payload: count
        });
    }
}