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
            return {...state, generalLedger: {...state.generalLedger, list: action.payload}, error: null}
        }
        default:
            return state
    }
}