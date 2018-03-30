import reducer from '../../../src/reducers/appReducer';

describe('App reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({});
    });

    it('should handle NAVIGATION_CHANGE', () => {
        const action = {type: 'NAVIGATION_CHANGE', payload: 'init'};

        expect(reducer([], action)).toEqual({root: 'init'});
    });
});