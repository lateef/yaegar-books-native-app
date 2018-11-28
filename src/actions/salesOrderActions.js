import uuid from "uuid/v4";
import axios from '../../axios';
import roundTo from "../util/NumberFormat";

export function resetSalesOrder() {
    return function (dispatch) {
        dispatch({type: 'SALES_ORDER_RESET'});
    }
}

export function initSalesOrder() {
    return function (dispatch) {
        dispatch({type: 'INIT_SALES_ORDER', payload: {uuid: uuid()}});
    }
}

export function addCustomerToSalesOrder(currentSalesOrder, customer) {
    currentSalesOrder.customer = customer;
    return function (dispatch) {
        dispatch({type: 'UPDATE_SALES_ORDER', payload: currentSalesOrder});
    }
}

export function createSalesOrderLineItem(product, itemType) {
    return function (dispatch) {
        dispatch({type: 'CREATE_SALES_ORDER_LINE_ITEM', payload: {uuid: uuid(), product: product, itemType: itemType}});
    }
}

export function updateSalesOrderLineItemQuantity(quantity) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_SALES_ORDER_LINE_ITEM_QUANTITY', payload: quantity});
    }
}

export function updateSalesOrderLineItemUnitPrice(unitPrice) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_SALES_ORDER_LINE_ITEM_UNIT_PRICE', payload: unitPrice});
    }
}

export function updateSalesOrderLineItemSubTotal(quantity, unitPrice) {
    let subTotal = 0;
    if (quantity && unitPrice) {
        subTotal = quantity * unitPrice;
    }
    return function (dispatch) {
        dispatch({type: 'UPDATE_SALES_ORDER_LINE_ITEM_SUBTOTAL', payload: roundTo(subTotal)});
    }
}

export function addLineItemToSalesOrder(currentSalesOrder, lineItem) {
    let lineItems = (currentSalesOrder.lineItems) ? currentSalesOrder.lineItems : [];
    lineItems = lineItems.concat(lineItem);
    const totalPrice = lineItems
        .map(lineItem => lineItem.subTotal)
        .reduce((totalPrice, amount) => parseFloat(totalPrice) + parseFloat(amount));
    return function (dispatch) {
        dispatch({type: 'UPDATE_LINE_ITEMS_ON_SALES_ORDER', payload: lineItems});
        dispatch({type: 'UPDATE_TOTAL_PRICE_ON_SALES_ORDER', payload: roundTo(totalPrice)});
    }
}

export function addSalesOrder(currentSalesOrder) {
    delete currentSalesOrder.currentSalesOrderLineItem;
    delete currentSalesOrder.customer;
    return async function (dispatch) {
        return axios.post('/add-sales-order', currentSalesOrder)
            .then(response => {
                let responseCurrentSalesOrder = response.data;
                dispatch({type: 'ADD_SALES_ORDER', payload: responseCurrentSalesOrder});
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'SALES_ORDER_WARNING', payload: "Failed to add sales order"});
            });
    }
}