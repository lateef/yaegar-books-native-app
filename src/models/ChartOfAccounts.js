export default class ChartOfAccounts {
}

ChartOfAccounts.schema = {
    name: 'ChartOfAccounts',
    primaryKey: 'uuid',
    properties: {
        id: {type: 'int', optional: true},
        uuid: 'string',
        code: 'int',
        name: 'string',
        description: 'string',
        parentCode: {type: 'int', optional: true},
        ownerUuid: 'string'
    }
};