import Realm from 'realm';
import Profile from '../Profile';
import GeneralLedgers from "../GeneralLedgers";
import Transactions from "../Transactions";

export default class ProfileQueries {
    constructor() {
        console.log(Realm.defaultPath);
    }

    save(profile, update) {
        Realm.open({
            schema: [Profile, GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.write(() => {
                const date = new Date();
                profile.updatedTimestamp = date;
                if (!update) {
                    profile.createdTimestamp = date;
                }
                return realm.create('Profile',
                    profile, update);
            });
        }).catch(error => {
            console.error(error);
        });
    }

    findByUuid(uuid) {
        return Realm.open({
            schema: [Profile, GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objectForPrimaryKey('Profile', uuid);
        }).catch(error => {
            console.error(error);
        });
    }

    list() {
        return Realm.open({
            schema: [Profile, GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('Profile').map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    listByAccountType(isBusiness) {
        return Realm.open({
            schema: [Profile, GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('Profile')
                .filtered('isBusiness = $0', isBusiness)
                .map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    // listByParentUuid(parentUuids) {
    //     return Realm.open({
    //         schema: [Profile,GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
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
    //         schema: [Profile,GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
    //     }).then(realm => {
    //         return realm.objects('UserSettings').length;
    //     }).catch(error => {
    //         console.error(error);
    //     });
    // }
}