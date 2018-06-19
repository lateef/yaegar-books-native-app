import roundTo from '../../src/util/NumberFormat';

describe('Number format round to', () => {
    it('should return rounded number', () => {
        expect(roundTo(100.223, 2)).toEqual('100.22');
        expect(roundTo(-100.223, 2)).toEqual('-100.22');
        expect(roundTo(100.227, 2)).toEqual('100.23');
        expect(roundTo(100.005, 2)).toEqual('100.01');
        expect(roundTo(100, 2)).toEqual('100.00');
    });
});