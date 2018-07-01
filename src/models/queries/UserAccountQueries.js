import Realm from 'realm';
import UserAccounts from '../UserAccounts';
import GeneralLedgers from "../GeneralLedgers";
import Transactions from "../Transactions";

export default class UserAccountQueries {
    constructor() {
        console.log(Realm.defaultPath);
    }

    create(userAccount) {
        Realm.open({
            schema: [UserAccounts,GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.write(() => {
                const date = new Date();
                return realm.create('UserAccounts',
                    {
                        uuid: userAccount.uuid,
                        default: userAccount.default,
                        createdTimestamp: date,
                        updatedTimestamp: date
                    });
            });
        }).catch(error => {
            console.error(error);
        });
    }

    findByUuid(uuid) {
        return Realm.open({
            schema: [UserAccounts,GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objectForPrimaryKey('UserAccounts', uuid);
        }).catch(error => {
            console.error(error);
        });
    }

    list() {
        return Realm.open({
            schema: [UserAccounts,GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('UserAccounts').map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    // listByParentUuid(parentUuids) {
    //     return Realm.open({
    //         schema: [UserAccounts,GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
    //     }).then(realm => {
    //         return realm.objects('UserSettings')
    //         .filtered(parentUuids.map((parentUuid) => 'parentUuid == "' + parentUuid + '"').join(' OR '))
    //         .map(x => Object.assign({}, x));
    //     }).catch(error => {
    //         console.error(error);
    //     });
    // }
    //
    // count() {
    //     return Realm.open({
    //         schema: [UserAccounts,GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
    //     }).then(realm => {
    //         return realm.objects('UserSettings').length;
    //     }).catch(error => {
    //         console.error(error);
    //     });
    // }
}