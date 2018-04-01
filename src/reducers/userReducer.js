export default function reducer(state = {
    user: {email: '', password: '', passwordAgain: '', phoneNumber: ''},
    error: null
}, action) {
    switch (action.type) {
        case 'UPDATE_EMAIL': {
            return {...state, user: {...state.user, email: action.payload}, error: null}
        }
        case 'EMAIL_NOT_VALID': {
            return {
                ...state,
                user: {...state.user, email: action.payload},
                error: "That's not a valid email address"
            }
        }
        case 'EMAIL_VALID': {
            return {...state, user: {...state.user, email: action.payload}, error: null}
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
        case 'REGISTER_FAILED': {
            return {...state, error: action.payload.invalidCredentialsMessage, user: {...state.user, passwordMatched: false}}
        }
        default:
            return {
                ...state,
                user: {
                    ...state.user,
                    email: '',
                    password: '',
                    passwordAgain: '',
                    phoneNumber: '',
                    passwordMatched: false,
                    isLoggedIn: false,
                    hasSentForgottenPassword: false,
                    resetCode: null,
                    passwordReset: false
                },
                error: null
            }
    }
}