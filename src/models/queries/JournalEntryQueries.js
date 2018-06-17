import Realm from 'realm';
import uuid from 'uuid/v4';
import Transactions from '../Transactions';
import ChartOfAccounts from '../ChartOfAccounts';

export default class JournalEntryQueries {
    create(journalEntry) {
        Realm.open({
            schema: [Transactions, ChartOfAccounts], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.write(() => {
                const generalLedger = realm.objectForPrimaryKey('ChartOfAccounts', journalEntry.generalLedger.uuid);
                return realm.create('Transactions',
                    {
                        uuid: uuid(),
                        name: journalEntry.name,
                        generalLedger: generalLedger,
                        amount: journalEntry.amount,
                        seriesUuid: journalEntry.seriesUuid,
                        journalEntrySide: journalEntry.journalEntrySide,
                        transactionDatetime: journalEntry.transactionDatetime,
                        createdTimestamp: new Date()
                    });
            });
        }).catch(error => {
            console.error(error);
        });
    }

    list() {
        return Realm.open({
            schema: [Transactions, ChartOfAccounts], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('Transactions').map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    listByGeneralLedgerUuid(uuid) {
        return Realm.open({
            schema: [Transactions, ChartOfAccounts], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('Transactions').filtered('generalLedger.uuid = $0', uuid).map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    // count() {
    //     return Realm.open({
    //         schema: [Transactions], deleteRealmIfMigrationNeeded: true
    //     }).then(realm => {
    //         return realm.objects('Transactions').length;
    //     }).catch(error => {
    //         console.error(error);
    //     });
    // }
}