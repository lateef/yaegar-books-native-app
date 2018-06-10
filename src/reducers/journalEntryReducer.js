export default function reducer(state = {
    journalEntry: {
        uuid: '',
        transactionDatetime: new Date(),
        generalLedger: {name: 'Select Category', uuid: 'noUuid'},
        amount: null,
        ownerUuid: 'GUEST'
    },
    journalEntries: [],
    error: null
}, action) {
    switch (action.type) {
        case 'UPDATE_JOURNAL_ENTRY_TRANSACTION_DATETIME': {
            return {...state, journalEntry: {...state.journalEntry, transactionDatetime: action.payload}, error: null}
        }
        case 'UPDATE_GENERAL_LEDGER': {
            return {...state, journalEntry: {...state.journalEntry, generalLedger: action.payload}, error: null}
        }
        case 'UPDATE_JOURNAL_ENTRY_AMOUNT': {
            return {...state, journalEntry: {...state.journalEntry, amount: action.payload}, error: null}
        }
        case 'UPDATE_JOURNAL_ENTRY_SIDE': {
            return {...state, journalEntry: {...state.journalEntry, journalEntrySide: action.payload}, error: null}
        }
        case 'SAVE_JOURNAL_ENTRY': {
            return {...state, journalEntry: action.payload, error: null}
        }
        case 'LIST_JOURNAL_ENTRIES': {
            const journalEntries = action.payload.filter(x => x !== null && x !== undefined);
            return {...state, journalEntries: journalEntries, error: null}
        }
        case 'GET_JOURNAL_UUID': {
            return {...state, journalEntry: action.payload, error: null}
        }
        default:
            return state
    }
}