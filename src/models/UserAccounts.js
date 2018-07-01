export default class UserAccounts {
}

UserAccounts.schema = {
    name: 'UserAccounts',
    primaryKey: 'uuid',
    properties: {
        id: 'int?',
        uuid: 'string',
        default: {type: 'bool', default: false},
        registered: {type: 'bool', default: false},
        isBusiness: {type: 'bool', default: false},
        reportSortOrder: {type: 'int', optional: true},
        subscriptionEnd: 'date?',
        createdTimestamp: 'date',
        updatedTimestamp: 'date'
    }
};