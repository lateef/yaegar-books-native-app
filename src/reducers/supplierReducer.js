const supplier = {
    suppliers: [],
    error: null
};
const defaultState = {
    supplier: supplier
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'SUPPLIER_RESET': {
            return {...state, supplier: {...supplier}}
        }
        case 'HOUSE_KEEPING_SUPPLIER': {
            const suppliers = [];
            state.supplier.suppliers.forEach((supplier) => {
                if (supplier.supplierId !== null) {
                    suppliers.concat(supplier);
                }
            });
            return {...state, supplier: {...state.supplier, suppliers: suppliers}}
        }
        case 'ADD_SUPPLIER': {
            return {...state, supplier: {...state.supplier, error: null}}
        }
        case 'UPDATE_SUPPLIER': {
            const supplier = state.supplier.suppliers.find((supplier) => {
                return supplier.uuid === action.payload.uuid;
            });
            let index;
            if (supplier) {
                index = state.supplier.suppliers.find((supplier) => {
                    return supplier.uuid === action.payload.uuid;
                });
            } else {
                index = state.supplier.suppliers.length;
            }
            return {...state, supplier: {...state.supplier, suppliers: state.supplier.suppliers.splice(index, 1, action.payload).slice(), error: null}}
        }
        case 'UPDATE_SUPPLIERS': {
            return {...state, supplier: {...state.supplier, suppliers: action.payload, error: null}}
        }
        case 'SUPPLIER_WARNING': {
            return {...state, supplier: {...state.supplier, error: action.payload}}
        }
        default:
            return state
    }
}