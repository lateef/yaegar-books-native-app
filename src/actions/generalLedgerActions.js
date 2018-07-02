import uuid from "uuid/v4";

import GeneralLedgerQueries from '../models/queries/GeneralLedgerQueries';
import DATA from "../baseChartOfAccounts";

export async function initGeneralLedger(uuid) {
    const ledgers = await new GeneralLedgerQueries().list();

    if (ledgers.length === 0) {
        DATA.chartOfAccounts.forEach(async function (generalLedger) {
            generalLedger.ownerUuid = uuid;
            generalLedger.userAccount = {uuid: uuid};
            await new GeneralLedgerQueries().create(generalLedger, true);
        });
    }
}

export function renewUuid() {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_GENERAL_LEDGERS_UUID',
            payload: uuid()
        });
    }
}

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

export function updateUserAccount(userAccount) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_GENERAL_LEDGERS_USER_ACCOUNT',
            payload: userAccount
        });
    }
}

export function updateOwnerUuid(ownerUuid) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_GENERAL_LEDGERS_OWNER_UUID',
            payload: ownerUuid
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
        new GeneralLedgerQueries().create(generalLedger, false);

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

export function listByParentUuids(type, parentUuids) {
    return async function (dispatch) {
        const chartOfAccounts = await new GeneralLedgerQueries().listByParentUuid(parentUuids);
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