import GeneralLedgerQueries from '../models/queries/GeneralLedgerQueries';

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
    const baseChartOfAccounts = {
        "chartOfAccounts": [
            {
                uuid: "4ec43749-b607-4951-9cc6-1e81d657c56c",
                code: 100000,
                name: "Income/Revenue",
                description: "Income from normal business activity",
                reportSortOrder: 1,
                showOnDashboard: 'N'
            },
            {
                uuid: "6c5bd845-93ec-4da8-a4a8-d195f0a96ea0",
                code: 200000,
                name: "Non-operating income",
                description: "Income that isn’t from normal business operations",
                reportSortOrder: 2,
                showOnDashboard: 'N'
            },
            {
                uuid: "8504eaa3-4830-4e70-959a-579b1973341b",
                code: 300000,
                name: "Cost of sales",
                description: "Costs related to sales or services you provide",
                reportSortOrder: 3,
                showOnDashboard: 'N'
            },
            {
                uuid: "a4b153c8-b69b-4243-9778-ed3dc9062d4d",
                code: 400000,
                name: "Direct cost",
                description: "Costs incurred that relate directly to earning Income",
                reportSortOrder: 4,
                showOnDashboard: 'N'
            },
            {
                uuid: "4e0de115-6eaa-498e-82fa-34d4f87935f9",
                code: 500000,
                name: "Operating expenses",
                description: "Expenses incurred from the day to day operations of the business",
                reportSortOrder: 5,
                showOnDashboard: 'N'
            },
            {
                uuid: "17dd80d1-6685-4e22-830e-c97f02f8a696",
                code: 600000,
                name: "Non-operating expenses",
                description: "Expenditure that isn’t from normal business operations",
                reportSortOrder: 6,
                showOnDashboard: 'N'
            },
            {
                uuid: "db5d6c60-b174-422b-82b5-663ed0bd8723",
                code: 700000,
                name: "Assets",
                description: "An item purchased and owned that has monetary value",
                reportSortOrder: 7,
                showOnDashboard: 'N'
            },
            {
                uuid: "dcbf0554-8d0a-4706-b98d-9a67359b2abb",
                code: 800000,
                name: "Liabilities",
                description: "A liability is an obligation that arises in the course of doing business to be paid over a period of time",
                reportSortOrder: 8,
                showOnDashboard: 'N'
            },
            {
                uuid: "33ed413b-288b-4218-982c-7d3cd842f3ce",
                code: 900000,
                name: "Equity and reserves",
                description: "Shareholders' funds",
                reportSortOrder: 9,
                showOnDashboard: 'N'
            },
            {
                uuid: "1b7b337b-db56-4974-9a45-55b3022bf85f",
                code: 709999,
                name: "Current assets",
                description: "Current assets",
                parentUuid: "db5d6c60-b174-422b-82b5-663ed0bd8723",
                showOnDashboard: 'N'
            },
            {
                uuid: "a59c1c6f-e58d-47e8-bfe2-1ff6d4dbce70",
                code: 109999,
                name: "Salary",
                description: "Salary",
                parentUuid: "4ec43749-b607-4951-9cc6-1e81d657c56c",
                showOnDashboard: 'N'
            },
            {
                uuid: "21d7d0f8-4eb9-4ecb-8980-360a20bbbabe",
                code: 509999,
                name: "Mortgage",
                description: "Mortgage",
                parentUuid: "4e0de115-6eaa-498e-82fa-34d4f87935f9",
                showOnDashboard: 'N'
            },
        ]
    };

    const ledger = await new GeneralLedgerQueries().list();

    if (ledger.length === 0) {
        baseChartOfAccounts.chartOfAccounts.forEach(function (generalLedger) {
            new GeneralLedgerQueries().create(generalLedger);
        });
    }
}
