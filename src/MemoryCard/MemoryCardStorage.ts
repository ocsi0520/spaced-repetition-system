import { MemoryCard } from './MemoryCard';

export interface MemoryCardStorage {
  getCards(): Promise<Iterable<MemoryCard>>;
  insertCard(memoryCard: MemoryCard): Promise<void>;
  removeCard(memoryCard: MemoryCard): Promise<void>;
}
