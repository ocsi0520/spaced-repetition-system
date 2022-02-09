export type ScheduleGapCalculator = (date: Date) => Date;

// we need at least 2 calculators in the array
export type ScheduleGapCalculators = [
  ScheduleGapCalculator,
  ScheduleGapCalculator,
  ...Array<ScheduleGapCalculator>
];
