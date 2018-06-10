export default class ChartOfAccounts {
}

ChartOfAccounts.schema = {
    name: 'ChartOfAccounts',
    primaryKey: 'uuid',
    properties: {
        id: 'int?',
        uuid: 'string',
        code: 'int',
        name: 'string',
        description: 'string?',
        classifier: {type: 'string', optional: true},
        reportSortOrder: {type:'int', optional: true},
        parentUuid: {type: 'string', optional: true},
        ownerUuid: {type: 'string', optional: true},
        showOnDashboard: {type: 'bool', default: true},
        createdTimestamp: 'date',
        updatedTimestamp: 'date'
    }
};