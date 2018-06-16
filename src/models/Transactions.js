export default class Transactions {
}

Transactions.schema = {
    name: 'Transactions',
    primaryKey: 'uuid',
    properties: {
        id: 'int?',
        uuid: 'string',
        name: 'string',
        generalLedger: 'ChartOfAccounts',
        amount: {type:'double', default: 0.00},
        seriesUuid: 'string?',
        journalEntrySide: 'string', //DEBIT OR CREDIT ONLY
        journalEntryLinkUuid: 'string?', //Link the second side of the journal entry
        relativeUuid: 'string?',
        transactionDatetime: 'date',
        createdTimestamp: 'date'
    }
};