import { MemoryCard } from '../../MemoryCard/MemoryCard';
import { PrefixedKeys, RemovePrefix } from '../../Utility/TypeUtility';
import { ScheduledMemoryCard } from '../ScheduledMemoryCard';
import { ScheduleGapCalculator, ScheduleGapCalculators } from '../ScheduleGapCalculators';
import { Scheduler } from '../Scheduler';

type StringKeyOfDate = Extract<keyof Date, string>;
type SetterKeysOfDate = PrefixedKeys<StringKeyOfDate, 'set'>;
type UnitMethodNames = RemovePrefix<SetterKeysOfDate, 'set'>;

const createCalculator =
  (unitMethodName: UnitMethodNames, unitToAdd: number): ScheduleGapCalculator => {
    return date => {
      const newDate = new Date(date);
      const currentUnit = date[`get${unitMethodName}`]();
      newDate[`set${unitMethodName}`](currentUnit + unitToAdd);
      return newDate;
    };
  };


const schedulerGapsCalculator: ScheduleGapCalculators = [
  createCalculator('Minutes', 10),
  createCalculator('Hours', 1),
  createCalculator('Date', 1),
  createCalculator('Month', 1),
];

const createMemoryCard = (): MemoryCard => ({
  answer: null as never,
  question: 'Question',
  type: 'any-thing'
});
const initialDate = new Date(2000, 0, 1, 0, 0, 0);

const createScheduledMemoryCard = (scheduleBoxIndex: number, scheduledDate?: Date): ScheduledMemoryCard => ({
  ...createMemoryCard(),
  scheduleBoxIndex,
  scheduledDate: scheduledDate || new Date(initialDate)
});


describe('Scheduler', () => {
  const testDifferenceIsLessThan50MS = (date1: Date, date2: Date) => {
    expect(date1.valueOf() - date2.valueOf()).toBeLessThan(50);
  };

  const testScheduledCard = (actual: ScheduledMemoryCard, expected: ScheduledMemoryCard) => {
    expect(actual.answer).toEqual(expected.answer);
    expect(actual.question).toEqual(expected.question);
    expect(actual.type).toEqual(expected.type);
    expect(actual.scheduleBoxIndex).toEqual(expected.scheduleBoxIndex);

    testDifferenceIsLessThan50MS(actual.scheduledDate, expected.scheduledDate);
  };

  let unitUnderTest: Scheduler;
  beforeEach(() => {
    unitUnderTest = new Scheduler(schedulerGapsCalculator);
  });

  const tenMinutesInMS = 10 * 60 * 1000;

  describe('wrong answers', () => {
    it('should schedule non-scheduled card 10 mins later', () => {
      const nonScheduledCard = createMemoryCard();
      const expectedDate = new Date(new Date().valueOf() + tenMinutesInMS);
      const result = unitUnderTest.scheduleWrongAnswer(nonScheduledCard);

      const expectedResult: ScheduledMemoryCard = createScheduledMemoryCard(0, expectedDate);
      testScheduledCard(result, expectedResult);
    });
    for(let boxIndex = 0; boxIndex < schedulerGapsCalculator.length; boxIndex++) {
      it(`should schedule ${boxIndex}-boxed card 10 mins later`, () => {
        const card = createScheduledMemoryCard(boxIndex);
        const expectedDate = new Date(new Date().valueOf() + tenMinutesInMS);
        const result = unitUnderTest.scheduleWrongAnswer(card);
  
        const expectedResult = createScheduledMemoryCard(0, expectedDate);
        testScheduledCard(result, expectedResult);
      });
    }
  });
  describe('correct answers', () => {
    const oneHourInMS = 1000 * 60 * 60;
    const oneDayInMS = oneHourInMS * 24;
    const januaryMonthInMS = oneDayInMS * 31;
    it('should schedule non-scheduled card 1 hour later', () => {
      const nonScheduledCard = createMemoryCard();
      const expectedDate = new Date(new Date().valueOf() + oneHourInMS);
      const result = unitUnderTest.scheduleCorrectAnswer(nonScheduledCard);

      const expectedResult: ScheduledMemoryCard = createScheduledMemoryCard(1, expectedDate);
      testScheduledCard(result, expectedResult);
    });
    type TestGap = {name: string; unitInMS: number};
    const expectedGaps: Array<TestGap> =
      [
        {unitInMS: oneHourInMS, name: '1 hour'},
        {unitInMS: oneDayInMS, name: '1 day'},
        {unitInMS: januaryMonthInMS, name: '1 month'},
        {unitInMS: januaryMonthInMS, name: '1 month'},
      ];
    
    for(let boxIndex = 0; boxIndex < expectedGaps.length - 1; boxIndex++) {
      it(`should schedule ${boxIndex}-boxed card ${expectedGaps[boxIndex].name} later`, () => {
        const expectedGap = expectedGaps[boxIndex];
        const card = createScheduledMemoryCard(boxIndex);
        const expectedDate = new Date(new Date().valueOf() + expectedGap.unitInMS);
        const result = unitUnderTest.scheduleCorrectAnswer(card);
  
        const expectedResult: ScheduledMemoryCard = createScheduledMemoryCard(boxIndex + 1, expectedDate);
        testScheduledCard(result, expectedResult);
      });
    }

    it('should schedule 3-boxed card 1 month later', () => {
      const card = createScheduledMemoryCard(3);
      const expectedDate = new Date(new Date().valueOf() + januaryMonthInMS);
      const result = unitUnderTest.scheduleCorrectAnswer(card);

      const expectedResult: ScheduledMemoryCard = createScheduledMemoryCard(3, expectedDate);
      testScheduledCard(result, expectedResult);
    });
  });
});
