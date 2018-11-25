const product = {
    products: [],
    error: null
};
const defaultState = {
    product: product
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'PRODUCT_RESET': {
            return {...state, product: {...product}}
        }
        case 'CREATE_PRODUCT':
        case 'UPDATE_PRODUCT': {
            return {...state, product: {...state.product, currentProduct: {...action.payload}, error: null}}
        }
        case 'UPDATE_PRODUCT_NAME': {
            return {
                ...state, product: {
                    ...state.product,
                    currentProduct: {
                        ...state.product.currentProduct, name: action.payload,
                        ledger: {...state.product.currentProduct.ledger, name: action.payload}
                    }, error: null
                }
            }
        }
        case 'UPDATE_PRODUCT_COST_PRICE': {
            return {
                ...state, product: {...state.product, currentProduct: {...state.product.currentProduct, costPrice: action.payload}}, error: null
            }
        }
        case 'UPDATE_PRODUCT_SELL_PRICE': {
            return {
                ...state, product: {...state.product, currentProduct: {...state.product.currentProduct, sellPrice: action.payload}}, error: null
            }
        }
        case 'ADD_PRODUCT': {
            return {...state, product: {...state.product, error: null}}
        }
        case 'UPDATE_PRODUCTS': {
            return {...state, product: {...state.product, products: [].concat(action.payload), error: null}}
        }
        case 'PRODUCT_WARNING': {
            return {...state, product: {...state.product, error: action.payload}}
        }
        default:
            return state
    }
}