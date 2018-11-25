import axios from '../../axios';

export function resetTransaction() {
    return function (dispatch) {
        dispatch({type: 'TRANSACTION_RESET'});
    }
}

export function updateTransaction(transaction) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_TRANSACTION', payload: transaction});
    }
}

export function updateLedger(ledger) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_LEDGER', payload: ledger});
    }
}

export function updateCounterLedgerUuid(counterLedgerUuid) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_COUNTER_LEDGER_UUID', payload: counterLedgerUuid});
    }
}

export function updateTransactionDescription(description) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_TRANSACTION_DESCRIPTION', payload: description});
    }
}

export function updateTransactionAmount(amount) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_TRANSACTION_AMOUNT', payload: amount});
    }
}

export function addTransaction(transaction) {
    return async function (dispatch) {
        delete transaction.error;
        return axios.put('/add-transaction', transaction)
            .then(response => {
                let responseTransaction = response.data;
                if (responseTransaction) {
                    dispatch({type: 'UPDATE_TRANSACTION', payload: responseTransaction});
                } else {
                    dispatch({type: 'TRANSACTION_WARNING', payload: "Failed to save transaction"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'TRANSACTION_WARNING', payload: "Failed to save transaction"});
            });
    }
}

// export function findTransactionByUuid(transactions, uuid) {
//     return transactions.filter(transaction => transaction.uuid === uuid)[0];
// }
//
// export function listTransactionByParentUuid(transactions, parentUuid) {
//     return transactions.filter(transaction => transaction.parentUuid === parentUuid);
// }
//
// export function findTransactionByName(transactions, name) {
//     if (!transactions) return [];
//     return transactions.filter(transaction => transaction.name === name)[0];
// }
//
// export function listCompanyTransactionsByParentName(company, name) {
//     if (!company || !company.chartOfAccounts || !company.chartOfAccounts.transactions) return [];
//     const transactions =  company.chartOfAccounts.transactions;
//     const parentTransaction = transactions.filter(transaction => transaction.name === name)[0];
//     return listTransactionByParentUuid(transactions, parentTransaction.uuid);
// }
