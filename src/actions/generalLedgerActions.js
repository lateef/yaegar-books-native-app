import uuid from "uuid/v4";

import GeneralLedgerQueries from '../models/queries/GeneralLedgerQueries';
import DATA from "../baseChartOfAccounts";

export async function initGeneralLedger(ownerUuid, profileUuid) {
    const ledgers = await new GeneralLedgerQueries().list();

    if (ledgers.length === 0) {
        DATA.chartOfAccounts
            .filter(generalLedger => (generalLedger.type === 'master') || (generalLedger.type === 'personal'))
            .forEach(async function (generalLedger) {
            generalLedger.ownerUuid = ownerUuid;
            generalLedger.profile = {uuid: profileUuid};
            await new GeneralLedgerQueries().create(generalLedger, true);
        });
    }
}

export async function initBusinessGeneralLedger(ownerUuid, profileUuid) {
    DATA.chartOfAccounts
        .filter(generalLedger => generalLedger.type === 'business1')
        .forEach(async function (generalLedger) {
            generalLedger.ownerUuid = ownerUuid;
        generalLedger.profile = {uuid: profileUuid};
        await new GeneralLedgerQueries().create(generalLedger, true);
    });
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

export function updateProfile(profile) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_GENERAL_LEDGERS_PROFILE',
            payload: profile
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

export function listByParentUuidsAndType(type, generalLedgerType, parentUuids) {
    return async function (dispatch) {
        const chartOfAccounts = await new GeneralLedgerQueries().listByParentUuidAndType(generalLedgerType, parentUuids);
        dispatch({
            type: type,
            payload: chartOfAccounts
        });
    }
}

export function listByProfileUuidAndParentUuid(type, profileUuid, parentUuids) {
    return async function (dispatch) {
        const chartOfAccounts = await new GeneralLedgerQueries().listByProfileUuidAndParentUuid(profileUuid, parentUuids);
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