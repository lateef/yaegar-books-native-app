export default class GeneralLedgers {
}

GeneralLedgers.schema = {
    name: 'GeneralLedgers',
    primaryKey: 'uuid',
    properties: {
        id: 'int?',
        uuid: 'string',
        code: 'int',
        total: {type: 'double', default: 0.00},
        name: 'string',
        userAccount: 'UserAccounts',
        description: 'string?',
        classifier: {type: 'string', optional: true},
        reportSortOrder: {type: 'int', optional: true},
        parentUuid: {type: 'string', optional: true},
        ownerUuid: 'string',
        showOnDashboard: {type: 'bool', default: true},
        createdTimestamp: 'date',
        updatedTimestamp: 'date'
    }
};