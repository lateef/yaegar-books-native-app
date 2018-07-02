import uuid from "uuid/v4";
import * as userAction from './userActions';
import * as generalLedgerAction from './generalLedgerActions';

function changeNavigation(root) {
    return {
        type: 'NAVIGATION_CHANGE',
        payload: root
    };
}

export function onInit() {
    return function (dispatch) {
        const userAccountUuid = uuid();
        userAction.initUser(userAccountUuid).then(() => {
            generalLedgerAction.initGeneralLedger(userAccountUuid).then(() => {});
        });
        dispatch(changeNavigation('init'));
    }
}

export function onStart() {
    return function (dispatch) {
        dispatch(changeNavigation('dashboard'));
    }
}

export function onPasscodeRequired() {
    return function (dispatch) {
        dispatch(changeNavigation('passcode'));
    }
}
