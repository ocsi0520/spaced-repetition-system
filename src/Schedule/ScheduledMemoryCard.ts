import { MemoryCard } from '../MemoryCard/MemoryCard';

export type ScheduledMemoryCard = MemoryCard & {
  scheduleBoxIndex: number;
  scheduledDate: Date;
};
