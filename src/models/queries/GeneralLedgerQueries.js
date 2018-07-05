import Realm from 'realm';
import GeneralLedgers from '../GeneralLedgers';
import Transactions from '../Transactions';
import DATA from '../../baseChartOfAccounts';
import Profile from "../Profile";

export default class GeneralLedgerQueries {
    constructor() {
        console.log(Realm.defaultPath);
    }

    currentAsset = DATA.chartOfAccounts.filter(function (ledgerEntry) {
        return ledgerEntry.name === "Current assets";
    })[0];

    create(generalLedger, init) {
        Realm.open({
            schema: [Profile, GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            const maxCode = realm
                .objects(GeneralLedgers)
                .filtered('parentUuid = $0', this.currentAsset.uuid)
                .max("code");

            const code = (init) ? generalLedger.code : (maxCode) ?
                maxCode + 1 : this.currentAsset.code + 1;

            return realm.write(() => {
                const date = new Date();
                const profile = realm.objectForPrimaryKey('Profile', generalLedger.profile.uuid);
                return realm.create('GeneralLedgers',
                    {
                        uuid: generalLedger.uuid,
                        code: code,
                        name: generalLedger.name.trim(),
                        profile: profile,
                        total: generalLedger.total ? parseFloat(generalLedger.total) : 0,
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
            schema: [Profile, GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('GeneralLedgers').map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    listByParentUuid(parentUuids) {
        return Realm.open({
            schema: [Profile, GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('GeneralLedgers')
                .filtered(parentUuids.map((parentUuid) => 'parentUuid == "' + parentUuid + '"').join(' OR '))
                .map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    listByProfileUuidAndParentUuid(profileUuid, parentUuids) {
        return Realm.open({
            schema: [Profile, GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('GeneralLedgers')
                .filtered(parentUuids.map((parentUuid) => 'parentUuid == "' + parentUuid + '"').join(' OR ')
                    + ' AND profile.uuid == "' + profileUuid + '"')
                .map(x => Object.assign({}, x));
        }).catch(error => {
            console.error(error);
        });
    }

    count() {
        return Realm.open({
            schema: [Profile, GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objects('GeneralLedgers').length;
        }).catch(error => {
            console.error(error);
        });
    }

    findByUuid(uuid) {
        return Realm.open({
            schema: [Profile, GeneralLedgers, Transactions], deleteRealmIfMigrationNeeded: true
        }).then(realm => {
            return realm.objectForPrimaryKey('GeneralLedgers', uuid);
        }).catch(error => {
            console.error(error);
        });
    }
}