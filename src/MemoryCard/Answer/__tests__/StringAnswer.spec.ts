import { StringAnswer } from '../StringAnswer';

describe('StringAnswer', () => {
  it('should consider two answers with the same value equal', () => {
    const firstAnswer: StringAnswer = new StringAnswer('some text');
    const secondAnswer: StringAnswer = new StringAnswer('some text');
    expect(firstAnswer.equals(secondAnswer)).toBe(true);
    expect(secondAnswer.equals(firstAnswer)).toBe(true);
  });
  it('should consider two answers with different value to not be equal', () => {
    const firstAnswer: StringAnswer = new StringAnswer('some text');
    const secondAnswer: StringAnswer = new StringAnswer('some other text');
    expect(firstAnswer.equals(secondAnswer)).toBe(false);
    expect(secondAnswer.equals(firstAnswer)).toBe(false);
  });
  it('should handle null and undefined values for StringAnswer', () => {
    const answer = new StringAnswer('some text');
    expect(new StringAnswer(null).equals(answer)).toBe(false);
    expect(new StringAnswer(undefined).equals(answer)).toBe(false);
  });
  it('should handle null and undefined', () => {
    const answer = new StringAnswer('some text');
    expect(answer.equals(null)).toBe(false);
    expect(answer.equals(undefined)).toBe(false);
  });
});
