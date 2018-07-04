export default class Profile {
}

Profile.schema = {
    name: 'Profile',
    primaryKey: 'uuid',
    properties: {
        id: 'int?',
        uuid: 'string',
        name: 'string',
        default: {type: 'bool', default: false},
        registered: {type: 'bool', default: false},
        isBusiness: {type: 'bool', default: false},
        reportSortOrder: {type: 'int', optional: true},
        subscriptionEnd: 'date?',
        createdTimestamp: 'date',
        updatedTimestamp: 'date'
    }
};