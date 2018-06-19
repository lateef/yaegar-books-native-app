import GeneralLedgerQueries from '../models/queries/GeneralLedgerQueries';
import DATA from '../baseChartOfAccounts';

function changeNavigation(root) {
    return {
        type: 'NAVIGATION_CHANGE',
        payload: root
    };
}

export function onInit() {
    initDatabase().then(x => {
    });
    return function (dispatch) {
        dispatch(changeNavigation('init'));
    }
}

async function initDatabase() {
    const ledger = await new GeneralLedgerQueries().list();

    if (ledger.length === 0) {
        DATA.chartOfAccounts.forEach(async function (generalLedger) {
            await new GeneralLedgerQueries().create(generalLedger, true);
        });
    }
}
