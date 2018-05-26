import Realm from 'realm';
import uuid from 'uuid/v4';
import ChartOfAccounts from '../ChartOfAccounts';

export default class GeneralLedgerQueries {
    constructor() {
        console.log(Realm.defaultPath);
    }

    create(generalLedger) {
        Realm.open({
            schema: [ChartOfAccounts], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            let maxCode = realm
                .objects(ChartOfAccounts)
                .filtered('parentUuid = $0', '1b7b337b-db56-4974-9a45-55b3022bf85f')
                .max("code");
            maxCode = (maxCode) ? maxCode : generalLedger.code;

            realm.write(() => {
                realm.create('ChartOfAccounts',
                    {
                        uuid: uuid(),
                        code: maxCode + 1,
                        name: generalLedger.name,
                        description: generalLedger.description,
                        reportSortOrder: generalLedger.reportSortOrder,
                        parentUuid: generalLedger.parentUuid,
                        ownerUuid: generalLedger.ownerUuid
                    });
            });
            return realm;
        }).catch(error => {
            console.error(error);
        });
    }

    list() {
        return Realm.open({
            schema: [ChartOfAccounts], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('ChartOfAccounts').map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    listByParentUuid(parentUuid) {
        return Realm.open({
            schema: [ChartOfAccounts], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('ChartOfAccounts').filtered('parentUuid = $0', parentUuid).map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    count() {
        return Realm.open({
            schema: [ChartOfAccounts], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('ChartOfAccounts').length;
        }).catch(error => {
            console.error(error);
        });
    }
}