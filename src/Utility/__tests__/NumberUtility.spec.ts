import { NumberUtility } from '../NumberUtility';

describe('NumberUtility', () => {
  const testNotValidNumber = (value: unknown) => expect(NumberUtility.isStandardNumber(value)).toBe(false);
  describe('Wrong types', () => {
    it('should consider all values as non-number, as they have wrong type', () => {
      const values = [new Date(), 'text', {valueOf: 30}, [1], function(){ return new Number(); }];
      values.forEach(testNotValidNumber);
    });
  });
  describe('Correct type', () => {
    it('should consider NaN, +/-infinity and BigInts as not valid number', () => {
      testNotValidNumber(NaN);
      testNotValidNumber(-Infinity);
      testNotValidNumber(Infinity);
      testNotValidNumber(BigInt(5000));
    });
    it('should consider values as valid numbers', () => {
      const testValidNumber = (value: number) => expect(NumberUtility.isStandardNumber(value)).toBe(true);
      [-1, 0, 1, -5435.4364, 1234.346979].forEach(testValidNumber);
    });
  });
});
