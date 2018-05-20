export default function reducer(state = {
    generalLedger: {name: ''},
    list: [],
    error: null
}, action) {
    switch (action.type) {
        case 'UPDATE_NAME': {
            return {...state, generalLedger: {...state.generalLedger, name: action.payload}, error: null}
        }
        case 'LIST': {
            const generalLedgers = action.payload.filter(x => x !== null && x !== undefined);
            return {...state, list: generalLedgers, error: null}
        }
        default:
            return state
    }
}