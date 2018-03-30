export default function reducer(state = {
    user: {email: ''},
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
        default:
            return {
                ...state,
                user: {
                    ...state.user,
                    email: ''
                },
                error: null
            }
    }
}