export default function reducer(state = {
    user: {passCode: null,
        passCodeMatch: false,
        accessGranted: false,
        phones: [],
        password: '',
        passwordAgain: '',
        personalUserAccounts: [],
        businessUserAccounts: []
    },
    error: null
}, action) {
    switch (action.type) {
        case 'GET_USER': {
            return {...state, user: {...action.payload}, error: null}
        }
        case 'UPDATE_USER_ACCOUNT': {
            return {...state, userAccount: {...action.payload}, error: null}
        }
        case 'LIST_PERSONAL_USER_ACCOUNTS': {
            return {...state, user: {...state.user, personalUserAccounts: action.payload}, error: null}
        }
        case 'LIST_BUSINESS_USER_ACCOUNTS': {
            return {...state, user: {...state.user, businessUserAccounts: action.payload}, error: null}
        }
        case 'UPDATE_PASSCODE': {
            return {...state, user: {...state.user, passCode: action.payload}, error: null}
        }
        case 'UPDATE_PASSCODE_MATCH': {
            return {...state, user: {...state.user, passCodeMatch: action.payload}, error: null}
        }
        case 'UPDATE_ACCESS_GRANTED': {
            return {...state, user: {...state.user, accessGranted: action.payload}, error: null}
        }
        case 'UPDATE_PHONE': {
            if (state.user.phones) {
                state.user.phones.splice(0, 1, action.payload);
            } else {
                state.user.phones = [];
            }
            return {...state, user: {...state.user, phones: state.user.phones}, error: null}
        }
        case 'SET_PASSWORD': {
            return {...state, user: {...state.user, password: action.payload, passwordMatched: false}, error: null}
        }
        case 'SET_PASSWORD_AGAIN': {
            return {...state, user: {...state.user, passwordAgain: action.payload, passwordMatched: false}, error: null}
        }
        case 'PASSWORD_NOT_VALID': {
            return {...state, user: {...state.user, password: action.payload, passwordMatched: false}}
        }
        case 'PASSWORD_NOT_MATCHED': {
            return {...state, user: {...state.user, passwordAgain: action.payload, passwordMatched: false}}
        }
        case 'PASSWORD_MATCHED': {
            return {...state, user: {...state.user, passwordMatched: true}}
        }
        default:
            return state
    }
}