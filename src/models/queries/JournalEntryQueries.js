import Realm from 'realm';
import Transactions from '../Transactions';
import GeneralLedgers from '../GeneralLedgers';

export default class JournalEntryQueries {
    create(journalEntry) {
        Realm.open({
            schema: [Transactions, GeneralLedgers], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.write(() => {
                const generalLedger = realm.objectForPrimaryKey('GeneralLedgers', journalEntry.generalLedger.uuid);
                return realm.create('Transactions',
                    {
                        uuid: journalEntry.uuid,
                        name: journalEntry.name,
                        generalLedger: generalLedger,
                        amount: parseFloat(journalEntry.amount),
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
            schema: [Transactions, GeneralLedgers], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('Transactions').map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    listByGeneralLedgerUuid(uuid, orderBy) {
        return Realm.open({
            schema: [Transactions, GeneralLedgers], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('Transactions')
                .filtered('generalLedger.uuid = $0', uuid)
                .sorted(orderBy, 'true')
                .map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    sumAmountByGeneralLedgerUuid(uuid) {
        return Realm.open({
            schema: [Transactions, GeneralLedgers], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('Transactions').filtered('generalLedger.uuid = $0', uuid).sum('amount');
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