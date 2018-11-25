const ledger = {
    error: null
};
const defaultState = {
    ledger: ledger
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LEDGER_RESET': {
            return {...state, ledger: {...ledger}}
        }
        case 'UPDATE_LEDGER': {
            return {...state, ledger: {...state.ledger, ...action.payload, error: null}}
        }
        case 'UPDATE_LEDGER_NAME': {
            return {...state, ledger: {...state.ledger, name: action.payload, error: null}}
        }
        case 'UPDATE_LEDGER_DESCRIPTION': {
            return {...state, ledger: {...state.ledger, description: action.payload, error: null}}
        }
        case 'LEDGER_WARNING': {
            return {...state, ledger: {...state.ledger, error: action.payload}}
        }
        default:
            return state
    }
}