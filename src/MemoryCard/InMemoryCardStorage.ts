import { MemoryCard } from './MemoryCard';
import { MemoryCardStorage } from './MemoryCardStorage';

export class InMemoryCardStorage implements MemoryCardStorage {
  private cards: Array<MemoryCard> = [];
  private compareCards(a: MemoryCard, b: MemoryCard): boolean {
    return a.type === b.type && a.question === b.question && a.answer.equals(b.answer);
  }

  public removeCard(cardToRemove: MemoryCard): Promise<void> {
    this.cards = this.cards.filter(card => !this.compareCards(card, cardToRemove));
    return Promise.resolve();
  }
  public insertCard(cardToInsert: MemoryCard): Promise<void> {
    this.cards.push(cardToInsert);
    return Promise.resolve();
  }
  public getCards(): Promise<Iterable<MemoryCard>> {
    return Promise.resolve(this.cards);
  }
}
