import JournalEntryQueries from '../models/queries/JournalEntryQueries';
import GeneralLedgerQueries from "../models/queries/GeneralLedgerQueries";

export function updateTransactionDateTime(date) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_TRANSACTION_DATETIME',
            payload: date
        });
    }
}

export function updateGeneralLedger(generalLedger) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_GENERAL_LEDGER',
            payload: generalLedger
        });
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

export function updateJournalEntrySide(amount) {
    return function (dispatch) {
        dispatch({
            type: 'UPDATE_JOURNAL_ENTRY_SIDE',
            payload: amount
        });
    }
}

export function save(journalEntry) {
    return function (dispatch) {
        journalEntry = new JournalEntryQueries().create(journalEntry);

        dispatch({
            type: 'SAVE_JOURNAL_ENTRY',
            payload: journalEntry
        });
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