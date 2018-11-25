const purchaseOrder = {
    purchaseOrders: [],
    error: null
};
const defaultState = {
    purchaseOrder: purchaseOrder
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'PURCHASE_ORDER_RESET': {
            return {...state, purchaseOrder: {...purchaseOrder}}
        }
        case 'INIT_PURCHASE_ORDER':
        case 'UPDATE_PURCHASE_ORDER': {
            return {
                ...state,
                purchaseOrder: {...state.purchaseOrder, currentPurchaseOrder: {...action.payload}, error: null}
            }
        }
        case 'CREATE_PURCHASE_ORDER_LINE_ITEM': {
            return {
                ...state,
                purchaseOrder: {...state.purchaseOrder, currentPurchaseOrder:
                        {...state.purchaseOrder.currentPurchaseOrder, currentPurchaseOrderLineItem: action.payload},
                    error: null
                }
            }
        }
        case 'UPDATE_PURCHASE_ORDER_LINE_ITEM_QUANTITY': {
            return {...state, purchaseOrder: {...state.purchaseOrder, currentPurchaseOrder:
                        {...state.purchaseOrder.currentPurchaseOrder, currentPurchaseOrderLineItem:
                                {...state.purchaseOrder.currentPurchaseOrder.currentPurchaseOrderLineItem,
                                    quantity: action.payload}}, error: null}}
        }
        case 'UPDATE_PURCHASE_ORDER_LINE_ITEM_UNIT_PRICE': {
            return {...state, purchaseOrder: {...state.purchaseOrder, currentPurchaseOrder:
                        {...state.purchaseOrder.currentPurchaseOrder, currentPurchaseOrderLineItem:
                                {...state.purchaseOrder.currentPurchaseOrder.currentPurchaseOrderLineItem,
                                    unitPrice: action.payload}}, error: null}}
        }
        case 'UPDATE_PURCHASE_ORDER_LINE_ITEM_SUBTOTAL': {
            return {...state, purchaseOrder: {...state.purchaseOrder, currentPurchaseOrder:
                        {...state.purchaseOrder.currentPurchaseOrder, currentPurchaseOrderLineItem:
                                {...state.purchaseOrder.currentPurchaseOrder.currentPurchaseOrderLineItem,
                                    subTotal: action.payload}}, error: null}}
        }
        case 'UPDATE_LINE_ITEMS_ON_PURCHASE_ORDER': {
            return {...state, purchaseOrder: {...state.purchaseOrder, currentPurchaseOrder:
                        {...state.purchaseOrder.currentPurchaseOrder, lineItems: action.payload}}, error: null}
        }
        case 'UPDATE_TOTAL_PRICE_ON_PURCHASE_ORDER': {
            return {...state, purchaseOrder: {...state.purchaseOrder, currentPurchaseOrder:
                        {...state.purchaseOrder.currentPurchaseOrder, totalPrice: action.payload}}, error: null}
        }
        case 'PURCHASE_ORDER_WARNING': {
            return {...state, purchaseOrder: {...state.purchaseOrder, error: action.payload}}
        }
        default:
            return state
    }
}