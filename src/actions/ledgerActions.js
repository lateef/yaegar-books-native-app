import axios from '../../axios';

export function resetLedger() {
    return function (dispatch) {
        dispatch({type: 'LEDGER_RESET'});
    }
}

export function updateLedger(ledger) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_LEDGER', payload: ledger});
    }
}

export function updateLedgerName(name) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_LEDGER_NAME', payload: name});
    }
}

export function updateLedgerDescription(description) {
    return function (dispatch) {
        dispatch({type: 'UPDATE_LEDGER_DESCRIPTION', payload: description});
    }
}

export function addLedger(ledger) {
    return async function (dispatch) {
        delete ledger.error;
        return axios.post('/add-ledger', ledger)
            .then(response => {
                let responseLedger = response.data;
                if (responseLedger) {
                    dispatch({type: 'UPDATE_LEDGER', payload: responseLedger});
                    dispatch({type: 'ADD_LEDGER_TO_CHART_OF_ACCOUNTS', payload: responseLedger});
                } else {
                    dispatch({type: 'LEDGER_WARNING', payload: "Failed to save ledger"});
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({type: 'LEDGER_WARNING', payload: "Failed to save ledger"});
            });
    }
}

export function findLedgerByUuid(ledgers, uuid) {
    return ledgers.filter(ledger => ledger.uuid === uuid)[0];
}

export function listLedgerByParentUuid(ledgers, parentUuid) {
    return ledgers.filter(ledger => ledger.parentUuid === parentUuid);
}

export function findLedgerByName(ledgers, name) {
    if (!ledgers) return [];
    return ledgers.filter(ledger => ledger.name === name)[0];
}

export function listCompanyLedgersByParentName(company, name) {
    if (!company || !company.chartOfAccounts || !company.chartOfAccounts.ledgers) return [];
    const ledgers =  company.chartOfAccounts.ledgers;
    const parentLedger = ledgers.filter(ledger => ledger.name === name)[0];
    return (parentLedger) ? listLedgerByParentUuid(ledgers, parentLedger.uuid) : [];
}
