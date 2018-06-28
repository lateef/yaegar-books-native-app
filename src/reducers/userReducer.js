export default function reducer(state = {
    user: {passCode: null, passCodeMatch: false, accessGranted: false, phones: [{code: null, number: null}]},
    error: null
}, action) {
    switch (action.type) {
        case 'UPDATE_PASSCODE': {
            return {...state, user: {...state.user, passCode: action.payload}, error: null}
        }
        case 'UPDATE_PASSCODE_MATCH': {
            return {...state, user: {...state.user, passCodeMatch: action.payload}, error: null}
        }
        case 'UPDATE_ACCESS_GRANTED': {
            return {...state, user: {...state.user, accessGranted: action.payload}, error: null}
        }
        default:
            return state
    }
}