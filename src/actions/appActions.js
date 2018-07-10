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
        const profileUuid = uuid();
        userAction.initUser(profileUuid).then(() => {
            generalLedgerAction.initGeneralLedger(profileUuid, profileUuid).then(() => {});
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

export function onProfile(tab) {
    return function (dispatch) {
        dispatch(changeNavigation(tab));
    }
}
