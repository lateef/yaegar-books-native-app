const company = {
    companies: [],
    error: null
};
const defaultState = {
    company: company
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'COMPANY_RESET': {
            return {...state, company: {...company}}
        }
        case 'UPDATE_COMPANY': {
            state.company.companies.splice(0, 1, action.payload);
            return {...state, company: {...state.company, companies: [].concat(state.company.companies), error: null}}
        }
        case 'UPDATE_COMPANIES': {
            return {...state, company: {...state.company, companies: [].concat(action.payload), error: null}}
        }
        case 'COMPANY_WARNING': {
            const company = state.company.companies[0] ? state.company.companies[0] : {};
            company.error = action.payload;
            state.company.companies.splice(0, 1, company);
            return {...state, company: {...state.company, companies: [].concat(state.company.companies), error: null}}
        }
        case 'UPDATE_COMPANY_NAME': {
            const company = state.company.companies[0] ? state.company.companies[0] : {};
            company.name = action.payload;
            state.company.companies.splice(0, 1, company);
            return {...state, company: {...state.company, companies: [].concat(state.company.companies), error: null}}
        }
        case 'UPDATE_COMPANY_TYPE': {
            const company = state.company.companies[0] ? state.company.companies[0] : {};
            company.companyType = action.payload;
            state.company.companies.splice(0, 1, company);
            return {...state, company: {...state.company, companies: [].concat(state.company.companies), error: null}}
        }
        case 'ADD_LEDGER_TO_CHART_OF_ACCOUNTS': {
            const company = state.company.companies[0] ? state.company.companies[0] : {};
            company.chartOfAccounts.ledgers = state.company.companies[0].chartOfAccounts.ledgers
                .filter(ledger => ledger.uuid !== action.payload.uuid)
                .concat(action.payload);
            state.company.companies.splice(0, 1, company);
            return {...state, company: {...state.company, companies: [].concat(state.company.companies), error: null}}
        }
        default:
            return state
    }
}