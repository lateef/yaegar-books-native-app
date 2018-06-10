import Realm from 'realm';
import uuid from 'uuid/v4';
import ChartOfAccounts from '../ChartOfAccounts';
import Transactions from '../Transactions';
import DATA from '../../baseChartOfAccounts';

export default class GeneralLedgerQueries {
    constructor() {
        console.log(Realm.defaultPath);
    }

    currentAsset = DATA.chartOfAccounts.filter(function (ledgerEntry) {
        return ledgerEntry.name === "Current assets";
    })[0];

    create(generalLedger, init) {
        Realm.open({
            schema: [ChartOfAccounts, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            const maxCode = realm
                .objects(ChartOfAccounts)
                .filtered('parentUuid = $0', this.currentAsset.uuid)
                .max("code");

            const code = (init) ? generalLedger.code : (maxCode) ?
                maxCode + 1 : this.currentAsset.code + 1;

            return realm.write(() => {
                const date = new Date();
                return realm.create('ChartOfAccounts',
                    {
                        uuid: (init) ? generalLedger.uuid : uuid(),
                        code: code,
                        name: generalLedger.name,
                        description: generalLedger.description,
                        classifier: generalLedger.classifier,
                        reportSortOrder: generalLedger.reportSortOrder,
                        parentUuid: generalLedger.parentUuid,
                        ownerUuid: generalLedger.ownerUuid,
                        createdTimestamp: date,
                        updatedTimestamp: date
                    });
            });
        }).catch(error => {
            console.error(error);
        });
    }

    list() {
        return Realm.open({
            schema: [ChartOfAccounts, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('ChartOfAccounts').map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    listByParentUuid(parentUuid) {
        return Realm.open({
            schema: [ChartOfAccounts, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('ChartOfAccounts').filtered('parentUuid = $0', parentUuid).map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    count() {
        return Realm.open({
            schema: [ChartOfAccounts, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('ChartOfAccounts').length;
        }).catch(error => {
            console.error(error);
        });
    }

    findByUuid(uuid) {
        return Realm.open({
            schema: [ChartOfAccounts, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objectForPrimaryKey('ChartOfAccounts', uuid);
        }).catch(error => {
            console.error(error);
        });
    }
}