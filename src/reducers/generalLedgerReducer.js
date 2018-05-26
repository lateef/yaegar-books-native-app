export default function reducer(state = {
    generalLedger: {
        name: '',
        type: '',
        uuid: '',
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
        case 'UPDATE_NAME': {
            return {...state, generalLedger: {...state.generalLedger, name: action.payload}, error: null}
        }
        case 'UPDATE_TYPE': {
            return {...state, generalLedger: {...state.generalLedger, type: action.payload}, error: null}
        }
        case 'UPDATE_PARENT_UUID': {
            return {...state, generalLedger: {...state.generalLedger, parentUuid: action.payload}, error: null}
        }
        case 'LIST_ACCOUNTS': {
            const generalLedgers = action.payload.filter(x => x !== null && x !== undefined);
            return {...state, accounts: generalLedgers, error: null}
        }
        case 'LIST_CATEGORIES': {
            const generalLedgers = action.payload.filter(x => x !== null && x !== undefined);
            return {...state, categories: generalLedgers, error: null}
        }
        default:
            return state
    }
}