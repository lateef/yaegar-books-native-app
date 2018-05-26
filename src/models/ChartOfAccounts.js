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
        description: 'string',
        reportSortOrder: {type:'int', optional: true},
        parentUuid: {type: 'string', optional: true},
        ownerUuid: {type: 'string', optional: true},
        showOnDashboard: {type: 'string', default: 'Y'}
    }
};