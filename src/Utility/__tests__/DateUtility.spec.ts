import { DateUtility } from '../DateUtility';

describe('DateUtility', () => {
  const testNotValidDate = (value: unknown) => expect(DateUtility.isValidDate(value)).toBe(false);
  describe('Wrong types', () => {
    it('should consider all values as non-date, as they have wrong type', () => {
      const values = [2, 'text', {valueOf: 30}, [1], function(){ return new Date(); }];
      values.forEach(testNotValidDate);
    });
  });
  describe('Correct type', () => {
    it('should consider invalid date as not valid date', () => {
      testNotValidDate(new Date('Invalid Date'));
    });
    it('should consider values as valid dates', () => {
      const testValidDate = (value: Date) => expect(DateUtility.isValidDate(value)).toBe(true);
      const rawValues = ['2000-01-01', 0, new Date('1999-12-31')];
      const dateValues = [...rawValues.map(rawValue => new Date(rawValue)), new Date()];
      dateValues.forEach(testValidDate);
    });
  });
});
