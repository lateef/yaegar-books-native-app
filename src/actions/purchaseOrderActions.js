import uuid from "uuid/v4";
import axios from '../../axios';
import roundTo from "../util/NumberFormat";

export function resetPurchaseOrder() {
    return function (dispatch) {
        dispatch({type: 'PURCHASE_ORDER_RESET'});
    }
}

export function initPurchaseOrder() {
    return function (dispatch) {
        dispatch({type: 'INIT_PURCHASE_ORDER', payload: {uuid: uuid()}});
    }
}

export function addSupplierToPurchaseOrder(currentPurchaseOrder, supplier) {
    currentPurchaseOrder.supplier = supplier;
    return function (dispatch) {
        dispatch({type: 'UPDATE_PURCHASE_ORDER', payload: currentPurchaseOrder});
    }
}

export function createPurchaseOrderLineItem(product, itemType) {
    return function (dispatch) {
        dispatch({type: 'CREATE_PURCHASE_ORDER_LINE_ITEM', payload: {uuid: uuid(), product: product, itemType: itemType}});
    }
}

export function updatePurchaseOrderLineItemQuantity(quantity) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_PURCHASE_ORDER_LINE_ITEM_QUANTITY', payload: quantity});
    }
}

export function updatePurchaseOrderLineItemUnitPrice(unitPrice) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_PURCHASE_ORDER_LINE_ITEM_UNIT_PRICE', payload: unitPrice});
    }
}

export function updatePurchaseOrderLineItemSubTotal(quantity, unitPrice) {
    let subTotal = 0;
    if (quantity && unitPrice) {
        subTotal = quantity * unitPrice;
    }
    return function (dispatch) {
        dispatch({type: 'UPDATE_PURCHASE_ORDER_LINE_ITEM_SUBTOTAL', payload: roundTo(subTotal)});
    }
}

export function addLineItemToPurchaseOrder(currentPurchaseOrder, lineItem) {
    let lineItems = (currentPurchaseOrder.lineItems) ? currentPurchaseOrder.lineItems : [];
    lineItems = lineItems.concat(lineItem);
    const totalPrice = lineItems
        .map(lineItem => lineItem.subTotal)
        .reduce((totalPrice, amount) => parseFloat(totalPrice) + parseFloat(amount));
    return function (dispatch) {
        dispatch({type: 'UPDATE_LINE_ITEMS_ON_PURCHASE_ORDER', payload: lineItems});
        dispatch({type: 'UPDATE_TOTAL_PRICE_ON_PURCHASE_ORDER', payload: roundTo(totalPrice)});
    }
}

export function addPurchaseOrder(currentPurchaseOrder) {
    delete currentPurchaseOrder.currentPurchaseOrderLineItem;
    delete currentPurchaseOrder.supplier;
    return async function (dispatch) {
        return axios.post('/add-purchase-order', currentPurchaseOrder)
            .then(response => {
                let responseCurrentPurchaseOrder = response.data;
                dispatch({type: 'ADD_PURCHASE_ORDER', payload: responseCurrentPurchaseOrder});
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'PURCHASE_ORDER_WARNING', payload: "Failed to add purchase order"});
            });
    }
}