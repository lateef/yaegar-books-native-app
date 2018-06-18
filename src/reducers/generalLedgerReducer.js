import uuid from "uuid/v4";

export default function reducer(state = {
    generalLedger: {
        uuid: uuid(),
        name: '',
        total: 0.00,
        type: '',
        code: null,
        description: '',
        parentUuid: '',
        ownerUuid: 'GUEST'
    },
    accounts: [],
    categories: [],
    error: null
}, action) {
    switch (action.type) {
        case 'SAVE_GENERAL_LEDGERS': {
            return {...state, generalLedger: action.payload, error: null}
        }
        case 'UPDATE_GENERAL_LEDGERS_NAME': {
            return {...state, generalLedger: {...state.generalLedger, name: action.payload}, error: null}
        }
        case 'UPDATE_GENERAL_LEDGERS_TYPE': {
            return {...state, generalLedger: {...state.generalLedger, type: action.payload}, error: null}
        }
        case 'UPDATE_GENERAL_LEDGERS_PARENT_UUID': {
            return {...state, generalLedger: {...state.generalLedger, parentUuid: action.payload}, error: null}
        }
        case 'UPDATE_GENERAL_LEDGERS_CLASSIFIER': {
            return {...state, generalLedger: {...state.generalLedger, classifier: action.payload}, error: null}
        }
        case 'LIST_GENERAL_LEDGERS_ACCOUNTS': {
            const generalLedgers = action.payload.filter(x => x !== null && x !== undefined);
            return {...state, accounts: generalLedgers, error: null}
        }
        case 'LIST_GENERAL_LEDGERS_CATEGORIES': {
            const generalLedgers = action.payload.filter(x => x !== null && x !== undefined);
            return {...state, categories: generalLedgers, error: null}
        }
        case 'SUM_JOURNAL_ENTRIES_BY_GENERAL_LEDGER_AMOUNT': {
            const generalLedgers = state.accounts.map(x => {
                if (x.uuid === action.payload.uuid) {
                    x.total = action.payload.sum;
                }
                return x;
            });
            return {...state, accounts: generalLedgers, error: null}
        }
        default:
            return state
    }
}