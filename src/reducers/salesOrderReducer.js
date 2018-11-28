const salesOrder = {
    salesOrders: [],
    error: null
};
const defaultState = {
    salesOrder: salesOrder
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'SALES_ORDER_RESET': {
            return {...state, salesOrder: {...salesOrder}}
        }
        case 'INIT_SALES_ORDER':
        case 'UPDATE_SALES_ORDER': {
            return {
                ...state,
                salesOrder: {...state.salesOrder, currentSalesOrder: {...action.payload}, error: null}
            }
        }
        case 'CREATE_SALES_ORDER_LINE_ITEM': {
            return {
                ...state,
                salesOrder: {...state.salesOrder, currentSalesOrder:
                        {...state.salesOrder.currentSalesOrder, currentSalesOrderLineItem: action.payload},
                    error: null
                }
            }
        }
        case 'UPDATE_SALES_ORDER_LINE_ITEM_QUANTITY': {
            return {...state, salesOrder: {...state.salesOrder, currentSalesOrder:
                        {...state.salesOrder.currentSalesOrder, currentSalesOrderLineItem:
                                {...state.salesOrder.currentSalesOrder.currentSalesOrderLineItem,
                                    quantity: action.payload}}, error: null}}
        }
        case 'UPDATE_SALES_ORDER_LINE_ITEM_UNIT_PRICE': {
            return {...state, salesOrder: {...state.salesOrder, currentSalesOrder:
                        {...state.salesOrder.currentSalesOrder, currentSalesOrderLineItem:
                                {...state.salesOrder.currentSalesOrder.currentSalesOrderLineItem,
                                    unitPrice: action.payload}}, error: null}}
        }
        case 'UPDATE_SALES_ORDER_LINE_ITEM_SUBTOTAL': {
            return {...state, salesOrder: {...state.salesOrder, currentSalesOrder:
                        {...state.salesOrder.currentSalesOrder, currentSalesOrderLineItem:
                                {...state.salesOrder.currentSalesOrder.currentSalesOrderLineItem,
                                    subTotal: action.payload}}, error: null}}
        }
        case 'UPDATE_LINE_ITEMS_ON_SALES_ORDER': {
            return {...state, salesOrder: {...state.salesOrder, currentSalesOrder:
                        {...state.salesOrder.currentSalesOrder, lineItems: action.payload}}, error: null}
        }
        case 'UPDATE_TOTAL_PRICE_ON_SALES_ORDER': {
            return {...state, salesOrder: {...state.salesOrder, currentSalesOrder:
                        {...state.salesOrder.currentSalesOrder, totalPrice: action.payload}}, error: null}
        }
        case 'SALES_ORDER_WARNING': {
            return {...state, salesOrder: {...state.salesOrder, error: action.payload}}
        }
        default:
            return state
    }
}