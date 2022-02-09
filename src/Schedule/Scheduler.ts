import { MemoryCard } from '../MemoryCard/MemoryCard';
import { DateUtility } from '../Utility/DateUtility';
import { NumberUtility } from '../Utility/NumberUtility';
import { ScheduledMemoryCard } from './ScheduledMemoryCard';
import { ScheduleGapCalculator, ScheduleGapCalculators } from './ScheduleGapCalculators';

export class Scheduler {
  public constructor(private readonly gapCalculators: ScheduleGapCalculators) {}
  private static isScheduledCard(card: MemoryCard): card is ScheduledMemoryCard {
    const castedCard = card as ScheduledMemoryCard;
    return (
      DateUtility.isValidDate(castedCard.scheduledDate) &&
      NumberUtility.isStandardNumber(castedCard.scheduleBoxIndex)
    );
  }

  private static castToScheduledCard(card: MemoryCard): ScheduledMemoryCard {
    return { ...card, scheduleBoxIndex: 0, scheduledDate: new Date() };
  }

  private static castCardIfNeeded(card: MemoryCard): ScheduledMemoryCard {
    return Scheduler.isScheduledCard(card) ? card : Scheduler.castToScheduledCard(card);
  }

  public scheduleCorrectAnswer(card: MemoryCard): ScheduledMemoryCard {
    const scheduledCard = Scheduler.castCardIfNeeded(card);
    this.incrementScheduleBoxIndexIn(scheduledCard);
    this.setNewScheduleFor(scheduledCard);

    return scheduledCard;
  }

  public scheduleWrongAnswer(card: MemoryCard): ScheduledMemoryCard {
    const scheduledCard = Scheduler.castCardIfNeeded(card);
    this.resetScheduleBoxIndexIn(scheduledCard);
    this.setNewScheduleFor(scheduledCard);

    return scheduledCard;
  }

  private getCorrespondingGapCalculator(scheduledCard: ScheduledMemoryCard): ScheduleGapCalculator {
    const nextGapCalculatorIndex = scheduledCard.scheduleBoxIndex;
    const lastGapCalculatorIndex = this.gapCalculators.length - 1;
    const gapCalculatorIndex = Math.min(nextGapCalculatorIndex, lastGapCalculatorIndex);
    return this.gapCalculators[gapCalculatorIndex];
  }

  private incrementScheduleBoxIndexIn(card: ScheduledMemoryCard): void {
    card.scheduleBoxIndex =
      Math.min(card.scheduleBoxIndex + 1, this.gapCalculators.length - 1); 
  }

  private resetScheduleBoxIndexIn(card: ScheduledMemoryCard): void {
    card.scheduleBoxIndex = 0;
  }

  private setNewScheduleFor(card: ScheduledMemoryCard): void {
    const gapCalculator = this.getCorrespondingGapCalculator(card);
    card.scheduledDate = gapCalculator(card.scheduledDate);
  }
}
