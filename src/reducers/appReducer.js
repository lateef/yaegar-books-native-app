export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'NAVIGATION_CHANGE': {
            return {...state, root : action.payload}
        }
        default:
            return {...state}
    }
}