import Realm from 'realm';
import uuid from 'uuid/v4';
import ChartOfAccounts from '../ChartOfAccounts';

export default class GeneralLedgerQueries {
    constructor() {
        console.log(Realm.defaultPath);
    }

    create(code, name, description, ownerUuid) {
        Realm.open({
            schema: [ChartOfAccounts], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            let maxCode = realm.objects(ChartOfAccounts).max("code");
            maxCode = (maxCode) ? maxCode : code;

            realm.write(() => {
                realm.create('ChartOfAccounts',
                    {uuid: uuid(), code: maxCode + 1, name: name, description: description, ownerUuid: ownerUuid});
            });
            return realm;
        }).catch(error => {
            console.error(error);
        });
    }

    list() {
        Realm.open({
            schema: [ChartOfAccounts], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            const chartOfAccounts = realm.objects('ChartOfAccounts').map(x => Object.assign({}, x));
            return chartOfAccounts;
        }).catch(error => {
            console.error(error);
        });
    }
}