import uuid from "uuid/v4";

import JournalEntryQueries from '../models/queries/JournalEntryQueries';
import GeneralLedgerQueries from "../models/queries/GeneralLedgerQueries";

export function updateUuid(uuid, side) {
    return function (dispatch) {
        if (side === 'primary') {
            dispatch({
                type: 'UPDATE_JOURNAL_ENTRY_PRIMARY_UUID',
                payload: uuid
            });
        } else if (side === 'secondary') {
            dispatch({
                type: 'UPDATE_JOURNAL_ENTRY_SECONDARY_UUID',
                payload: uuid
            });
        }
    }
}

export function updateName(name) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_JOURNAL_ENTRY_NAME',
            payload: name
        });
    }
}

export function updateTransactionDateTime(date) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_JOURNAL_ENTRY_TRANSACTION_DATETIME',
            payload: date
        });
    }
}

export function updateGeneralLedger(generalLedger, side) {
    return function (dispatch) {
        if (side === 'primary') {
            dispatch({
                type: 'UPDATE_PRIMARY_GENERAL_LEDGER',
                payload: generalLedger
            });
        } else if (side === 'secondary') {
            dispatch({
                type: 'UPDATE_SECONDARY_GENERAL_LEDGER',
                payload: generalLedger
            });
        }
    }
}

export function updateAmount(amount) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_JOURNAL_ENTRY_AMOUNT',
            payload: amount
        });
    }
}

export function updateJournalEntrySide(amount, side) {
    return function (dispatch) {
        if (side === 'primary') {
            dispatch({
                type: 'UPDATE_PRIMARY_JOURNAL_ENTRY_SIDE',
                payload: amount
            });
        } else if (side === 'secondary') {
            dispatch({
                type: 'UPDATE_SECONDARY_JOURNAL_ENTRY_SIDE',
                payload: amount
            });
        }
    }
}

export function save(journalEntry, side) {
    return function (dispatch) {
        if (!journalEntry.uuid) {
            journalEntry.uuid = uuid();
        }
        new JournalEntryQueries().create(journalEntry);

        if (side === 'primary') {
            dispatch({
                type: 'SAVE_PRIMARY_JOURNAL_ENTRY',
                payload: journalEntry
            });
        } else if (side === 'secondary') {
            dispatch({
                type: 'SAVE_SECONDARY_JOURNAL_ENTRY',
                payload: journalEntry
            });
        }
    }
}

export function list() {
    return async function (dispatch) {
        const journalEntries = await new JournalEntryQueries().list();
        dispatch({
            type: 'LIST_JOURNAL_ENTRIES',
            payload: journalEntries
        });
    }
}

export function listByGeneralLedgerUuid(uuid) {
    return async function (dispatch) {
        const journalEntries = await new JournalEntryQueries().listByGeneralLedgerUuid(uuid);
        dispatch({
            type: 'LIST_JOURNAL_ENTRIES',
            payload: journalEntries
        });
    }
}

export function findByUuid(uuid) {
    return async function (dispatch) {
        const journalEntry = await new GeneralLedgerQueries().findByUuid(uuid);
        dispatch({
            type: 'GET_JOURNAL_ENTRY',
            payload: journalEntry
        });
    }
}