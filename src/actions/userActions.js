import SInfo from 'react-native-sensitive-info';

const options = {sharedPreferencesName: 'mySharedPrefs', keychainService: 'myKeychain'};

export function updatePassCode(passCode, save) {
    if (passCode !== null) {
        if (Number.isNaN(passCode) || passCode.toString().length !== 4) {
            return
        }
    }

    if (save) {
        if (passCode) {
            SInfo.setItem('passCode', passCode, options);
            return function (dispatch) {
                dispatch({type: 'UPDATE_PASSCODE', payload: null});
                dispatch({type: 'UPDATE_PASSCODE_MATCH', payload: true});
            }
        } else {
            SInfo.deleteItem('passCode', options);
            return function (dispatch) {
                dispatch({type: 'UPDATE_PASSCODE', payload: null});
                dispatch({type: 'UPDATE_PASSCODE_MATCH', payload: false});
            }
        }
    }
    return function (dispatch) {
        dispatch({type: 'UPDATE_PASSCODE', payload: passCode});
    }
}

export function grantAccess(passCode) {

    return async function (dispatch) {
        return await SInfo.getItem('passCode', options)
            .then((value) => {
                if (value === passCode) {
                    dispatch({type: 'UPDATE_ACCESS_GRANTED', payload: true});
                } else {
                    dispatch({type: 'UPDATE_ACCESS_GRANTED', payload: false});
                }
            });
    }
}