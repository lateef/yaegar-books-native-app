import roundTo from '../../src/util/NumberFormat';

const transaction = {
    error: null
};
const defaultState = {
    transaction: transaction
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'TRANSACTION_RESET': {
            return {...state, transaction: {...transaction}}
        }
        case 'UPDATE_TRANSACTION': {
            return {...state, transaction: {...state.transaction, ...action.payload, error: null}}
        }
        case 'UPDATE_LEDGER': {
            return {...state, transaction: {...state.transaction, ledger: action.payload, error: null}}
        }
        case 'UPDATE_COUNTER_LEDGER_UUID': {
            return {...state, transaction: {...state.transaction, counterLedgerUuid: action.payload, error: null}}
        }
        case 'UPDATE_TRANSACTION_DESCRIPTION': {
            return {...state, transaction: {...state.transaction, description: action.payload, error: null}}
        }
        case 'UPDATE_TRANSACTION_AMOUNT': {
            const amount = (action.payload) ? roundTo(action.payload, 2) : action.payload;
            return {...state, transaction: {...state.transaction, amount: amount, error: null}}
        }
        case 'TRANSACTION_WARNING': {
            return {...state, transaction: {...state.transaction, error: action.payload}}
        }
        default:
            return state
    }
}
