const customer = {
    customers: [],
    error: null
};
const defaultState = {
    customer: customer
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'CUSTOMER_RESET': {
            return {...state, customer: {...customer}}
        }
        case 'HOUSE_KEEPING_CUSTOMER': {
            const customers = [];
            state.customer.customers.forEach((customer) => {
                if (customer.customerId !== null) {
                    customers.concat(customer);
                }
            });
            return {...state, customer: {...state.customer, customers: customers}}
        }
        case 'ADD_CUSTOMER': {
            return {...state, customer: {...state.customer, error: null}}
        }
        case 'UPDATE_CUSTOMER': {
            const customer = state.customer.customers.find((customer) => {
                return customer.uuid === action.payload.uuid;
            });
            let index;
            let customers;
            if (customer) {
                index = state.customer.customers.findIndex((customer) => {
                    return customer.uuid === action.payload.uuid;
                });
                customers = state.customer.customers.splice(index, 1, action.payload).slice();
            } else {
                index = state.customer.customers.length;
                customers = state.customer.customers.concat(action.payload);
            }
            return {...state, customer: {...state.customer, customers: customers, error: null}}
        }
        case 'UPDATE_CUSTOMERS': {
            return {...state, customer: {...state.customer, customers: action.payload, error: null}}
        }
        case 'CUSTOMER_WARNING': {
            return {...state, customer: {...state.customer, error: action.payload}}
        }
        default:
            return state
    }
}