import uuid from "uuid/v4";
import axios from '../../axios';
import roundTo from "../util/NumberFormat";

export function resetProduct() {
    return function (dispatch) {
        dispatch({type: 'PRODUCT_RESET'});
    }
}

export function createProduct() {
    return function (dispatch) {
        dispatch({
            type: 'CREATE_PRODUCT', payload:
                {uuid: uuid(), ledger: {uuid: uuid()}, costPrice: 0, sellPrice: 0}
        });
    }
}

export function updateProductName(name) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_PRODUCT_NAME', payload: name});
    }
}

export function updateProductCostPrice(costPrice) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_PRODUCT_COST_PRICE', payload: costPrice});
    }
}

export function updateProductSellPrice(sellPrice) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_PRODUCT_SELL_PRICE', payload: sellPrice});
    }
}

export function updateProduct(product) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_PRODUCT', payload: product});
    }
}

export function addProductSupplier(product, supplier) {
    product.supplier = supplier;
    return function (dispatch) {
        dispatch({type: 'UPDATE_PRODUCT', payload: product});
    }
}

export function addProduct(product) {
    return async function (dispatch) {
        delete product.error;
        product.costPrice = roundTo(product.costPrice);
        product.sellPrice = roundTo(product.sellPrice);
        if (product.supplier && !product.supplier.uuid) {
            delete product.supplier;
        }
        return axios.post('/add-product', product)
            .then(response => {
                let data = response.data;
                if (data) {
                    dispatch({type: 'ADD_PRODUCT', payload: data});
                } else {
                    dispatch({type: 'PRODUCT_WARNING', payload: "Failed to save product"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'PRODUCT_WARNING', payload: "Failed to save product"});
            });
    }
}

export function getProducts(ledgerParentUuid, supplier) {
    return async function (dispatch) {
        return axios.get('/get-products/' + ledgerParentUuid)
            .then(response => {
                let data = response.data;
                if (data) {
                    if (supplier) {
                        data = data.filter((d) => {
                            if (!d.supplier && supplier.name === 'NONE') {
                                return true;
                            } else if (!d.supplier) {
                                return false;
                            } else {
                                return d.supplier.uuid === supplier.uuid;
                            }
                        });
                    }
                    dispatch({type: 'UPDATE_PRODUCTS', payload: data});
                } else {
                    dispatch({type: 'PRODUCT_WARNING', payload: "Failed to save product"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'PRODUCT_WARNING', payload: "Failed to save product"});
            });
    }
}
