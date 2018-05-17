function changeNavigation(root) {
    return {
        type: 'NAVIGATION_CHANGE',
        payload: root
    };
}

export function onInit() {
    return function (dispatch) {
        dispatch(changeNavigation('init'));
    }
}