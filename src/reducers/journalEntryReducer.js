import roundTo from '../../src/util/NumberFormat';

export default function reducer(state = {
    primaryJournalEntry: {
        uuid: '',
        name: '',
        transactionDatetime: new Date(),
        generalLedger: {name: 'Select Category', uuid: 'noUuid'},
        amount: 0.00,
        ownerUuid: 'GUEST'
    },
    secondaryJournalEntry: {
        uuid: '',
        transactionDatetime: new Date(),
        generalLedger: null,
        amount: 0.00,
        ownerUuid: 'GUEST'
    },
    journalEntries: [],
    error: null
}, action) {
    switch (action.type) {
        case 'UPDATE_JOURNAL_ENTRY_PRIMARY_UUID': {
            return {
                ...state,
                primaryJournalEntry: {...state.primaryJournalEntry, uuid: action.payload},
                error: null
            }
        }
        case 'UPDATE_JOURNAL_ENTRY_SECONDARY_UUID': {
            return {
                ...state,
                secondaryJournalEntry: {...state.secondaryJournalEntry, uuid: action.payload},
                error: null
            }
        }
        case 'UPDATE_JOURNAL_ENTRY_NAME': {
            return {
                ...state,
                primaryJournalEntry: {...state.primaryJournalEntry, name: action.payload},
                secondaryJournalEntry: {...state.secondaryJournalEntry, name: action.payload},
                error: null
            }
        }
        case 'UPDATE_JOURNAL_ENTRY_TRANSACTION_DATETIME': {
            return {
                ...state,
                primaryJournalEntry: {...state.primaryJournalEntry, transactionDatetime: action.payload},
                secondaryJournalEntry: {...state.secondaryJournalEntry, transactionDatetime: action.payload},
                error: null
            }
        }
        case 'UPDATE_PRIMARY_GENERAL_LEDGER': {
            return {
                ...state,
                primaryJournalEntry: {...state.primaryJournalEntry, generalLedger: action.payload},
                error: null
            }
        }
        case 'UPDATE_SECONDARY_GENERAL_LEDGER': {
            return {
                ...state,
                secondaryJournalEntry: {...state.secondaryJournalEntry, generalLedger: action.payload},
                error: null
            }
        }
        case 'UPDATE_JOURNAL_ENTRY_AMOUNT': {
            const primaryAmount = (action.payload) ? roundTo(action.payload, 2) : action.payload;
            const secondaryAmount = (action.payload) ? roundTo(action.payload, 2) : action.payload;
            return {
                ...state,
                primaryJournalEntry: {...state.primaryJournalEntry, amount: primaryAmount},
                secondaryJournalEntry: {...state.secondaryJournalEntry, amount: secondaryAmount},
                error: null
            }
        }
        case 'UPDATE_PRIMARY_JOURNAL_ENTRY_SIDE': {
            return {
                ...state,
                primaryJournalEntry: {...state.primaryJournalEntry, journalEntrySide: action.payload},
                error: null
            }
        }
        case 'UPDATE_SECONDARY_JOURNAL_ENTRY_SIDE': {
            return {
                ...state,
                secondaryJournalEntry: {...state.secondaryJournalEntry, journalEntrySide: action.payload},
                error: null
            }
        }
        case 'SAVE_PRIMARY_JOURNAL_ENTRY': {
            return {...state, primaryJournalEntry: action.payload, error: null}
        }
        case 'SAVE_SECONDARY_JOURNAL_ENTRY': {
            return {...state, secondaryJournalEntry: action.payload, error: null}
        }
        case 'LIST_JOURNAL_ENTRIES': {
            const journalEntries = action.payload
                .filter(x => x !== null && x !== undefined)
                .map(x => {
                    if (x.amount) {
                        x.amount = roundTo(x.amount, 2);
                    }
                    return x;
                });
            return {...state, journalEntries: journalEntries, error: null}
        }
        case 'GET_JOURNAL_UUID': {
            return {...state, primaryJournalEntry: action.payload, error: null}
        }
        default:
            return state
    }
}